import Link from "next/link";
import { createClient as createBrowserClient } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";
import ProductDetailsClient from "@/components/ProductDetailsClient";

export async function generateStaticParams() {
  try {
    const supabase = createBrowserClient();
    const { data: products } = await supabase.from("products").select("id").eq("has_details", true);
    if (!products) return [];
    return products.map(p => ({
      slug: p.id,
    }));
  } catch (err) {
    console.error("Error in generateStaticParams:", err);
    return [];
  }
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: p, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", slug)
    .single();

  if (error || !p) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-2xl font-playfair text-deep-plum">Product Not Found</h1>
        <Link href="/shop/crystal-type" className="text-primary-purple hover:underline mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  // Parse specs and formatting to match ProductDetailsClient expectations
  let price = 0;
  let compareAtPrice = 0;
  let rating = 5;
  if (p.specs) {
    price = parseFloat(p.specs.price || "0");
    compareAtPrice = parseFloat(p.specs.compareAtPrice || "0");
    rating = parseFloat(p.specs.rating || "5");
  }

  const product = {
    ...p,
    slug: p.id,
    price,
    compareAtPrice,
    rating,
    imageUrls: [p.image],
    crystalCategorySlug: p.category
  };

  // Get related products
  const { data: related } = await supabase
    .from("products")
    .select("*")
    .eq("category", p.category)
    .neq("id", p.id)
    .eq("has_details", true)
    .limit(4);

  const relatedProducts = (related || []).map(rp => {
    let rPrice = 0;
    let rCompareAtPrice = 0;
    let rRating = 5;
    if (rp.specs) {
      rPrice = parseFloat(rp.specs.price || "0");
      rCompareAtPrice = parseFloat(rp.specs.compareAtPrice || "0");
      rRating = parseFloat(rp.specs.rating || "5");
    }
    return {
      ...rp,
      slug: rp.id,
      price: rPrice,
      compareAtPrice: rCompareAtPrice,
      rating: rRating,
      imageUrls: [rp.image],
      crystalCategorySlug: rp.category
    };
  });

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
    </div>
  );
}
