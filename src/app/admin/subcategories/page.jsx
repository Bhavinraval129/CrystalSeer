"use client";

import { useEffect, useState } from "react";
import { Plus, X, Pencil, Trash2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function AdminSubcategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [form, setForm] = useState({ name: "", category_id: "", description: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    const supabase = createClient();
    const { data: cats } = await supabase.from("categories").select("id, name").order("name");
    if (cats) setCategories(cats);
    const { data: subs } = await supabase.from("subcategories").select("*").order("name");
    if (subs) setSubcategories(subs);
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    const id = form.name.toLowerCase().replace(/\s+/g, "-") + "-" + Math.floor(Math.random() * 1000);
    const supabase = createClient();
    const { error } = await supabase.from("subcategories").insert({
      id, name: form.name.trim(), category_id: form.category_id, description: form.description.trim() || null,
    });
    setSaving(false);
    if (!error) {
      setAddModal(false);
      setForm({ name: "", category_id: "", description: "" });
      fetchAll();
    } else {
      alert("Error: " + error.message);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("subcategories").update({
      name: form.name.trim(), category_id: form.category_id, description: form.description.trim() || null,
    }).eq("id", editModal.id);
    setSaving(false);
    if (!error) {
      setEditModal(null);
      setForm({ name: "", category_id: "", description: "" });
      fetchAll();
    } else {
      alert("Error: " + error.message);
    }
  };

  const handleDelete = async (sub) => {
    const supabase = createClient();
    const { error } = await supabase.from("subcategories").delete().eq("id", sub.id);
    if (!error) setSubcategories((prev) => prev.filter((s) => s.id !== sub.id));
    setDeleteModal(null);
  };

  const openEdit = (sub) => {
    setForm({ name: sub.name, category_id: sub.category_id, description: sub.description || "" });
    setEditModal(sub);
  };

  const fieldClass = "w-full px-4 py-2.5 rounded-xl border border-soft-purple-200 focus:outline-none focus:ring-2 focus:ring-primary-purple/30 bg-lavender-mist text-sm";

  const ModalForm = ({ onSubmit, title, btnLabel }) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-playfair text-xl font-bold text-deep-plum">{title}</h3>
          <button onClick={() => { setAddModal(false); setEditModal(null); setForm({ name: "", category_id: "", description: "" }); }} className="p-1 rounded-lg hover:bg-lavender-mist"><X className="w-5 h-5 text-deep-plum/40" /></button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-deep-plum mb-1.5">Parent Category *</label>
            <select required value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} className={fieldClass}>
              <option value="">Select Category</option>
              {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-deep-plum mb-1.5">Subcategory Name *</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Raw Crystals" className={fieldClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-deep-plum mb-1.5">Description</label>
            <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${fieldClass} resize-none`} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => { setAddModal(false); setEditModal(null); setForm({ name: "", category_id: "", description: "" }); }} className="flex-1 px-4 py-2.5 rounded-xl border border-soft-purple-200 text-deep-plum font-medium">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 rounded-xl bg-deep-plum text-white font-medium hover:bg-primary-purple disabled:opacity-50">
              {saving ? "Saving..." : btnLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-deep-plum">Subcategories</h1>
          <p className="text-deep-plum/60 mt-1">Manage crystal subcategories ({subcategories.length})</p>
        </div>
        <button onClick={() => { setForm({ name: "", category_id: "", description: "" }); setAddModal(true); }} className="inline-flex items-center gap-2 bg-deep-plum text-white px-5 py-3 rounded-xl font-medium hover:bg-primary-purple transition-colors shadow-lg self-start cursor-pointer">
          <Plus className="w-5 h-5" /> Add Subcategory
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-soft-purple-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-soft-purple-100 bg-lavender-mist">
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-deep-plum/50 font-semibold">Name</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-deep-plum/50 font-semibold">Parent Category</th>
              <th className="text-right px-6 py-4 text-xs uppercase tracking-wider text-deep-plum/50 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-soft-purple-100">
            {subcategories.map((sub) => {
              const cat = categories.find((c) => c.id === sub.category_id);
              return (
                <tr key={sub.id} className="hover:bg-lavender-mist transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-medium text-deep-plum">{sub.name}</p>
                    <p className="text-xs text-deep-plum/40 font-mono">{sub.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm bg-soft-purple-100 text-primary-purple px-3 py-1 rounded-full">{cat?.name || sub.category_id}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(sub)} className="p-2 rounded-lg hover:bg-soft-purple-100 text-deep-plum transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteModal(sub)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {subcategories.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-deep-plum/50 font-medium">No subcategories found</p>
          </div>
        )}
      </div>

      {addModal && <ModalForm onSubmit={handleAdd} title="Add Subcategory" btnLabel="Create" />}
      {editModal && <ModalForm onSubmit={handleEdit} title="Edit Subcategory" btnLabel="Update" />}

      {deleteModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-deep-plum mb-2">Delete Subcategory?</h3>
            <p className="text-sm text-deep-plum/60">Delete <strong>&quot;{deleteModal.name}&quot;</strong>?</p>
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
