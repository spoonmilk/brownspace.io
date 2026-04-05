// src/pages/BlogPostPage.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { createClient } from "@sanity/client";
import { PortableText, PortableTextComponents, PortableTextBlock } from "@portabletext/react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// npm install @portabletext/react

const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

interface BlogPost {
  _id: string;
  title: string;
  author: string;
  subgroup?: string;
  publishedAt: string;
  excerpt: string;
  coverImage?: { asset: { _ref: string } };
  body: PortableTextBlock[];
}

const POST_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    author,
    subgroup,
    publishedAt,
    excerpt,
    coverImage,
    body
  }
`;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function sanityImageUrl(imageRef: string) {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
  const dataset = import.meta.env.VITE_SANITY_DATASET ?? "production";
  const id = imageRef.replace("image-", "").replace(/-(png|jpg|jpeg|webp|gif)$/, ".$1").replace(/-(\d+x\d+)-/, "/$1-");
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}?w=900&fit=max`;
}

// Portable Text rendering components — maps Sanity block types to styled HTML
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base text-foreground/90 leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary pl-5 my-6 text-muted-foreground italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="mono text-sm bg-muted px-1.5 py-0.5 rounded">{children}</code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer noopener"
        className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <img
            src={sanityImageUrl(value.asset._ref)}
            alt={value.caption ?? ""}
            className="w-full rounded-lg"
          />
          {value.caption && (
            <figcaption className="mono text-xs text-muted-foreground text-center mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    sanityClient
      .fetch<BlogPost>(POST_QUERY, { slug })
      .then((data) => {
        if (!data) setError("Post not found.");
        else setPost(data);
        setLoading(false);
      })
      .catch(() => { setError("Could not load post."); setLoading(false); });
  }, [slug]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">

        {loading && (
          <div className="container py-24 space-y-4 max-w-3xl mx-auto">
            <div className="h-8 w-48 bg-muted/50 rounded animate-pulse" />
            <div className="h-12 w-full bg-muted/50 rounded animate-pulse" />
            <div className="h-64 w-full bg-muted/50 rounded animate-pulse" />
          </div>
        )}

        {error && (
          <div className="container py-24 text-center">
            <p className="text-destructive mb-4">{error}</p>
            <Link to="/blog" className="mono text-sm text-primary hover:underline">
              ← Back to blog
            </Link>
          </div>
        )}

        {post && (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {/* Cover image */}
            {post.coverImage && (
              <div className="w-full h-72 md:h-96 overflow-hidden">
                <img
                  src={sanityImageUrl(post.coverImage.asset._ref)}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="container max-w-3xl py-12">
              {/* Back link */}
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 mono text-xs text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft size={14} />
                BACK TO BLOG
              </Link>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {post.subgroup && (
                  <span className="mono text-xs text-primary tracking-widest">
                    {post.subgroup.toUpperCase()}
                  </span>
                )}
                <span className="mono text-xs text-muted-foreground">
                  {formatDate(post.publishedAt)}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                {post.title}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <span className="signal-dot" />
                <span className="mono text-sm text-muted-foreground">{post.author}</span>
              </div>

              <div className="horizon mb-8" />

              {/* Body */}
              <div className="prose-custom">
                <PortableText value={post.body} components={components} />
              </div>

              <div className="horizon mt-12 mb-8" />

              <Link
                to="/blog"
                className="inline-flex items-center gap-2 mono text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft size={14} />
                BACK TO BLOG
              </Link>
            </div>
          </motion.article>
        )}
      </main>
      <Footer />
    </div>
  );
}
