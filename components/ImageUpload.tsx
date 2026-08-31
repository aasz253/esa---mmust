"use client";
import { useRef, useState } from "react";

export function ImageUpload({
  name,
  label = "Image",
  existing,
  className,
}: {
  name: string;
  label?: string;
  existing?: string | null;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(existing || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Upload failed");
      setPreview(data.url);
      if (inputRef.current) inputRef.current.value = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setPreview(existing || null);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={className}>
      <span className="mb-1 block text-sm text-[#4d6a92]">{label}</span>
      <input
        type="file"
        accept="image/*"
        onChange={onFile}
        className="block w-full text-sm text-[#4d6a92] file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#0047ab] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#1a6fd4]"
      />
      <input
        ref={inputRef}
        type="hidden"
        name={name}
        value={preview || ""}
      />
      {uploading && (
        <p className="mt-2 text-xs text-[#5b7394]">Uploading…</p>
      )}
      {error && (
        <p className="mt-2 text-xs text-red-500">{error}</p>
      )}
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Preview"
          className="mt-2 h-24 w-24 rounded-lg border border-[#d4e2fa] object-cover"
        />
      )}
    </div>
  );
}
