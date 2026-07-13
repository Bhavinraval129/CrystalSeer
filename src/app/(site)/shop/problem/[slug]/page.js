import Image from "next/image";
import Link from "next/link";
import { problemCategories } from "@/data/problemCategories";
import { createClient } from "@/utils/supabase/server";
import { buildWhatsAppLink } from "@/utils/whatsapp";

export async function generateStaticParams() {
  return problemCategories.map(cat => ({
    slug: cat.slug,
  }));
}

export default async function ProblemCategoryPage({ params }) {
  const { slug } = await params;
  const category = problemCategories.find(cat => cat.slug === slug);
  
  if (!category) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-2xl font-playfair text-deep-plum">Category Not Found</h1>
        <Link href="/shop/problem" className="text-primary-purple hover:underline mt-4 inline-block">Back to Categories</Link>
      </div>
    );
  }

  const supabase = await createClient();
  const { data: productsData } = await supabase
    .from("products")
    .select("*")
    .eq("problem_category_slug", slug)
    .eq("has_details", true);

  const filteredProducts = (productsData || []).map(p => {
    let price = 0;
    let compareAtPrice = 0;
    let rating = 5;
    if (p.specs) {
      price = parseFloat(p.specs.price || "0");
      compareAtPrice = parseFloat(p.specs.compareAtPrice || "0");
      rating = parseFloat(p.specs.rating || "5");
    }
    return {
      ...p,
      slug: p.id,
      price,
      compareAtPrice,
      rating,
      imageUrls: [p.image],
      isBestseller: p.is_best_seller
    };
  });

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-gold-600 text-sm block">✧ Shop By Purpose</span>
        <h1 className="text-4xl md:text-6xl font-playfair font-semibold text-deep-plum">{category.name}</h1>
        <div className="w-16 h-px bg-gold-accent mx-auto"></div>
        <p className="text-ink/75 max-w-2xl mx-auto font-light leading-relaxed">
          {category.description} Discover our collection of healer-activated, lab-certified crystals aligned for this path.
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-ink/60 font-light">No crystals currently allocated to this specific intent.</p>
          <Link href="/shop/problem" className="text-primary-purple hover:underline mt-4 inline-block">Browse Other Intents</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group">
              <Link href={`/product/${product.slug}`} className="block">
                <div className="relative h-72 w-full bg-lavender-mist">
                  <Image src={product.imageUrls[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  {product.isBestseller && (
                    <span className="absolute top-4 left-4 bg-primary-purple text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">Bestseller</span>
                  )}
                </div>
                <div className="p-6 text-center space-y-2">
                  <h3 className="text-xl font-playfair font-semibold text-deep-plum group-hover:text-primary-purple transition-colors">{product.name}</h3>
                </div>
              </Link>
              <div className="px-6 pb-6 pt-2">
                <a 
                  href={buildWhatsAppLink(`Hi, I'd like to order ${product.name}`)}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 inline-flex items-center justify-center gap-2 bg-gradient-btn text-white rounded-xl font-semibold tracking-wide text-sm shadow-md"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.859.002-2.637-1.019-5.114-2.88-6.974C16.392 1.912 13.91 1.9 11.278 1.9c-5.44 0-9.866 4.418-9.869 9.861-.001 1.502.411 2.97 1.19 4.282L1.57 20.316l4.287-1.121 1.62.959z" />
                  </svg>
                  Order on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
