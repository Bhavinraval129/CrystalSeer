import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";

export async function generateStaticParams() {
  return blogPosts.map(p => ({
    slug: p.slug,
  }));
}

export default async function BlogPostDetailPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-2xl font-playfair text-deep-plum">Article Not Found</h1>
        <Link href="/blog" className="text-primary-purple hover:underline mt-4 inline-block">Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link href="/blog" className="text-primary-purple hover:text-deep-plum font-semibold text-sm inline-flex items-center gap-2 mb-8">
        ← Back to all Blogs
      </Link>

      <div className="space-y-6">
        <div className="space-y-3">
          <span className="text-xs font-semibold text-primary-purple uppercase tracking-wider block">
            Published on {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-deep-plum leading-tight">
            {post.title}
          </h1>
        </div>

        <div className="relative aspect-[16/9] w-full bg-lavender-mist rounded-3xl overflow-hidden border border-lavender-mist shadow-md">
          <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover" priority />
        </div>

        <div className="pt-8 text-ink/85 leading-relaxed font-light text-base space-y-6 whitespace-pre-line font-inter">
          {post.content}
        </div>
      </div>
    </article>
  );
}
