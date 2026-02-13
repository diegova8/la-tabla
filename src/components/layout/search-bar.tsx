"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

interface SearchResult {
  id: number;
  name: string;
  slug: string;
  type: string;
  price: string;
  imageUrl: string | null;
  shortDesc: string | null;
}

const typeRoutes: Record<string, string> = {
  tabla: "/tablas",
  especialidad: "/especialidades",
  servicio: "/servicios",
  taller: "/talleres",
};

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (result: SearchResult) => {
    const base = typeRoutes[result.type] || "/tablas";
    router.push(`${base}/${result.slug}`);
    setOpen(false);
    setQuery("");
    setResults([]);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
        aria-label="Buscar"
      >
        <Search className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-2 bg-stone-100 rounded-lg px-3 py-1.5">
        <Search className="h-4 w-4 text-stone-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="bg-transparent text-sm text-stone-900 placeholder:text-stone-400 outline-none w-40 sm:w-56"
        />
        <button
          onClick={() => {
            setOpen(false);
            setQuery("");
            setResults([]);
          }}
          className="text-stone-400 hover:text-stone-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Results dropdown */}
      {(results.length > 0 || (query.length >= 2 && !loading)) && (
        <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-xl border border-stone-200 overflow-hidden z-50">
          {results.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto">
              {results.map((result) => (
                <li key={result.id}>
                  <button
                    onClick={() => handleSelect(result)}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-stone-50 transition-colors text-left"
                  >
                    <div className="relative h-12 w-12 rounded-md overflow-hidden bg-stone-100 shrink-0">
                      {result.imageUrl ? (
                        <Image
                          src={result.imageUrl}
                          alt={result.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-lg">
                          🧀
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-stone-900 truncate">
                        {result.name}
                      </p>
                      <p className="text-xs text-stone-500 capitalize">
                        {result.type} · {formatPrice(result.price)}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-stone-500">
              No se encontraron resultados para &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}

      {loading && query.length >= 2 && (
        <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-xl border border-stone-200 px-4 py-6 text-center text-sm text-stone-500 z-50">
          Buscando...
        </div>
      )}
    </div>
  );
}
