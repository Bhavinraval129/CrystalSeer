"use client";

import { useEffect, useState } from "react";
import { Package, Layers, TrendingUp } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data: dbCategories } = await supabase.from("categories").select("*");
      if (dbCategories) setCategories(dbCategories);

      const { data: dbProducts } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (dbProducts) setProducts(dbProducts);
      setLoading(false);
    }
    fetchData();
  }, []);

  const bestSellersCount = products.filter((p) => p.is_best_seller).length;

  const stats = [
    {
      label: "Total Products",
      value: loading ? "..." : products.length,
      icon: Package,
      color: "from-deep-plum to-primary-purple",
      href: "/admin/products",
    },
    {
      label: "Categories",
      value: loading ? "..." : categories.length,
      icon: Layers,
      color: "from-primary-purple to-soft-purple-400",
      href: "/admin/categories",
    },
    {
      label: "Best Sellers",
      value: loading ? "..." : bestSellersCount,
      icon: TrendingUp,
      color: "from-gold-accent to-gold-300",
      href: "/admin/products",
    },
  ];

  const recentProducts = products.slice(0, 4);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-deep-plum">Dashboard</h1>
        <p className="text-deep-plum/60 mt-1">Welcome back! Here&apos;s an overview of Crystal Seer.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-soft-purple-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${stat.color} opacity-10 rounded-bl-[100%] group-hover:opacity-20 transition-opacity`} />
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-deep-plum">{stat.value}</p>
            <p className="text-sm text-deep-plum/50 mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-2xl shadow-sm border border-soft-purple-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-soft-purple-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-deep-plum">Recent Products</h2>
          <Link href="/admin/products" className="text-sm text-primary-purple hover:underline font-medium">
            View All →
          </Link>
        </div>
        <div className="divide-y divide-soft-purple-100">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-3 border-soft-purple-200 border-t-primary-purple rounded-full animate-spin" />
            </div>
          ) : (
            recentProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 px-6 py-4 hover:bg-lavender-mist transition-colors">
                <div className="w-12 h-12 bg-soft-purple-100 rounded-xl flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-primary-purple" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-deep-plum truncate">{product.name}</p>
                  <p className="text-sm text-deep-plum/50 truncate">{(product.category || "").replace(/-/g, " ")}</p>
                </div>
                {product.is_best_seller && (
                  <span className="hidden sm:inline-flex text-xs bg-gold-50 text-gold-accent px-3 py-1 rounded-full font-semibold border border-gold-200">
                    Best Seller
                  </span>
                )}
              </div>
            ))
          )}
          {!loading && recentProducts.length === 0 && (
            <p className="p-6 text-center text-sm text-deep-plum/50">No products found. Add your first product!</p>
          )}
        </div>
      </div>
    </div>
  );
}
