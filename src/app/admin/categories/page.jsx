"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, X, FolderTree } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data: cats } = await supabase.from("categories").select("*").order("name");
      if (cats) setCategories(cats);
      const { data: prods } = await supabase.from("products").select("id, category");
      if (prods) setProducts(prods);
    }
    fetchData();
  }, []);

  const filtered = categories.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const getProductCount = (catId) => products.filter((p) => p.category === catId).length;

  const handleDelete = async (cat) => {
    const supabase = createClient();
    const { error } = await supabase.from("categories").delete().eq("id", cat.id);
    if (!error) setCategories((prev) => prev.filter((c) => c.id !== cat.id));
    setDeleteModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-deep-plum">Categories</h1>
          <p className="text-deep-plum/60 mt-1">Manage crystal categories ({filtered.length})</p>
        </div>
        <Link href="/admin/categories/new" className="inline-flex items-center gap-2 bg-deep-plum text-white px-5 py-3 rounded-xl font-medium hover:bg-primary-purple transition-colors shadow-lg self-start">
          <Plus className="w-5 h-5" /> Add Category
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-soft-purple-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-deep-plum/40" />
          <input type="text" placeholder="Search categories..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-soft-purple-200 focus:outline-none focus:ring-2 focus:ring-primary-purple/30 bg-lavender-mist text-sm" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-soft-purple-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-soft-purple-100 bg-lavender-mist">
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-deep-plum/50 font-semibold">Category</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-deep-plum/50 font-semibold">Products</th>
              <th className="text-right px-6 py-4 text-xs uppercase tracking-wider text-deep-plum/50 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-soft-purple-100">
            {filtered.map((cat) => (
              <tr key={cat.id} className="hover:bg-lavender-mist transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-soft-purple-100 flex items-center justify-center">
                      <FolderTree className="w-5 h-5 text-primary-purple" />
                    </div>
                    <div>
                      <p className="font-medium text-deep-plum">{cat.name}</p>
                      <p className="text-xs text-deep-plum/40 font-mono">{cat.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm bg-soft-purple-100 text-primary-purple px-3 py-1 rounded-full font-medium">
                    {getProductCount(cat.id)} products
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/admin/categories/${cat.id}/edit`} className="p-2 rounded-lg hover:bg-soft-purple-100 text-deep-plum transition-colors" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button onClick={() => setDeleteModal(cat)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <FolderTree className="w-12 h-12 text-primary-purple/20 mx-auto mb-4" />
            <p className="text-deep-plum/50 font-medium">No categories found</p>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center"><Trash2 className="w-6 h-6 text-red-500" /></div>
              <button onClick={() => setDeleteModal(null)} className="p-1 rounded-lg hover:bg-lavender-mist"><X className="w-5 h-5 text-deep-plum/40" /></button>
            </div>
            <h3 className="text-lg font-bold text-deep-plum">Delete Category?</h3>
            <p className="text-sm text-deep-plum/60 mt-2">Delete <strong>&quot;{deleteModal.name}&quot;</strong>? Products in this category will lose their category assignment.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleteModal(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-soft-purple-200 text-deep-plum font-medium hover:bg-lavender-mist">Cancel</button>
              <button onClick={() => handleDelete(deleteModal)} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
