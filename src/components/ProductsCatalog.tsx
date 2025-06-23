import { useState, useMemo } from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    category: "Electronics",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    description: "Premium quality wireless headphones with noise cancellation",
    features: ["Noise Cancelling", "30h Battery", "Quick Charge"]
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    category: "Electronics",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    description: "Track your fitness goals with this advanced smartwatch",
    features: ["Heart Rate Monitor", "GPS", "Waterproof"]
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    category: "Clothing",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    description: "Comfortable and sustainable organic cotton t-shirt",
    features: ["100% Organic", "Machine Washable", "Multiple Colors"]
  },
  {
    id: 4,
    name: "JavaScript Programming Book",
    price: 39.99,
    category: "Books",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop",
    description: "Learn modern JavaScript programming from scratch",
    features: ["Beginner Friendly", "500+ Pages", "Code Examples"]
  },
  {
    id: 5,
    name: "Premium Coffee Beans",
    price: 18.99,
    category: "Food",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
    description: "Single-origin arabica coffee beans, medium roast",
    features: ["Single Origin", "Medium Roast", "Freshly Roasted"]
  },
  {
    id: 6,
    name: "Yoga Mat",
    price: 49.99,
    category: "Sports",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
    description: "Non-slip yoga mat perfect for all types of exercise",
    features: ["Non-Slip", "Eco-Friendly", "6mm Thick"]
  }
];

interface ProductCatalogProps {
  searchQuery: string;
  onAddToCart: (product: any) => void;
}

export const ProductCatalog = ({ searchQuery, onAddToCart }: ProductCatalogProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = ["All", ...new Set(SAMPLE_PRODUCTS.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter(product => {
      const matchesSearch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="p-0 relative">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart 
                  className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                />
              </Button>
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {product.features.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0">
              <div className="flex items-center justify-between w-full">
                <span className="text-2xl font-bold text-blue-600">
                  ${product.price}
                </span>
                <Button 
                  onClick={() => onAddToCart(product)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;