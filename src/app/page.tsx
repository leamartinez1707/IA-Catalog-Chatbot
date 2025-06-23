
"use client";

import { useState } from "react";
import { ShoppingBag, MessageCircle } from "lucide-react";
import ProductCatalog from "@/components/ProductsCatalog";
import ChatAssistant from "@/components/ChatAssistant";
import ShoppingCart from "@/components/ShoppingCart";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import type { CartItem, Product } from "@/types";

export default function HomePage() {
  const [showChat, setShowChat] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ShopSmart AI
                </h1>
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <SearchBar onSearch={setSearchQuery} />
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowChat(!showChat)}
                className="relative hover:scale-105 transition-transform"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                AI Assistant
              </Button>

              <Button
                variant="outline"
                onClick={() => setShowCart(!showCart)}
                className="relative hover:scale-105 transition-transform"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Cart
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Product
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing products with the help of our AI shopping assistant.
            Get personalized recommendations tailored to your needs.
          </p>
        </div>

        <ProductCatalog
          searchQuery={searchQuery}
          onAddToCart={addToCart}
        />
      </main>

      {/* Chat Assistant */}
      {showChat && (
        <ChatAssistant
          onClose={() => setShowChat(false)}
          onAddToCart={addToCart}
        />
      )}

      {/* Shopping Cart */}
      {showCart && (
        <ShoppingCart
          items={cartItems}
          onClose={() => setShowCart(false)}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      )}
    </div>
  );
}
