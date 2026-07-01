"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Upload, Plus, X, Save } from "lucide-react";
import CategorySubcategoryDropdown from "@/components/admin/CategorySubcategoryDropdown";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { createClient } from "@/utils/supabase/client";
import { uploadToCloudinary } from "../../actions";

function ToggleSwitch({ checked, onChange }) {
  return (
    <label className="flex items-center cursor-pointer relative">
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <div className={`w-11 h-6 rounded-full transition-colors ${checked ? "bg-primary-purple" : "bg-soft-purple-200"}`}>
        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform ${checked ? "translate-x-5" : "translate-x-0 shadow-sm"}`} />
      </div>
    </label>
  );
}

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "", category: "", subcategory: "", shortBenefit: "", description: "",
    howToUse: "", isBestSeller: false, hasDetails: true,
  });
  const [benefits, setBenefits] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [specs, setSpecs] = useState([{ key: "", value: "" }]);
  const [sectionsVisibility, setSectionsVisibility] = useState({
    description: true, benefits: true, ingredients: true, howToUse: true,
  });
  const [customSections, setCustomSections] = useState([]);
  const [saved, setSaved] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const imageInputRef = useRef(null);

  useEffect(() => {
    async function fetchProduct() {
      const supabase = createClient();
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
      if (error || !data) {
        alert("Product not found");
        router.push("/admin/products");
        return;
      }
      setForm({
        name: data.name || "",
        category: data.category || "",
        subcategory: data.subcategory || "",
        shortBenefit: data.short_benefit || "",
        description: data.description || "",
        howToUse: data.how_to_use || "",
        isBestSeller: data.is_best_seller || false,
        hasDetails: data.has_details ?? true,
      });
      setBenefits(data.benefits?.length ? data.benefits : [""]);
      setIngredients(data.ingredients?.length ? data.ingredients : [""]);
      const specsObj = data.specs || {};
      setSpecs(Object.keys(specsObj).length ? Object.entries(specsObj).map(([key, value]) => ({ key, value })) : [{ key: "", value: "" }]);
      setSectionsVisibility(data.sections_visibility || { description: true, benefits: true, ingredients: true, howToUse: true });
      setCustomSections(data.custom_sections || []);
      if (data.image) setImagePreview(data.image);
      setLoading(false);
    }
    fetchProduct();
  }, [id, router]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { alert("File size exceeds 5MB."); return; }
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category) return;
    setIsUploading(true);

    let imageUrl = imagePreview || "";
    if (imagePreview && imagePreview.startsWith("data:image")) {
      const uploadRes = await uploadToCloudinary(imagePreview);
      if (uploadRes.success && uploadRes.url) {
        imageUrl = uploadRes.url;
      } else {
        alert("Error uploading image: " + uploadRes.error);
        setIsUploading(false);
        return;
      }
    }

    const specsObject = {};
    specs.forEach((s) => { if (s.key.trim()) specsObject[s.key.trim()] = s.value.trim(); });

    const updatedProduct = {
      name: form.name.trim(),
      category: form.category,
      subcategory: form.subcategory || null,
      short_benefit: form.shortBenefit.trim() || null,
      description: form.description.trim() || null,
      how_to_use: form.howToUse.trim() || null,
      is_best_seller: form.isBestSeller,
      image: imageUrl,
      benefits: benefits.filter((b) => b.trim()),
      ingredients: ingredients.filter((i) => i.trim()),
      specs: specsObject,
      sections_visibility: sectionsVisibility,
      custom_sections: customSections,
      has_details: form.hasDetails,
    };

    const supabase = createClient();
    const { error } = await supabase.from("products").update(updatedProduct).eq("id", id);
    setIsUploading(false);

    if (!error) {
      setSaved(true);
      setTimeout(() => { setSaved(false); router.push("/admin/products"); }, 1500);
    } else {
      alert("Error updating product: " + error.message);
    }
  };

  const addListItem = (setter) => setter((prev) => [...prev, ""]);
  const updateListItem = (setter, index, value) => setter((prev) => prev.map((item, i) => (i === index ? value : item)));
  const removeListItem = (setter, index) => setter((prev) => prev.filter((_, i) => i !== index));

  const fieldClass = "w-full px-4 py-2.5 rounded-xl border border-soft-purple-200 focus:outline-none focus:ring-2 focus:ring-primary-purple/30 bg-lavender-mist text-sm";
  const cardClass = "bg-white rounded-2xl shadow-sm border border-soft-purple-200 p-6";

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-soft-purple-200 border-t-primary-purple rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 rounded-xl hover:bg-soft-purple-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-deep-plum" />
        </Link>
        <div>
          <h1 className="font-playfair text-3xl font-bold text-deep-plum">Edit Product</h1>
          <p className="text-deep-plum/60 mt-1">Update the crystal product details.</p>
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium">
          ✓ Product updated successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div className={cardClass}>
          <h2 className="text-lg font-bold text-deep-plum mb-4">Product Image</h2>
          <input ref={imageInputRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleImageChange} />
          {imagePreview ? (
            <div className="relative w-full max-w-xs mx-auto">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-soft-purple-200">
                <Image src={imagePreview} alt="Product preview" fill className="object-contain" />
              </div>
              <button type="button" onClick={() => { setImagePreview(null); if (imageInputRef.current) imageInputRef.current.value = ""; }} className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 z-10">
                <X className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => imageInputRef.current?.click()} className="mt-3 w-full text-center text-sm text-primary-purple font-medium hover:underline cursor-pointer">
                Change Image
              </button>
            </div>
          ) : (
            <div onClick={() => imageInputRef.current?.click()} className="border-2 border-dashed border-soft-purple-300 rounded-2xl p-10 text-center hover:border-primary-purple transition-colors cursor-pointer bg-lavender-mist">
              <Upload className="w-10 h-10 text-primary-purple/30 mx-auto mb-3" />
              <p className="text-sm text-deep-plum/60 font-medium">Click to upload an image</p>
              <p className="text-xs text-deep-plum/40 mt-1">PNG, JPG, WebP up to 5MB</p>
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className={`${cardClass} space-y-5`}>
          <h2 className="text-lg font-bold text-deep-plum">Basic Information</h2>
          <div>
            <label className="block text-sm font-medium text-deep-plum mb-1.5">Product Name *</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={fieldClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-deep-plum mb-1.5">Category *</label>
            <CategorySubcategoryDropdown
              categoryValue={form.category}
              subcategoryValue={form.subcategory}
              onChange={(cat, sub) => setForm({ ...form, category: cat, subcategory: sub })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-deep-plum mb-1.5">Short Benefit</label>
            <input type="text" value={form.shortBenefit} onChange={(e) => setForm({ ...form, shortBenefit: e.target.value })} className={fieldClass} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-deep-plum">Description</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-deep-plum/50">{sectionsVisibility.description ? "Visible" : "Hidden"}</span>
                <ToggleSwitch checked={sectionsVisibility.description} onChange={(c) => setSectionsVisibility({ ...sectionsVisibility, description: c })} />
              </div>
            </div>
            {sectionsVisibility.description && (
              <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${fieldClass} resize-none`} />
            )}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-deep-plum font-medium block mb-1">Enable Product Details Page</span>
              <span className="text-xs text-deep-plum/50">If OFF, this product won&apos;t be clickable.</span>
            </div>
            <ToggleSwitch checked={form.hasDetails} onChange={(c) => setForm({ ...form, hasDetails: c })} />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isBestSeller} onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })} className="w-4 h-4 rounded accent-primary-purple" />
            <span className="text-sm text-deep-plum font-medium">Mark as Best Seller</span>
          </label>
        </div>

        {/* Benefits */}
        <div className={`${cardClass} space-y-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-deep-plum">Benefits</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-deep-plum/50">{sectionsVisibility.benefits ? "Visible" : "Hidden"}</span>
                <ToggleSwitch checked={sectionsVisibility.benefits} onChange={(c) => setSectionsVisibility({ ...sectionsVisibility, benefits: c })} />
              </div>
            </div>
            {sectionsVisibility.benefits && (
              <button type="button" onClick={() => addListItem(setBenefits)} className="text-sm text-primary-purple font-medium flex items-center gap-1 hover:underline">
                <Plus className="w-4 h-4" /> Add
              </button>
            )}
          </div>
          {sectionsVisibility.benefits && benefits.map((b, i) => (
            <div key={i} className="flex gap-2">
              <input type="text" value={b} onChange={(e) => updateListItem(setBenefits, i, e.target.value)} placeholder={`Benefit ${i + 1}`} className={fieldClass} />
              {benefits.length > 1 && <button type="button" onClick={() => removeListItem(setBenefits, i)} className="p-2 rounded-lg hover:bg-red-50 text-red-400"><X className="w-4 h-4" /></button>}
            </div>
          ))}
        </div>

        {/* Ingredients */}
        <div className={`${cardClass} space-y-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-deep-plum">Ingredients / Crystals Used</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-deep-plum/50">{sectionsVisibility.ingredients ? "Visible" : "Hidden"}</span>
                <ToggleSwitch checked={sectionsVisibility.ingredients} onChange={(c) => setSectionsVisibility({ ...sectionsVisibility, ingredients: c })} />
              </div>
            </div>
            {sectionsVisibility.ingredients && (
              <button type="button" onClick={() => addListItem(setIngredients)} className="text-sm text-primary-purple font-medium flex items-center gap-1 hover:underline">
                <Plus className="w-4 h-4" /> Add
              </button>
            )}
          </div>
          {sectionsVisibility.ingredients && ingredients.map((ing, i) => (
            <div key={i} className="flex gap-2">
              <input type="text" value={ing} onChange={(e) => updateListItem(setIngredients, i, e.target.value)} placeholder={`Crystal ${i + 1}`} className={fieldClass} />
              {ingredients.length > 1 && <button type="button" onClick={() => removeListItem(setIngredients, i)} className="p-2 rounded-lg hover:bg-red-50 text-red-400"><X className="w-4 h-4" /></button>}
            </div>
          ))}
        </div>

        {/* Specs */}
        <div className={`${cardClass} space-y-4`}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-deep-plum">Specifications</h2>
            <button type="button" onClick={() => setSpecs([...specs, { key: "", value: "" }])} className="text-sm text-primary-purple font-medium flex items-center gap-1 hover:underline">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          {specs.map((spec, i) => (
            <div key={i} className="flex gap-2">
              <input type="text" value={spec.key} onChange={(e) => setSpecs(specs.map((s, idx) => idx === i ? { ...s, key: e.target.value } : s))} placeholder="e.g. Weight" className={fieldClass} />
              <input type="text" value={spec.value} onChange={(e) => setSpecs(specs.map((s, idx) => idx === i ? { ...s, value: e.target.value } : s))} placeholder="e.g. 200g" className={fieldClass} />
              {specs.length > 1 && <button type="button" onClick={() => setSpecs(specs.filter((_, idx) => idx !== i))} className="p-2 rounded-lg hover:bg-red-50 text-red-400"><X className="w-4 h-4" /></button>}
            </div>
          ))}
        </div>

        {/* How to Use */}
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-deep-plum">How to Use / Ritual Guide</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-deep-plum/50">{sectionsVisibility.howToUse ? "Visible" : "Hidden"}</span>
              <ToggleSwitch checked={sectionsVisibility.howToUse} onChange={(c) => setSectionsVisibility({ ...sectionsVisibility, howToUse: c })} />
            </div>
          </div>
          {sectionsVisibility.howToUse && (
            <textarea rows={3} value={form.howToUse} onChange={(e) => setForm({ ...form, howToUse: e.target.value })} className={`${fieldClass} resize-none`} />
          )}
        </div>

        {/* Custom Sections */}
        <div className={`${cardClass} space-y-6`}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-deep-plum">Custom Sections</h2>
            <button type="button" onClick={() => setCustomSections([...customSections, { id: Math.random().toString(36).substr(2, 9), title: "", content: "", isVisible: true }])} className="text-sm text-primary-purple font-medium flex items-center gap-1 hover:underline">
              <Plus className="w-4 h-4" /> Add Section
            </button>
          </div>
          {customSections.length === 0 && <p className="text-sm text-deep-plum/50 text-center py-4">No custom sections.</p>}
          {customSections.map((section, idx) => (
            <div key={section.id} className="border border-soft-purple-200 rounded-xl p-5 space-y-4 bg-lavender-mist/50 relative">
              <button type="button" onClick={() => setCustomSections(customSections.filter((_, i) => i !== idx))} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-red-50 text-red-400"><X className="w-4 h-4" /></button>
              <div className="flex gap-4 items-start pr-10">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-deep-plum/50 mb-1.5 uppercase tracking-wide">Section Title</label>
                  <input type="text" value={section.title} onChange={(e) => setCustomSections(customSections.map((s, i) => i === idx ? { ...s, title: e.target.value } : s))} className={fieldClass} />
                </div>
                <div className="pt-6 flex items-center gap-2">
                  <span className="text-xs text-deep-plum/50">{section.isVisible ? "Visible" : "Hidden"}</span>
                  <ToggleSwitch checked={section.isVisible} onChange={(c) => setCustomSections(customSections.map((s, i) => i === idx ? { ...s, isVisible: c } : s))} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-deep-plum/50 mb-1.5 uppercase tracking-wide">Content</label>
                <RichTextEditor value={section.content} onChange={(val) => setCustomSections(customSections.map((s, i) => i === idx ? { ...s, content: val } : s))} />
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pb-8">
          <Link href="/admin/products" className="px-6 py-3 rounded-xl border border-soft-purple-200 text-deep-plum font-medium hover:bg-lavender-mist transition-colors">Cancel</Link>
          <button type="submit" disabled={isUploading} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-deep-plum text-white font-medium hover:bg-primary-purple transition-colors shadow-lg disabled:opacity-50">
            {isUploading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {isUploading ? "Uploading..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
