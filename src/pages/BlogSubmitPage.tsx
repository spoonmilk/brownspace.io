// src/pages/BlogSubmitPage.tsx

import { useState, useRef, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RichTextEditor } from "@/components/rich-text-editor";
import { tiptapToPortableText } from "@/lib/tiptapToPortableText";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, CheckCircle2, AlertCircle, LogIn } from "lucide-react";

const SUBGROUPS = [
  "ADCS", "Avionics", "Flight Software",
  "Ground Software", "Operations", "R&D", "Structures", "Club",
];

type Status = "idle" | "submitting" | "success" | "error";

const Field = ({
  label, required, hint, children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="mono text-xs tracking-widest text-muted-foreground uppercase">
      {label}{required && <span className="text-primary ml-1">*</span>}
    </label>
    {children}
    {hint && <p className="text-xs text-muted-foreground/70">{hint}</p>}
  </div>
);

const inputClass =
  "w-full bg-background border border-border rounded-md px-3 py-2 text-sm " +
  "focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 " +
  "placeholder:text-muted-foreground/50 transition-colors";

export default function BlogSubmitPage() {
  const { data: session, status: sessionStatus } = useSession();

  const [title,    setTitle]    = useState("");
  const [author,   setAuthor]   = useState("");
  const [subgroup, setSubgroup] = useState("");
  const [excerpt,  setExcerpt]  = useState("");
  const [bodyJson, setBodyJson] = useState<object | null>(null);
  const [cover,    setCover]    = useState<{ file: File; preview: string } | null>(null);
  const [status,   setStatus]   = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedSlug, setSubmittedSlug] = useState("");

  const coverInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill author name from Google account
  useEffect(() => {
    if (session?.user?.name && !author) {
      setAuthor(session.user.name);
    }
  }, [session]);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setCover({ file, preview });
    e.target.value = "";
  };

  const removeCover = () => {
    if (cover) URL.revokeObjectURL(cover.preview);
    setCover(null);
  };

  const handleSubmit = async () => {
    if (!title.trim())   return setErrorMsg("Please enter a title.");
    if (!author.trim())  return setErrorMsg("Please enter your name.");
    if (!excerpt.trim()) return setErrorMsg("Please enter an excerpt.");
    if (!bodyJson)       return setErrorMsg("Please write some content.");
    setErrorMsg("");
    setStatus("submitting");

    try {
      let coverImageBase64: string | undefined;
      let coverImageMime:   string | undefined;
      if (cover) {
        coverImageBase64 = await fileToBase64(cover.file);
        coverImageMime   = cover.file.type;
      }

      const body = tiptapToPortableText(bodyJson as any);

      const payload = {
        title:   title.trim(),
        author:  author.trim(),
        excerpt: excerpt.trim(),
        body,
        ...(subgroup         ? { subgroup }                         : {}),
        ...(coverImageBase64 ? { coverImageBase64, coverImageMime } : {}),
      };

      const res = await fetch("/api/submit-post", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Submission failed.");

      setSubmittedSlug(json.slug);
      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message ?? "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  // ── Loading ───────────────────────────────────────────────────────────────

  if (sessionStatus === "loading") {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <span className="mono text-sm text-muted-foreground animate-pulse tracking-widest">
            CHECKING SESSION...
          </span>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Sign-in gate ──────────────────────────────────────────────────────────

  if (!session) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-sm px-6"
          >
            <LogIn className="mx-auto mb-6 text-primary" size={40} />
            <div className="section-tag justify-center mb-4">Access Required</div>
            <h1 className="text-2xl font-bold mb-3">Sign in to submit a post</h1>
            <div className="horizon mb-4" />
            <p className="text-muted-foreground text-sm mb-8">
              Blog submissions are open to Brown University members only.
              Sign in with your <span className="text-primary">@brown.edu</span> Google
              account to continue.
            </p>
            <button
              onClick={() => signIn("google", { callbackUrl: "/blog/submit" })}
              className="
                w-full mono text-sm tracking-widest
                border border-primary/40 text-primary
                px-6 py-3 rounded-md
                hover:bg-primary/10 hover:border-primary/60
                transition-colors flex items-center justify-center gap-3
              "
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              SIGN IN WITH GOOGLE
            </button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Success ───────────────────────────────────────────────────────────────

  if (status === "success") {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md px-6"
          >
            <CheckCircle2 className="mx-auto mb-6 text-primary" size={48} />
            <div className="section-tag justify-center mb-4">Submitted</div>
            <h1 className="text-3xl font-bold mb-3">Post received!</h1>
            <div className="horizon mb-4" />
            <p className="text-muted-foreground mb-2">
              Your post has been submitted as a draft. An admin will review and
              publish it shortly.
            </p>
            <p className="mono text-xs text-muted-foreground/60 mb-8">
              DRAFT ID: {submittedSlug}
            </p>
            <a href="/blog" className="mono text-sm text-primary hover:underline tracking-widest">
              ← BACK TO BLOG
            </a>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container max-w-3xl py-16 flex-1">

        <div className="section-tag mb-4">Transmissions</div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold">Submit a Blog Post</h1>
          <div className="hidden sm:flex items-center gap-2">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt={session.user.name ?? ""}
                className="w-7 h-7 rounded-full"
              />
            )}
            <span className="mono text-xs text-muted-foreground">
              {session.user?.email}
            </span>
          </div>
        </div>
        <p className="text-muted-foreground mb-2">
          Your post will be reviewed by an admin before going live.
        </p>
        <div className="horizon mb-10" />

        <div className="flex flex-col gap-8">

          <Field label="Title" required>
            <input
              className={inputClass}
              placeholder="e.g. How we designed the PVDX chassis"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Your Name" required>
              <input
                className={inputClass}
                placeholder="First Last"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Field>
            <Field label="Subgroup" hint="Optional — tag this post with your team.">
              <select
                className={inputClass + " cursor-pointer"}
                value={subgroup}
                onChange={(e) => setSubgroup(e.target.value)}
              >
                <option value="">None</option>
                {SUBGROUPS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field
            label="Excerpt"
            required
            hint="A short summary shown on the blog listing page (max 300 characters)."
          >
            <textarea
              className={inputClass + " resize-none"}
              rows={3}
              maxLength={300}
              placeholder="A one or two sentence summary of your post..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
            <p className="text-xs text-muted-foreground/60 self-end">
              {excerpt.length}/300
            </p>
          </Field>

          <Field
            label="Cover Image"
            hint="Optional — appears at the top of your post and on the listing card."
          >
            {cover ? (
              <div className="relative w-full">
                <img
                  src={cover.preview}
                  alt="Cover preview"
                  className="w-full h-48 object-cover rounded-lg border border-border"
                />
                <button
                  type="button"
                  onClick={removeCover}
                  className="absolute top-2 right-2 bg-background/80 border border-border rounded-full p-1 hover:bg-destructive/10 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="
                  w-full h-32 border border-dashed border-border rounded-lg
                  flex flex-col items-center justify-center gap-2
                  text-muted-foreground hover:text-foreground hover:border-primary/40
                  transition-colors
                "
              >
                <Upload size={20} />
                <span className="mono text-xs tracking-widest">CLICK TO UPLOAD</span>
              </button>
            )}
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverChange}
            />
          </Field>

          <Field
            label="Content"
            required
            hint="Use the toolbar to add headings, bold/italic, links, and images."
          >
            <RichTextEditor onChange={setBodyJson} />
          </Field>

          <AnimatePresence>
            {(status === "error" || errorMsg) && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 text-destructive border border-destructive/30 bg-destructive/5 rounded-md px-4 py-3"
              >
                <AlertCircle size={16} className="shrink-0" />
                <p className="text-sm">{errorMsg}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === "submitting"}
            className="
              self-start mono text-sm tracking-widest
              border border-primary/40 text-primary
              px-6 py-2.5 rounded-md
              hover:bg-primary/10 hover:border-primary/60
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
            "
          >
            {status === "submitting" ? "SUBMITTING..." : "SUBMIT POST →"}
          </button>

        </div>
      </main>
      <Footer />
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}
