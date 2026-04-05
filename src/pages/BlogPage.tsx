// src/pages/BlogPage.tsx
import { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  author: string;
  subgroup?: string;
  publishedAt: string;
  excerpt: string;
  coverImage?: { asset: { _ref: string } };
}

const POSTS_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    subgroup,
    publishedAt,
    excerpt,
    coverImage
  }
`;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sanityClient
      .fetch<BlogPost[]>(POSTS_QUERY)
      .then((data) => { setPosts(data); setLoading(false); })
      .catch(() => { setError("Could not load posts."); setLoading(false); });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container py-24 flex-1">

        <div className="section-tag mb-4">Transmissions</div>
        <div className="flex items-end justify-between mb-4">
          <h1 className="text-4xl md:text-5xl font-bold">BSE Blog</h1>
          <a
            href="/blog/submit"
            className="mono text-xs tracking-widest text-primary border border-primary/30 px-4 py-2 rounded-md hover:bg-primary/10 hover:border-primary/50 transition-colors hidden sm:block"
          >
            + SUBMIT A POST
          </a>
        </div>
        <p className="text-muted-foreground text-lg mb-2">
          Updates, research notes, and stories from our members.
        </p>
        <a
          href="/blog/submit"
          className="mono text-xs tracking-widest text-primary sm:hidden mb-2 inline-block"
        >
          + SUBMIT A POST
        </a>
        <div className="horizon mb-12" />

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 rounded-lg bg-muted/50 animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-destructive">{error}</p>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-24">
            <p className="mono text-muted-foreground text-sm tracking-widest">
              NO POSTS YET — CHECK BACK SOON
            </p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link to={`/blog/${post.slug.current}`} className="block h-full">
                  <article className="h-full border glow-border rounded-lg overflow-hidden bg-card flex flex-col hover:border-primary/40 transition-colors">
                    {/* Cover image */}
                    {post.coverImage ? (
                      <CoverImage imageRef={post.coverImage.asset._ref} title={post.title} />
                    ) : (
                      <div className="h-36 bg-muted/40 flex items-center justify-center">
                        <span className="mono text-xs text-muted-foreground tracking-widest">
                          BSE — BROWN SPACE ENGINEERING
                        </span>
                      </div>
                    )}

                    <div className="p-5 flex flex-col flex-1">
                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-3">
                        {post.subgroup && (
                          <span className="mono text-xs text-primary tracking-widest">
                            {post.subgroup.toUpperCase()}
                          </span>
                        )}
                        <span className="mono text-xs text-muted-foreground ml-auto">
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>

                      <div className="horizon mb-3" />

                      <h2 className="text-lg font-bold leading-snug mb-2">{post.title}</h2>
                      <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
                        <span className="signal-dot" />
                        <span className="mono text-xs text-muted-foreground">{post.author}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

// Resolves a Sanity image ref to a CDN URL without the image-url builder
function CoverImage({ imageRef, title }: { imageRef: string; title: string }) {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
  const dataset = import.meta.env.VITE_SANITY_DATASET ?? "production";
  // imageRef format: image-<id>-<width>x<height>-<format>
  const id = imageRef.replace("image-", "").replace(/-(png|jpg|jpeg|webp|gif)$/, ".$1").replace(/-(\d+x\d+)-/, "/$1-");
  const url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}?w=600&h=300&fit=crop`;
  return (
    <img
      src={url}
      alt={title}
      className="w-full h-36 object-cover"
    />
  );
}
