"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function ShopByCrystalType() {
  const [crystalCategories, setCrystalCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      
      const [catsRes, subsRes, prodsRes] = await Promise.all([
        supabase.from("categories").select("*").order("name"),
        supabase.from("subcategories").select("*").order("name"),
        supabase.from("products").select("*").order("name")
      ]);

      if (catsRes.data) setCrystalCategories(catsRes.data);
      if (subsRes.data) setSubcategories(subsRes.data);
      if (prodsRes.data) setProducts(prodsRes.data);
      
      setLoading(false);
    }
    loadData();
  }, []);

  // Group products by category
  const categoriesWithProducts = useMemo(() => {
    return crystalCategories.map(cat => {
      const catProducts = products.filter(p => p.category === cat.id);
      return {
        ...cat,
        products: catProducts
      };
    }).filter(cat => cat.products.length > 0);
  }, [crystalCategories, products]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 text-center">
        <div className="w-12 h-12 border-4 border-soft-purple-200 border-t-primary-purple rounded-full animate-spin mx-auto" />
        <p className="text-sm text-deep-plum/60 mt-4 font-light">Connecting to Temple Vaults...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-6xl font-playfair font-extrabold text-deep-plum">Our Collections</h1>
        <div className="w-16 h-1 bg-gold-accent mx-auto mt-2"></div>
        <p className="text-ink/75 max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-base">
          Browse our completely natural, 100% energized collection. Find the right crystal for your spiritual journey.
        </p>
      </div>

      {/* Categories Tables */}
      <div className="space-y-12 max-w-5xl mx-auto">
        {categoriesWithProducts.map(category => (
          <div key={category.id} className="bg-white border border-lavender-mist rounded-xl overflow-hidden shadow-sm">
            
            {/* Category Header */}
            <div className="p-5 px-6 border-b border-lavender-mist flex items-center justify-between bg-[#FDFBF7]/40">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-deep-plum">{category.name}</h2>
              <Link 
                href={`/shop/crystal-type/${category.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-primary-purple/20 text-primary-purple hover:bg-primary-purple hover:text-white rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm"
              >
                View Collection <span className="text-sm">→</span>
              </Link>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {category.products.map((product, idx) => {
                    const sub = subcategories.find(s => s.id === product.subcategory);
                    return (
                      <tr 
                        key={product.id} 
                        className={`border-b last:border-b-0 border-lavender-mist/50 transition-colors ${
                          idx % 2 === 0 ? "bg-white" : "bg-soft-purple-50/15"
                        }`}
                      >
                        {/* Product Name Column (50% width, centered) */}
                        <td className="w-1/2 py-5 md:py-6 px-6 text-center border-r border-lavender-mist/50">
                          {product.has_details ? (
                            <Link 
                              href={`/product/${product.id}`}
                              className="font-inter font-bold text-base md:text-lg tracking-widest text-deep-plum hover:text-primary-purple transition-colors inline-block uppercase"
                            >
                              {product.name}
                            </Link>
                          ) : (
                            <span className="font-inter font-bold text-base md:text-lg tracking-widest text-deep-plum uppercase">
                              {product.name}
                            </span>
                          )}
                        </td>

                        {/* Subcategory Column (50% width, centered) */}
                        <td className="w-1/2 py-5 md:py-6 px-6 text-center text-sm md:text-base font-medium text-deep-plum/60 font-inter">
                          {sub ? sub.name : category.name}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
