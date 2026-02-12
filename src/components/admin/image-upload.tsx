"use client";

import { useState, useRef, useCallback } from "react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Imagen" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(async (file: File) => {
    setError("");
    setUploading(true);

    // Client-side preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      setPreview(data.url);
      onChange(data.url);
    } catch (err: any) {
      setError(err.message);
      if (!value) setPreview(null);
    } finally {
      setUploading(false);
    }
  }, [onChange, value]);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Solo se permiten imágenes JPEG, PNG o WebP.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen no puede superar 5MB.");
      return;
    }
    upload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-stone-700">{label}</label>}

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer transition-colors min-h-[140px] ${
          dragOver
            ? "border-amber-500 bg-amber-50"
            : "border-stone-300 bg-stone-50 hover:border-amber-400 hover:bg-amber-50/50"
        }`}
      >
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg z-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-300 border-t-amber-500" />
          </div>
        )}

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="max-h-32 rounded-md object-contain"
          />
        ) : (
          <div className="text-center p-4">
            <svg className="mx-auto h-8 w-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16v-8m0 0l-3 3m3-3l3 3M3 16.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5M7.5 12.75l3-3 3 3m0 0l3-3" />
            </svg>
            <p className="mt-1 text-sm text-stone-500">
              Arrastrá o hacé clic para subir
            </p>
            <p className="text-xs text-stone-400">JPEG, PNG, WebP · máx 5MB</p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {preview && !uploading && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setPreview(null);
            onChange("");
            if (inputRef.current) inputRef.current.value = "";
          }}
          className="text-xs text-stone-500 hover:text-red-600 transition-colors"
        >
          Quitar imagen
        </button>
      )}
    </div>
  );
}
