import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";

export const metadata = {
  title: "Spiritual Blog & Lunar Guides | CRYSTALSEER",
  description: "Read about crystal cleansing, money manifestation using Pyrite, and tarot layout explanations.",
};

export default function BlogIndexPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-gold-600 text-sm block">✧ Spiritual Chronicles</span>
        <h1 className="text-4xl md:text-6xl font-playfair font-semibold text-deep-plum font-bold">The Cosmic Blog</h1>
        <div className="w-16 h-px bg-gold-accent mx-auto"></div>
        <p className="text-ink/75 max-w-2xl mx-auto font-light leading-relaxed">
          Stay attuned to lunar phases, discover how to work with crystals, and explore historical tarot methods.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {sortedPosts.map(post => (
          <article key={post.id} className="glass-card rounded-[2rem] overflow-hidden flex flex-col group border border-lavender-mist">
            <div className="relative h-64 w-full bg-lavender-mist">
              <Image 
                src={post.coverImageUrl} 
                alt={post.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                loading="lazy" 
              />
            </div>
            <div className="p-8 space-y-4 flex flex-col justify-between flex-grow">
              <div className="space-y-3">
                <span className="text-xs font-semibold text-primary-purple uppercase tracking-wider">
                  Published on {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <h2 className="text-2xl font-playfair font-bold text-deep-plum group-hover:text-primary-purple transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-ink/75 font-light leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
              <div className="pt-6">
                <Link href={`/blog/${post.slug}`} className="text-primary-purple hover:text-deep-plum font-semibold text-sm inline-flex items-center gap-2">
                  Read Article →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
