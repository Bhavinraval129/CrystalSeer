"use client";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { buildWhatsAppLink } from "@/utils/whatsapp";

export default function ShopByCrystalType() {
  const [crystalCategories, setCrystalCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCrystals, setSelectedCrystals] = useState([]);
  const [priceRange, setPriceRange] = useState("all"); // 'all' | 'under-40' | '40-60' | 'over-60'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: cats } = await supabase.from("categories").select("*");
      const { data: prods } = await supabase.from("products").select("*").eq("has_details", true);
      
      if (cats) {
        setCrystalCategories(cats.map(c => ({
          id: c.id,
          name: c.name,
          slug: c.id,
          productType: c.icon || "Raw"
        })));
      }
      if (prods) {
        setProducts(prods.map(p => {
          let price = 0;
          let compareAtPrice = 0;
          let rating = 5;
          if (p.specs) {
            price = parseFloat(p.specs.price || "0");
            compareAtPrice = parseFloat(p.specs.compareAtPrice || "0");
            rating = parseFloat(p.specs.rating || "5");
          }
          return {
            id: p.id,
            name: p.name,
            slug: p.id,
            price,
            compareAtPrice,
            rating,
            imageUrls: [p.image],
            crystalCategorySlug: p.category,
            isBestseller: p.is_best_seller
          };
        }));
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const productTypes = ["Bracelet", "Raw", "Pendant", "Ring", "Tree"];

  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleCrystalChange = (slug) => {
    if (selectedCrystals.includes(slug)) {
      setSelectedCrystals(selectedCrystals.filter(c => c !== slug));
    } else {
      setSelectedCrystals([...selectedCrystals, slug]);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 1. Filter by product type (we need to resolve what product type it is based on the category or details, let's look at the product category productType)
      const crystalCat = crystalCategories.find(c => c.slug === product.crystalCategorySlug);
      const productType = crystalCat ? crystalCat.productType : "";
      
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(productType);

      // 2. Filter by crystal category slug
      const matchesCrystal = selectedCrystals.length === 0 || selectedCrystals.includes(product.crystalCategorySlug);

      // 3. Filter by price
      let matchesPrice = true;
      if (priceRange === "under-40") {
        matchesPrice = product.price < 40;
      } else if (priceRange === "40-60") {
        matchesPrice = product.price >= 40 && product.price <= 60;
      } else if (priceRange === "over-60") {
        matchesPrice = product.price > 60;
      }

      return matchesType && matchesCrystal && matchesPrice;
    });
  }, [selectedTypes, selectedCrystals, priceRange]);

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedCrystals([]);
    setPriceRange("all");
  };

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
        <span className="text-gold-600 text-sm block">✧ Mineral Families</span>
        <h1 className="text-4xl md:text-6xl font-playfair font-semibold text-deep-plum">Shop by Crystal Type</h1>
        <div className="w-16 h-px bg-gold-accent mx-auto"></div>
        <p className="text-ink/75 max-w-2xl mx-auto font-light leading-relaxed">
          Filter our entire stock by healing category or crystal material. Directly secure orders via prefilled WhatsApp coordinates.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Filter Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-8 bg-white p-6 rounded-2xl border border-lavender-mist h-fit">
          <div className="flex justify-between items-center pb-4 border-b border-lavender-mist">
            <h2 className="font-playfair font-bold text-lg text-deep-plum">Filters</h2>
            <button 
              onClick={clearAllFilters}
              className="text-xs text-primary-purple hover:underline"
            >
              Clear All
            </button>
          </div>

          {/* Product Type Filter */}
          <div className="space-y-3">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-400">Product Type</h3>
            <div className="space-y-2">
              {productTypes.map(type => (
                <label key={type} className="flex items-center gap-3 text-sm text-ink cursor-pointer hover:text-primary-purple transition-colors">
                  <input 
                    type="checkbox" 
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                    className="accent-primary-purple w-4 h-4 rounded border-gray-300 focus:ring-primary-purple"
                  />
                  <span>{type}s</span>
                </label>
              ))}
            </div>
          </div>

          {/* Crystal Type Filter */}
          <div className="space-y-3">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-400">Crystal Material</h3>
            <div className="space-y-2">
              {crystalCategories.map(cat => (
                <label key={cat.id} className="flex items-center gap-3 text-sm text-ink cursor-pointer hover:text-primary-purple transition-colors">
                  <input 
                    type="checkbox" 
                    checked={selectedCrystals.includes(cat.slug)}
                    onChange={() => handleCrystalChange(cat.slug)}
                    className="accent-primary-purple w-4 h-4 rounded border-gray-300 focus:ring-primary-purple"
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>


        </aside>

        {/* Product Catalog Grid */}
        <div className="flex-grow">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-lavender-mist rounded-2xl">
              <p className="text-ink/60 font-light">No items match your filter criteria.</p>
              <button 
                onClick={clearAllFilters}
                className="mt-4 px-6 py-2 bg-gradient-btn text-white rounded-full text-sm font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => {
                const crystalCat = crystalCategories.find(c => c.slug === product.crystalCategorySlug);
                return (
                  <div key={product.id} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group">
                    <Link href={`/product/${product.slug}`} className="block">
                      <div className="relative h-64 w-full bg-lavender-mist">
                        <Image src={product.imageUrls[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                        {product.isBestseller && (
                          <span className="absolute top-4 left-4 bg-primary-purple text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">Bestseller</span>
                        )}
                        {crystalCat && (
                          <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-deep-plum text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 border border-lavender-mist">
                            {crystalCat.productType}
                          </span>
                        )}
                      </div>
                      <div className="p-6 text-center space-y-2">
                        <h3 className="text-lg font-playfair font-semibold text-deep-plum group-hover:text-primary-purple transition-colors h-14 flex items-center justify-center line-clamp-2">{product.name}</h3>
                        <div className="flex justify-center items-center gap-1 text-gold-500 text-xs">
                          {"★".repeat(Math.round(product.rating))}
                          <span className="text-xs text-ink/60 ml-1">({product.rating})</span>
                        </div>
                      </div>
                    </Link>
                    <div className="px-6 pb-6 pt-2">
                      <a 
                        href={buildWhatsAppLink(`Hi, I'd like to order ${product.name}`)}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-2.5 inline-flex items-center justify-center gap-2 bg-gradient-btn text-white rounded-xl font-semibold tracking-wide text-xs shadow-md"
                      >
                        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.859.002-2.637-1.019-5.114-2.88-6.974C16.392 1.912 13.91 1.9 11.278 1.9c-5.44 0-9.866 4.418-9.869 9.861-.001 1.502.411 2.97 1.19 4.282L1.57 20.316l4.287-1.121 1.62.959z" />
                        </svg>
                        Order on WhatsApp
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
