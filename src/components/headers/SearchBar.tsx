"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SearchBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isHome = pathname === "/";

  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  // Debounced URL push — only active on the home/catalog page
  useEffect(() => {
    if (!isHome) return;
    const id = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set("q", query.trim());
      } else {
        params.delete("q");
      }
      router.replace(`/?${params.toString()}`, { scroll: false });
    }, 200);
    return () => window.clearTimeout(id);
    // searchParams intentionally excluded — we only react to user input
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, isHome]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // On non-home pages, submit navigates to catalog with the query
    if (!isHome && query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative" role="search" aria-label="Search products">
      <div className="relative">
        <label htmlFor="catalog-search" className="sr-only">
          Search products, categories or use cases
        </label>
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          id="catalog-search"
          type="text"
          placeholder="Search for products, categories or use cases..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 rounded-full border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-700 shadow-sm transition-colors placeholder:text-slate-400 focus-visible:border-blue-400 focus-visible:ring-blue-400/30"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </form>
  );
};
export default SearchBar;