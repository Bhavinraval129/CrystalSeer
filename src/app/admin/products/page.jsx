"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Pencil, Trash2, X, Package, Filter } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

function ToggleSwitch({ checked, onChange, disabled }) {
  return (
    <label className={`flex items-center relative ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
      <input type="checkbox" className="sr-only" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      <div className={`w-11 h-6 rounded-full transition-colors ${checked ? "bg-primary-purple" : "bg-soft-purple-200"}`}>
        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform ${checked ? "translate-x-5" : "translate-x-0 shadow-sm"}`} />
      </div>
    </label>
  );
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deleteModal, setDeleteModal] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data: dbCategories } = await supabase.from("categories").select("*").order("name");
      if (dbCategories) setCategories(dbCategories);
      const { data: dbProducts } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (dbProducts) {
        setProducts(dbProducts.map((p) => ({
          id: p.id,
          name: p.name,
          category: p.category || "",
          shortBenefit: p.short_benefit || "",
          isBestSeller: p.is_best_seller || false,
          image: p.image || "",
          hasDetails: p.has_details ?? true,
        })));
      }
    }
    fetchData();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === "all" || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleDelete = async (product) => {
    const supabase = createClient();
    const { error } = await supabase.from("products").delete().eq("id", product.id);
    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    }
    setDeleteModal(null);
  };

  const toggleDetails = async (id, current) => {
    const nextVal = !current;
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, hasDetails: nextVal } : p)));
    const supabase = createClient();
    const { error } = await supabase.from("products").update({ has_details: nextVal }).eq("id", id);
    if (error) {
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, hasDetails: current } : p)));
      alert("Failed to update: " + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-deep-plum">Products</h1>
          <p className="text-deep-plum/60 mt-1">Manage your crystal catalog ({filteredProducts.length} items)</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center gap-2 bg-deep-plum text-white px-5 py-3 rounded-xl font-medium hover:bg-primary-purple transition-colors shadow-lg self-start">
          <Plus className="w-5 h-5" /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-soft-purple-200 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-deep-plum/40" />
          <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-soft-purple-200 focus:outline-none focus:ring-2 focus:ring-primary-purple/30 bg-lavender-mist text-sm" />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-deep-plum/40" />
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="pl-10 pr-8 py-2.5 rounded-xl border border-soft-purple-200 focus:outline-none focus:ring-2 focus:ring-primary-purple/30 bg-lavender-mist text-sm appearance-none cursor-pointer min-w-[180px]">
            <option value="all">All Categories</option>
            {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-soft-purple-200 overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-soft-purple-100 bg-lavender-mist">
                <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-deep-plum/50 font-semibold">Product</th>
                <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-deep-plum/50 font-semibold">Category</th>
                <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-deep-plum/50 font-semibold">Details Page</th>
                <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-deep-plum/50 font-semibold">Status</th>
                <th className="text-right px-6 py-4 text-xs uppercase tracking-wider text-deep-plum/50 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-soft-purple-100">
              {filteredProducts.map((product) => {
                const cat = categories.find((c) => c.id === product.category);
                return (
                  <tr key={product.id} className="hover:bg-lavender-mist transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-soft-purple-100 shrink-0">
                          {product.image ? (
                            <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-5 h-5 text-primary-purple/40" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-deep-plum">{product.name}</p>
                          <p className="text-sm text-deep-plum/50 truncate max-w-[250px]">{product.shortBenefit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-deep-plum/70 bg-soft-purple-100 px-3 py-1 rounded-full">{cat?.name || product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 items-start">
                        <ToggleSwitch checked={product.hasDetails} onChange={() => toggleDetails(product.id, product.hasDetails)} />
                        <span className="text-xs text-deep-plum/50">{product.hasDetails ? "ON" : "OFF"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {product.hasDetails === false ? (
                        <span className="text-xs bg-red-50 text-red-500 px-3 py-1 rounded-full font-medium border border-red-200 whitespace-nowrap">Inactive</span>
                      ) : product.isBestSeller ? (
                        <span className="text-xs bg-gold-50 text-gold-accent px-3 py-1 rounded-full font-semibold border border-gold-200 whitespace-nowrap">Best Seller</span>
                      ) : (
                        <span className="text-xs bg-soft-purple-100 text-primary-purple px-3 py-1 rounded-full font-medium border border-soft-purple-200 whitespace-nowrap">Active</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/products/${product.id}/edit`} className="p-2 rounded-lg hover:bg-soft-purple-100 text-deep-plum transition-colors" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => setDeleteModal(product)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-soft-purple-100">
          {filteredProducts.map((product) => {
            const cat = categories.find((c) => c.id === product.category);
            return (
              <div key={product.id} className="p-4 flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-soft-purple-100 shrink-0">
                  {product.image ? (
                    <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary-purple/40" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-deep-plum truncate">{product.name}</p>
                  <p className="text-sm text-deep-plum/50 mt-0.5">{cat?.name || product.category}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-deep-plum/50 font-medium">Details:</span>
                      <ToggleSwitch checked={product.hasDetails} onChange={() => toggleDetails(product.id, product.hasDetails)} />
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/products/${product.id}/edit`} className="flex items-center gap-1 text-xs text-deep-plum bg-soft-purple-100 px-3 py-1.5 rounded-lg font-medium">
                        <Pencil className="w-3 h-3" /> Edit
                      </Link>
                      <button onClick={() => setDeleteModal(product)} className="flex items-center gap-1 text-xs text-red-500 bg-red-50 px-3 py-1.5 rounded-lg font-medium">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-16 text-center">
            <Package className="w-12 h-12 text-primary-purple/20 mx-auto mb-4" />
            <p className="text-deep-plum/50 font-medium">No products found</p>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <button onClick={() => setDeleteModal(null)} className="p-1 rounded-lg hover:bg-lavender-mist">
                <X className="w-5 h-5 text-deep-plum/40" />
              </button>
            </div>
            <h3 className="text-lg font-bold text-deep-plum">Delete Product?</h3>
            <p className="text-sm text-deep-plum/60 mt-2">Are you sure you want to delete <strong>&quot;{deleteModal.name}&quot;</strong>? This action cannot be undone.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleteModal(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-soft-purple-200 text-deep-plum font-medium hover:bg-lavender-mist">Cancel</button>
              <button onClick={() => handleDelete(deleteModal)} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 shadow-lg shadow-red-500/20">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
