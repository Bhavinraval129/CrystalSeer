"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink } from "@/utils/whatsapp";

export default function ProductDetailsClient({ product, relatedProducts }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const images = product.imageUrls && product.imageUrls.length > 0
    ? product.imageUrls
    : ["https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=600&h=800&fit=crop"];

  const whatsappMsg = buildWhatsAppLink(`Hi, I'd like to order ${product.name}`);

  return (
    <div className="space-y-20">
      
      {/* Product Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] w-full bg-white rounded-3xl overflow-hidden border border-lavender-mist shadow-md">
            <Image 
              src={images[activeImageIdx]} 
              alt={product.name} 
              fill 
              className="object-cover" 
              priority 
            />
          </div>
          
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIdx === idx ? "border-primary-purple scale-95 shadow-sm" : "border-lavender-mist hover:border-soft-lilac"
                  }`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Text Information */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-gold-600 text-xs font-semibold uppercase tracking-wider">✦ Lab Certified</span>
              <span className="text-gray-300">|</span>
              <span className="text-primary-purple text-xs font-semibold uppercase tracking-wider">Full Moon Blessed</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-playfair font-semibold text-deep-plum leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-gold-500">
                {"★".repeat(Math.round(product.rating))}
                <span className="text-sm text-ink/75 font-semibold ml-1">({product.rating})</span>
              </div>
              {product.isBestseller && (
                <span className="bg-primary-purple/10 text-primary-purple text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full">
                  Bestseller
                </span>
              )}
            </div>


          </div>

          <div className="w-full h-px bg-lavender-mist"></div>

          <div className="space-y-4">
            <h3 className="font-playfair text-xl font-bold text-deep-plum">Crystal Alignment benefits:</h3>
            <ul className="space-y-2">
              {product.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-ink/80 leading-relaxed font-light">
                  <span className="text-gold-600 mt-1">✦</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-playfair text-xl font-bold text-deep-plum">Product Details:</h3>
            <p className="text-sm text-ink/75 leading-relaxed font-light">
              {product.description}
            </p>
          </div>

          <div className="pt-4">
            <a 
              href={whatsappMsg}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-gradient-btn text-white rounded-full font-semibold tracking-wide text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.859.002-2.637-1.019-5.114-2.88-6.974C16.392 1.912 13.91 1.9 11.278 1.9c-5.44 0-9.866 4.418-9.869 9.861-.001 1.502.411 2.97 1.19 4.282L1.57 20.316l4.287-1.121 1.62.959z" />
              </svg>
              Order via WhatsApp
            </a>
          </div>
        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="space-y-12">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-playfair font-bold text-deep-plum">Related Crystals</h2>
            <div className="w-12 h-px bg-gold-accent md:mx-0 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.slice(0, 3).map(prod => (
              <div key={prod.id} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group">
                <Link href={`/product/${prod.slug}`} className="block">
                  <div className="relative h-64 w-full bg-lavender-mist">
                    <Image src={prod.imageUrls[0]} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="p-6 text-center space-y-2">
                    <h3 className="text-lg font-playfair font-semibold text-deep-plum group-hover:text-primary-purple transition-colors h-14 flex items-center justify-center line-clamp-2">{prod.name}</h3>
                  </div>
                </Link>
                <div className="px-6 pb-6 pt-2">
                  <a 
                    href={buildWhatsAppLink(`Hi, I'd like to order ${prod.name}`)}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-2.5 inline-flex items-center justify-center gap-2 bg-gradient-btn text-white rounded-xl font-semibold tracking-wide text-xs shadow-md"
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
        </div>
      )}

    </div>
  );
}
