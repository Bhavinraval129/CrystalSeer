import Link from "next/link";
import { createClient as createBrowserClient } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";
import CategoryDetailClient from "@/components/CategoryDetailClient";

export async function generateStaticParams() {
  try {
    const supabase = createBrowserClient();
    const { data: categories } = await supabase.from("categories").select("id");
    if (!categories) return [];
    return categories.map(cat => ({
      slug: cat.id,
    }));
  } catch (err) {
    console.error("Error in generateStaticParams:", err);
    return [];
  }
}

export default async function CrystalCategoryPage({ params }) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("id", slug)
    .single();
  
  if (!category) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-2xl font-playfair text-deep-plum">Category Not Found</h1>
        <Link href="/shop/crystal-type" className="text-primary-purple hover:underline mt-4 inline-block">Back to Categories</Link>
      </div>
    );
  }

  // Fetch subcategories under this category
  const { data: subcategories } = await supabase
    .from("subcategories")
    .select("*")
    .eq("category", slug)
    .order("name");

  // Fetch all products under this category (both with and without details pages)
  const { data: productsData } = await supabase
    .from("products")
    .select("*")
    .eq("category", slug)
    .order("name");

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-deep-plum">{category.name}</h1>
        <div className="w-16 h-1 bg-gold-accent mx-auto mt-2"></div>
        <p className="text-ink/75 max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-base">
          Browse our completely natural, 100% energized collection. Find the right crystal for your spiritual journey.
        </p>
      </div>

      <CategoryDetailClient 
        category={category} 
        subcategories={subcategories || []} 
        products={productsData || []} 
      />

    </div>
  );
}
