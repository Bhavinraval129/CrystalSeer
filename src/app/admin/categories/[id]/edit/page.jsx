"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", description: "", icon: "gem", seoTitle: "", downloadUrl: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchCategory() {
      const supabase = createClient();
      const { data, error } = await supabase.from("categories").select("*").eq("id", id).single();
      if (error || !data) { alert("Category not found"); router.push("/admin/categories"); return; }
      setForm({
        name: data.name || "",
        description: data.description || "",
        icon: data.icon || "gem",
        seoTitle: data.seo_title || "",
        downloadUrl: data.download_list_url || "",
      });
      setLoading(false);
    }
    fetchCategory();
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("categories").update({
      name: form.name.trim(),
      description: form.description.trim() || null,
      icon: form.icon || "gem",
      seo_title: form.seoTitle.trim() || null,
      download_list_url: form.downloadUrl.trim() || null,
    }).eq("id", id);
    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => router.push("/admin/categories"), 1500);
    } else {
      alert("Error updating category: " + error.message);
    }
  };

  const fieldClass = "w-full px-4 py-2.5 rounded-xl border border-soft-purple-200 focus:outline-none focus:ring-2 focus:ring-primary-purple/30 bg-lavender-mist text-sm";

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-soft-purple-200 border-t-primary-purple rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/categories" className="p-2 rounded-xl hover:bg-soft-purple-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-deep-plum" />
        </Link>
        <div>
          <h1 className="font-playfair text-3xl font-bold text-deep-plum">Edit Category</h1>
          <p className="text-deep-plum/60 mt-1 font-mono text-xs">{id}</p>
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium">
          ✓ Category updated! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-soft-purple-200 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-deep-plum mb-1.5">Category Name *</label>
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={fieldClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-plum mb-1.5">Description</label>
          <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${fieldClass} resize-none`} />
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-plum mb-1.5">SEO Title</label>
          <input type="text" value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} className={fieldClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-plum mb-1.5">Download List URL</label>
          <input type="url" value={form.downloadUrl} onChange={(e) => setForm({ ...form, downloadUrl: e.target.value })} placeholder="https://..." className={fieldClass} />
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <Link href="/admin/categories" className="px-6 py-3 rounded-xl border border-soft-purple-200 text-deep-plum font-medium hover:bg-lavender-mist">Cancel</Link>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-deep-plum text-white font-medium hover:bg-primary-purple shadow-lg disabled:opacity-50">
            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Update Category"}
          </button>
        </div>
      </form>
    </div>
  );
}
