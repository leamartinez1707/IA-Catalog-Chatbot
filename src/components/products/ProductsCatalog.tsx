'use client';
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/products/ProductCard";
import { useAppStore } from "@/store";
import { useProducts } from "@/hooks/products/useProducts";
import { Boxes, Sparkles } from "lucide-react";

export const ProductCatalog = () => {
  const { products: data, isLoading, error } = useProducts();
  const { searchQuery, selectedCategory, setSelectedCategory } = useAppStore()

  if (isLoading) {
    return (
      <div className="rounded-[1.75rem] border border-slate-200/80 bg-white px-6 py-14 text-center shadow-[0_18px_40px_-30px_rgba(15,23,42,0.2)]">
        <p className="text-lg font-medium text-slate-950">Loading products...</p>
        <p className="mt-2 text-sm text-slate-500">Preparing the catalog and filters.</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50 px-6 py-14 text-center">
        <p className="text-lg font-medium text-rose-700">Error loading products.</p>
        <p className="mt-2 text-sm text-rose-600">{error.message}</p>
      </div>
    );
  }

  const categories = ["All", ...new Set(data?.map(p => p.category))];

  const filteredProducts = data?.filter(product => {
    const matchesSearch = searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory
  });

  const totalProducts = data?.length ?? 0;
  const filteredCount = filteredProducts?.length ?? 0;

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
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Browse products with a cleaner decision flow
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Start with filters and search. If you still are not sure, open the AI assistant and ask in plain language.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <Boxes className="h-4 w-4 text-slate-400" />
            <span>
              Showing <strong className="font-semibold text-slate-950">{filteredCount}</strong> of <strong className="font-semibold text-slate-950">{totalProducts}</strong> products
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Badge
            key={category}
            className={`${selectedCategory.toLowerCase() == category.toLowerCase() ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-600'} cursor-pointer rounded-full border px-4 py-2 capitalize transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span>Filtered by</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 font-medium capitalize text-slate-700">
            {selectedCategory ? selectedCategory : 'All'}
          </span>
          {searchQuery && (
            <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
              Search: {searchQuery}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts?.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
          />
        ))}
      </div>

      {filteredProducts?.length === 0 && (
        <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <p className="text-lg font-medium text-slate-950">No products found for this combination.</p>
          <p className="mt-2 text-sm text-slate-500">Try another category, remove the search term or ask the AI assistant for a recommendation.</p>
        </div>
      )}
    </div>
  );
};
export default ProductCatalog;