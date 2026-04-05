// src/lib/tiptapToPortableText.ts
// Converts the JSON output of Tiptap's editor into the body node format
// expected by the /api/submit-post serverless function.

type Mark = { type: string; attrs?: { href?: string } };

interface TiptapNode {
  type: string;
  attrs?: Record<string, any>;
  content?: TiptapNode[];
  marks?: Mark[];
  text?: string;
}

// Maps Tiptap heading levels to Sanity styles
function headingStyle(level: number): string {
  if (level === 2) return "h2";
  if (level === 3) return "h3";
  return "h2";
}

// Converts a single Tiptap inline node (text/marks) to our span shape
function tiptapTextToSpan(node: TiptapNode) {
  const marks: string[] = [];
  let href: string | undefined;

  for (const mark of node.marks ?? []) {
    if (mark.type === "bold")   marks.push("strong");
    if (mark.type === "italic") marks.push("em");
    if (mark.type === "code")   marks.push("code");
    if (mark.type === "link") {
      marks.push("link");
      href = mark.attrs?.href;
    }
  }

  return { text: node.text ?? "", marks, href };
}

// Recursively flattens a block's children into spans
function collectSpans(nodes: TiptapNode[]): ReturnType<typeof tiptapTextToSpan>[] {
  const spans: ReturnType<typeof tiptapTextToSpan>[] = [];
  for (const node of nodes) {
    if (node.type === "text") {
      spans.push(tiptapTextToSpan(node));
    } else if (node.content) {
      spans.push(...collectSpans(node.content));
    }
  }
  return spans;
}

// Main conversion function
export function tiptapToPortableText(doc: TiptapNode): object[] {
  const body: object[] = [];

  for (const node of doc.content ?? []) {
    switch (node.type) {

      case "paragraph":
      case "blockquote": {
        const style = node.type === "blockquote" ? "blockquote" : "normal";
        // Blockquote in Tiptap wraps a paragraph inside — flatten it
        const children = node.type === "blockquote"
          ? collectSpans(node.content?.[0]?.content ?? [])
          : collectSpans(node.content ?? []);
        body.push({ type: "block", style, children });
        break;
      }

      case "heading": {
        const style = headingStyle(node.attrs?.level ?? 2);
        const children = collectSpans(node.content ?? []);
        body.push({ type: "block", style, children });
        break;
      }

      case "image": {
        // Images inserted via Tiptap come through as base64 data URLs
        const src: string = node.attrs?.src ?? "";
        if (!src.startsWith("data:")) break; // skip external URLs (not yet supported)
        const mimeMatch = src.match(/^data:([^;]+);base64,/);
        const mimeType  = mimeMatch?.[1] ?? "image/jpeg";
        body.push({
          type:     "image",
          base64:   src,
          mimeType,
          caption:  node.attrs?.alt ?? "",
        });
        break;
      }

      // Ignore unknown node types silently
      default:
        break;
    }
  }

  return body;
}
