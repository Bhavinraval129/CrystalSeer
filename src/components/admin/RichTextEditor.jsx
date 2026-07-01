"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

// Dynamic import to avoid SSR issues with react-quill-new
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// Import quill CSS only on client
if (typeof window !== "undefined") {
  require("react-quill-new/dist/quill.snow.css");
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
];

export default function RichTextEditor({ value, onChange, placeholder }) {
  const memoModules = useMemo(() => modules, []);

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={memoModules}
        formats={formats}
        placeholder={placeholder || "Write content here..."}
        style={{ minHeight: "150px" }}
      />
    </div>
  );
}
