"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

export default function CategoryDetailClient({ category, subcategories, products }) {
  const [activeSubcategory, setActiveSubcategory] = useState("all");

  const filteredProducts = useMemo(() => {
    if (activeSubcategory === "all") {
      return products;
    }
    return products.filter(p => p.subcategory === activeSubcategory);
  }, [products, activeSubcategory]);

  const activeLabel = useMemo(() => {
    if (activeSubcategory === "all") {
      return `All ${category.name}`;
    }
    const sub = subcategories.find(s => s.id === activeSubcategory);
    return sub ? sub.name : category.name;
  }, [activeSubcategory, subcategories, category]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      
      {/* Left Sidebar */}
      <aside className="w-full lg:w-64 shrink-0 bg-[#F4F9F4]/40 border border-lavender-mist rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 bg-soft-purple-50/20 border-b border-lavender-mist">
          <h3 className="font-playfair font-bold text-deep-plum text-base">All Products</h3>
        </div>
        <div className="divide-y divide-lavender-mist/40">
          <button
            onClick={() => setActiveSubcategory("all")}
            className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors ${
              activeSubcategory === "all"
                ? "bg-primary-purple text-white"
                : "text-ink/80 hover:bg-soft-purple-50/10 hover:text-primary-purple"
            }`}
          >
            All {category.name}
          </button>
          {subcategories.map(sub => (
            <button
              key={sub.id}
              onClick={() => setActiveSubcategory(sub.id)}
              className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors ${
                activeSubcategory === sub.id
                  ? "bg-primary-purple text-white"
                  : "text-ink/80 hover:bg-soft-purple-50/10 hover:text-primary-purple"
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Right Content */}
      <div className="flex-grow w-full">
        <div className="bg-white border border-lavender-mist rounded-xl overflow-hidden shadow-sm">
          
          {/* Card Header */}
          <div className="p-5 px-6 border-b border-lavender-mist bg-[#FDFBF7]/40 text-center">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-deep-plum">{activeLabel}</h2>
          </div>

          {/* Products Table */}
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center text-ink/50 font-light text-sm">
              No products found in this section.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {filteredProducts.map((product, idx) => {
                    const sub = subcategories.find(s => s.id === product.subcategory);
                    return (
                      <tr 
                        key={product.id} 
                        className={`border-b last:border-b-0 border-lavender-mist/50 transition-colors ${
                          idx % 2 === 0 ? "bg-white" : "bg-soft-purple-50/15"
                        }`}
                      >
                        {/* Product Name Column */}
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

                        {/* Subcategory Column */}
                        <td className="w-1/2 py-5 md:py-6 px-6 text-center text-sm md:text-base font-medium text-deep-plum/60 font-inter">
                          {sub ? sub.name : category.name}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
