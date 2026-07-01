"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function CategorySubcategoryDropdown({
  categoryValue,
  subcategoryValue,
  onChange,
}) {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("categories")
      .select("id, name")
      .order("name")
      .then(({ data }) => {
        if (data) setCategories(data);
      });
  }, []);

  useEffect(() => {
    if (!categoryValue) {
      setSubcategories([]);
      return;
    }
    setLoadingSubs(true);
    const supabase = createClient();
    supabase
      .from("subcategories")
      .select("id, name")
      .eq("category_id", categoryValue)
      .order("name")
      .then(({ data }) => {
        setSubcategories(data || []);
        setLoadingSubs(false);
      });
  }, [categoryValue]);

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Category Select */}
      <select
        value={categoryValue}
        required
        onChange={(e) => {
          onChange(e.target.value, "");
        }}
        className="flex-1 px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#111827]/30 bg-gray-50 text-sm"
      >
        <option value="">Select Category *</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Subcategory Select */}
      <select
        value={subcategoryValue}
        onChange={(e) => onChange(categoryValue, e.target.value)}
        disabled={!categoryValue || loadingSubs}
        className="flex-1 px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#111827]/30 bg-gray-50 text-sm disabled:opacity-50"
      >
        <option value="">No Subcategory</option>
        {subcategories.map((sub) => (
          <option key={sub.id} value={sub.id}>
            {sub.name}
          </option>
        ))}
      </select>
    </div>
  );
}
