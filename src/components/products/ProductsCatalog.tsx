'use client';
import { useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import { useAppStore } from "@/store";
import type { Product } from "@/types";
import { Boxes, Sparkles } from "lucide-react";

interface ProductCatalogProps {
  products: Product[];
}

export const ProductCatalog = ({ products }: ProductCatalogProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setShowChat = useAppStore((state) => state.setShowChat);

  const searchQuery = searchParams.get("q") ?? "";
  const selectedCategory = searchParams.get("category") ?? "All";

  const setSelectedCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          q === "" ||
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q);
        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      }),
    [products, searchQuery, selectedCategory]
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.28)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />
              Curated product discovery
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Browse products with a cleaner decision flow
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Start with filters and search. If you still are not sure, open the{" "}
                <button
                  onClick={() => setShowChat(true)}
                  className="font-medium text-blue-600 underline-offset-2 hover:underline"
                >
                  AI assistant
                </button>{" "}
                and ask in plain language.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <Boxes className="h-4 w-4 text-slate-400" />
            <span>
              Showing{" "}
              <strong className="font-semibold text-slate-950">{filteredProducts.length}</strong> of{" "}
              <strong className="font-semibold text-slate-950">{products.length}</strong> products
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter products by category">
          {categories.map((category) => {
            const isActive = selectedCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  isActive
                    ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                    : "border-slate-200 bg-white text-slate-600"
                } rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500" aria-live="polite">
          <span>Filtered by</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 font-medium capitalize text-slate-700">
            {selectedCategory || "All"}
          </span>
          {searchQuery && (
            <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
              Search: {searchQuery}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <p className="text-lg font-medium text-slate-950">No products found for this combination.</p>
          <p className="mt-2 text-sm text-slate-500">
            Try another category, remove the search term or ask the AI assistant for a recommendation.
          </p>
        </div>
      )}
    </div>
  );
};
export default ProductCatalog;