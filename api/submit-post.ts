// api/submit-post.ts
// Vercel serverless function — the Sanity write token never reaches the browser.
//
// SETUP:
//   Add these to your Vercel environment variables (NOT prefixed with VITE_):
//     SANITY_WRITE_TOKEN   — Sanity editor token
//     AUTH_SECRET          — same value as your Auth.js AUTH_SECRET
//     GOOGLE_CLIENT_ID     — from Google Cloud Console
//     GOOGLE_CLIENT_SECRET — from Google Cloud Console
//   Also ensure VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET are set.

import type { IncomingMessage, ServerResponse } from "node:http";

type VercelRequest = IncomingMessage & { body: any; method?: string };
type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
};

import { getToken } from "next-auth/jwt";

const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID!;
const DATASET    = process.env.VITE_SANITY_DATASET ?? "production";
const TOKEN      = process.env.SANITY_WRITE_TOKEN!;
const API_VER    = "2024-01-01";

// ── Types ─────────────────────────────────────────────────────────────────────

interface InlineImage {
  type: "image";
  base64: string;
  mimeType: string;
  caption?: string;
}

interface TextBlock {
  type: "block";
  style: "normal" | "h2" | "h3" | "blockquote";
  children: Array<{
    text: string;
    marks?: string[];
    href?: string;
  }>;
}

type BodyNode = TextBlock | InlineImage;

interface SubmitPayload {
  title: string;
  author: string;
  subgroup?: string;
  excerpt: string;
  coverImageBase64?: string;
  coverImageMime?: string;
  body: BodyNode[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function sanityUrl(path: string) {
  return `https://${PROJECT_ID}.api.sanity.io/v${API_VER}/${path}`;
}

function authHeader() {
  return { Authorization: `Bearer ${TOKEN}` };
}

async function uploadImage(base64: string, mimeType: string): Promise<string> {
  const base64Data = base64.replace(/^data:[^;]+;base64,/, "");
  const buffer     = Buffer.from(base64Data, "base64");

  const res = await fetch(sanityUrl(`assets/images/${DATASET}`), {
    method:  "POST",
    headers: { ...authHeader(), "Content-Type": mimeType },
    body:    buffer,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Image upload failed (${res.status}): ${text}`);
  }

  const json = await res.json();
  return json.document._id as string;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 96)
    + "-" + Date.now();
}

function toSanitySpan(child: TextBlock["children"][0], spanKey: string) {
  const marks: string[]    = [];
  const markDefs: object[] = [];

  for (const mark of child.marks ?? []) {
    if (mark === "link") {
      const linkKey = `link-${spanKey}`;
      marks.push(linkKey);
      markDefs.push({ _type: "link", _key: linkKey, href: child.href });
    } else {
      marks.push(mark);
    }
  }

  return {
    span: { _type: "span", _key: spanKey, text: child.text, marks },
    markDefs,
  };
}

async function buildPortableText(body: BodyNode[]) {
  const blocks: object[] = [];

  for (let i = 0; i < body.length; i++) {
    const node = body[i];
    const key  = `block-${i}`;

    if (node.type === "image") {
      const assetId = await uploadImage(node.base64, node.mimeType);
      blocks.push({
        _type: "image",
        _key:  key,
        asset: { _type: "reference", _ref: assetId },
        ...(node.caption ? { caption: node.caption } : {}),
      });
      continue;
    }

    const spans:    object[] = [];
    const markDefs: object[] = [];

    node.children.forEach((child, ci) => {
      const spanKey = `${key}-span-${ci}`;
      const { span, markDefs: defs } = toSanitySpan(child, spanKey);
      spans.push(span);
      markDefs.push(...defs);
    });

    blocks.push({
      _type:    "block",
      _key:     key,
      style:    node.style,
      markDefs,
      children: spans,
    });
  }

  return blocks;
}

// ── Handler ───────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ── Auth check ──────────────────────────────────────────────────────────────
  const token = await getToken({
    req:    req as any,
    secret: process.env.AUTH_SECRET!,
  });

  if (!token) {
    return res.status(401).json({ error: "You must be signed in to submit a post." });
  }

  const email = (token.email as string) ?? "";
  if (!email.endsWith("@brown.edu")) {
    return res.status(403).json({ error: "Only @brown.edu accounts can submit posts." });
  }
  // ────────────────────────────────────────────────────────────────────────────

  const payload = req.body as SubmitPayload;
  if (!payload.title || !payload.author || !payload.excerpt || !payload.body?.length) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    let coverImageRef: object | undefined;
    if (payload.coverImageBase64 && payload.coverImageMime) {
      const assetId = await uploadImage(payload.coverImageBase64, payload.coverImageMime);
      coverImageRef = {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
      };
    }

    const portableBody = await buildPortableText(payload.body);
    const docId        = `drafts.blog-${Date.now()}`;
    const slug         = slugify(payload.title);

    const doc = {
      _id:         docId,
      _type:       "blogPost",
      title:       payload.title,
      slug:        { _type: "slug", current: slug },
      author:      payload.author,
      excerpt:     payload.excerpt,
      publishedAt: new Date().toISOString(),
      body:        portableBody,
      ...(payload.subgroup  ? { subgroup:   payload.subgroup  } : {}),
      ...(coverImageRef     ? { coverImage: coverImageRef     } : {}),
    };

    const mutRes = await fetch(sanityUrl(`data/mutate/${DATASET}`), {
      method:  "POST",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body:    JSON.stringify({ mutations: [{ createOrReplace: doc }] }),
    });

    if (!mutRes.ok) {
      const text = await mutRes.text();
      throw new Error(`Sanity mutation failed (${mutRes.status}): ${text}`);
    }

    return res.status(200).json({ ok: true, slug });
  } catch (err: any) {
    console.error("submit-post error:", err);
    return res.status(500).json({ error: err.message ?? "Internal server error" });
  }
}
