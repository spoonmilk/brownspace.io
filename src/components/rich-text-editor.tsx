// src/components/RichTextEditor.tsx
//
// INSTALL:
//   npm install @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold, Italic, Code, Heading2, Heading3,
  Quote, Image as ImageIcon, Link as LinkIcon,
  Undo, Redo, Pilcrow,
} from "lucide-react";
import { useRef } from "react";

interface RichTextEditorProps {
  onChange: (json: object) => void;
  placeholder?: string;
}

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

const ToolbarButton = ({ onClick, active, disabled, title, children }: ToolbarButtonProps) => (
  <button
    type="button"
    onMouseDown={(e) => { e.preventDefault(); onClick(); }}
    disabled={disabled}
    title={title}
    className={`
      p-1.5 rounded transition-colors
      ${active
        ? "bg-primary/20 text-primary"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
      }
      ${disabled ? "opacity-30 cursor-not-allowed" : ""}
    `}
  >
    {children}
  </button>
);

const Divider = () => <div className="w-px h-5 bg-border mx-1 self-center" />;

export function RichTextEditor({ onChange, placeholder = "Write your post..." }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    editorProps: {
      attributes: {
        class: "outline-none min-h-[320px] px-4 py-3",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (!url) return;
    if (editor.state.selection.empty) {
      // No text selected — insert the URL as link text too
      editor.chain().focus().insertContent(
        `<a href="${url}">${url}</a>`
      ).run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      editor.chain().focus().setImage({ src }).run();
    };
    reader.readAsDataURL(file);
    // Reset so the same file can be re-selected
    e.target.value = "";
  };

  return (
    <div className="border glow-border rounded-lg overflow-hidden">
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-border/60 bg-muted/30">

        {/* History */}
        <ToolbarButton
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo size={15} />
        </ToolbarButton>

        <Divider />

        {/* Block styles */}
        <ToolbarButton
          title="Paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive("paragraph")}
        >
          <Pilcrow size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Heading 2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Heading 3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
        >
          <Heading3 size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        >
          <Quote size={15} />
        </ToolbarButton>

        <Divider />

        {/* Inline marks */}
        <ToolbarButton
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Inline code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
        >
          <Code size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Link"
          onClick={addLink}
          active={editor.isActive("link")}
        >
          <LinkIcon size={15} />
        </ToolbarButton>

        <Divider />

        {/* Image upload */}
        <ToolbarButton
          title="Insert image"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon size={15} />
        </ToolbarButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {/* ── Editor area ── */}
      <EditorContent
        editor={editor}
        className="
          [&_.ProseMirror_p]:mb-4
          [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mt-6 [&_.ProseMirror_h2]:mb-3
          [&_.ProseMirror_h3]:text-xl [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:mt-5 [&_.ProseMirror_h3]:mb-2
          [&_.ProseMirror_blockquote]:border-l-2 [&_.ProseMirror_blockquote]:border-primary [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-muted-foreground
          [&_.ProseMirror_code]:bg-muted [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:font-mono [&_.ProseMirror_code]:text-sm
          [&_.ProseMirror_a]:text-primary [&_.ProseMirror_a]:underline
          [&_.ProseMirror_img]:rounded-lg [&_.ProseMirror_img]:my-4 [&_.ProseMirror_img]:max-w-full
          [&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.is-editor-empty:first-child::before]:text-muted-foreground/50 [&_.is-editor-empty:first-child::before]:float-left [&_.is-editor-empty:first-child::before]:pointer-events-none [&_.is-editor-empty:first-child::before]:h-0
        "
      />
    </div>
  );
}
