import { Badge } from "@/components/ui/badge";
import type { ProductCatalogProps } from "@/types";
import ProductCard from "./products/ProductCard";
import { supabase } from "@/utils/supabase/server";

export const ProductCatalog: React.FC<ProductCatalogProps> = async ({ searchQuery, onAddToCart, selectedCategory, setSelectedCategory, favorites, setFavorites }) => {

  const { data } = await supabase.from('products').select('*');

  const categories = ["All", ...new Set(data?.map(p => p.category))];

  const filteredProducts = data?.filter(product => {
    const matchesSearch = searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory
  });

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            className="cursor-pointer hover:scale-105 transition-transform px-4 py-2"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts?.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            toggleFavorite={toggleFavorite}
            onAddToCart={onAddToCart}
            favorites={favorites}
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