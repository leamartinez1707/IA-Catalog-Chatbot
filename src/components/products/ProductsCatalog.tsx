'use client';
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/products/ProductCard";
import { useAppStore } from "@/store";
import { useProducts } from "@/hooks/products/useProducts";

export const ProductCatalog = () => {
  const { products: data, isLoading, error } = useProducts();
  const { searchQuery, selectedCategory, setSelectedCategory } = useAppStore()

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Error loading products: {error.message}</p>
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

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Badge
            key={category}
            className={`${selectedCategory.toLowerCase() == category.toLowerCase() ? 'bg-black/10 font-bold' : 'bg-black/5'} cursor-pointer hover:scale-105 transition-transform px-4 py-2 capitalize rounded-lg`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      {/* Products Grid */}
      <p>Filtered by: <span className="capitalize"> {selectedCategory ? selectedCategory : ''}</span></p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts?.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
          />
        ))}
      </div>

      {filteredProducts?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
export default ProductCatalog;