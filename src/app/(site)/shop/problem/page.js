import Image from "next/image";
import Link from "next/link";
import { problemCategories } from "@/data/problemCategories";

export const metadata = {
  title: "Shop by Intent | CRYSTALSEER",
  description: "Find healing crystals tailored to your emotional, physical, and financial blockages.",
};

export default function ShopByProblem() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow washes */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#F3E8FF] rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none"></div>

      <div className="text-center mb-16 space-y-4">
        <span className="text-gold-600 text-sm block">✧ Energy Alignment</span>
        <h1 className="text-4xl md:text-6xl font-playfair font-semibold text-deep-plum">Shop by Intent & Problem</h1>
        <div className="w-16 h-px bg-gold-accent mx-auto"></div>
        <p className="text-ink/75 max-w-2xl mx-auto font-light leading-relaxed">
          Crystals hold distinct frequencies. Select a core life challenge or spiritual intention below to discover lab-certified gems activated specifically for that area.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {problemCategories.map(cat => (
          <Link key={cat.id} href={`/shop/problem/${cat.slug}`} className="glass-card rounded-2xl overflow-hidden flex flex-col group h-full">
            <div className="relative h-72 w-full bg-lavender-mist">
              <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
            <div className="p-8 flex flex-col justify-between flex-grow">
              <div className="space-y-4">
                <h2 className="text-2xl font-playfair font-bold text-deep-plum group-hover:text-primary-purple transition-colors">{cat.name}</h2>
                <p className="text-sm text-ink/75 font-light leading-relaxed">{cat.description}</p>
              </div>
              <div className="pt-8 text-primary-purple font-medium text-sm inline-flex items-center group-hover:translate-x-1 transition-transform">
                Browse Matching Crystals →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
