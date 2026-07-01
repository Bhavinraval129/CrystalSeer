"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Upload, X, Save, Check } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { uploadLogoToCloudinary } from "./actions";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function AdminSettingsPage() {
  const { setTheme } = useTheme();
  const [form, setForm] = useState({
    site_name: "", tagline: "", phone: "", email: "", whatsapp: "", address: "", footer_text: "",
    theme_primary_color: "#844c84", theme_background_color: "#fdfafc", theme_text_color: "#3b203b",
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [existingLogo, setExistingLogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const logoInputRef = useRef(null);

  useEffect(() => {
    async function fetchSettings() {
      const supabase = createClient();
      const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
      if (data) {
        setForm({
          site_name: data.site_name || "",
          tagline: data.tagline || "",
          phone: data.phone || "",
          email: data.email || "",
          whatsapp: data.whatsapp || "",
          address: data.address || "",
          footer_text: data.footer_text || "",
          theme_primary_color: data.theme_primary_color || "#844c84",
          theme_background_color: data.theme_background_color || "#fdfafc",
          theme_text_color: data.theme_text_color || "#3b203b",
        });
        if (data.logo_url) setExistingLogo(data.logo_url);
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { alert("Logo must be under 5MB."); return; }
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    let logo_url = existingLogo;
    if (logoPreview && logoPreview.startsWith("data:image")) {
      const res = await uploadLogoToCloudinary(logoPreview);
      if (res.success && res.url) {
        logo_url = res.url;
        setExistingLogo(res.url);
        setLogoPreview(null);
      } else {
        alert("Logo upload failed: " + res.error);
        setSaving(false);
        return;
      }
    }

    const updateData = { ...form, logo_url };

    const supabase = createClient();
    const { error } = await supabase.from("site_settings").update(updateData).eq("id", 1);
    setSaving(false);

    if (!error) {
      // Update ThemeProvider globally
      setTheme({
        primaryColor: form.theme_primary_color,
        backgroundColor: form.theme_background_color,
        textColor: form.theme_text_color,
        headingFont: "'Playfair Display', serif",
        bodyFont: "'Inter', sans-serif",
        baseFontSize: "16px",
        siteName: form.site_name,
        tagline: form.tagline,
        phone: form.phone,
        email: form.email,
        whatsapp: form.whatsapp,
        address: form.address,
        footerText: form.footer_text,
        logoUrl: logo_url,
      });
      setToast("Settings saved successfully!");
      setTimeout(() => setToast(""), 3000);
    } else {
      alert("Error saving settings: " + error.message);
    }
  };

  const fieldClass = "w-full px-4 py-2.5 rounded-xl border border-soft-purple-200 focus:outline-none focus:ring-2 focus:ring-primary-purple/30 bg-lavender-mist text-sm";
  const cardClass = "bg-white rounded-2xl shadow-sm border border-soft-purple-200 p-6 space-y-5";

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-soft-purple-200 border-t-primary-purple rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-deep-plum">Site Settings</h1>
        <p className="text-deep-plum/60 mt-1">Manage Crystal Seer branding, contact details, and theme.</p>
      </div>

      {toast && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium">
          <Check className="w-4 h-4" />
          {toast}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Logo */}
        <div className={cardClass}>
          <h2 className="text-lg font-bold text-deep-plum">Brand Logo</h2>
          <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl border border-soft-purple-200 overflow-hidden bg-lavender-mist flex items-center justify-center shrink-0">
              {logoPreview || existingLogo ? (
                <Image src={logoPreview || existingLogo} alt="Logo" width={96} height={96} className="object-contain" />
              ) : (
                <span className="text-xs text-deep-plum/30 text-center px-2">No Logo</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button type="button" onClick={() => logoInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 bg-soft-purple-100 text-primary-purple rounded-xl text-sm font-medium hover:bg-soft-purple-200 transition-colors cursor-pointer">
                <Upload className="w-4 h-4" /> Upload Logo
              </button>
              {(logoPreview || existingLogo) && (
                <button type="button" onClick={() => { setLogoPreview(null); setExistingLogo(null); }} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors cursor-pointer">
                  <X className="w-4 h-4" /> Remove Logo
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Site Identity */}
        <div className={cardClass}>
          <h2 className="text-lg font-bold text-deep-plum">Site Identity</h2>
          <div>
            <label className="block text-sm font-medium text-deep-plum mb-1.5">Site Name</label>
            <input type="text" value={form.site_name} onChange={(e) => setForm({ ...form, site_name: e.target.value })} placeholder="Crystal Seer" className={fieldClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-deep-plum mb-1.5">Tagline</label>
            <input type="text" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} placeholder="Ethereal Crystals & Mystic Healing" className={fieldClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-deep-plum mb-1.5">Footer Text</label>
            <input type="text" value={form.footer_text} onChange={(e) => setForm({ ...form, footer_text: e.target.value })} className={fieldClass} />
          </div>
        </div>

        {/* Contact Info */}
        <div className={cardClass}>
          <h2 className="text-lg font-bold text-deep-plum">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-deep-plum mb-1.5">Phone</label>
              <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 70966 91255" className={fieldClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-deep-plum mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="hello@crystalseer.in" className={fieldClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-deep-plum mb-1.5">WhatsApp Number (digits only)</label>
              <input type="text" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="917096691255" className={fieldClass} />
              <p className="text-xs text-deep-plum/40 mt-1">Format: country code + number, no + or spaces</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-deep-plum mb-1.5">Address</label>
              <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={fieldClass} />
            </div>
          </div>
        </div>


        <div className="flex justify-end pb-8">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-deep-plum text-white font-medium hover:bg-primary-purple transition-colors shadow-lg disabled:opacity-50">
            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
