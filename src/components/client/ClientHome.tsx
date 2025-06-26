'use client'
import { useState } from "react"
import ProductCatalog from "@/components/products/ProductsCatalog";
import ChatAssistant from "@/components/ChatAssistant";
import ShoppingCart from "@/components/client/ShoppingCart";
import type { CartItem, Product } from "@/types";
import Header from "@/components/headers/Header";
import { showToast } from "../toast/toast";

const ClientHome = ({ initialProducts: products }: { initialProducts: Product[] }) => {
    const [showChat, setShowChat] = useState<boolean>(false);
    const [showCart, setShowCart] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [favorites, setFavorites] = useState<number[]>([]);

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
            showToast.success("Item added to cart");
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
        showToast.info("Item removed from cart");
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            showToast.info("Item removed from cart");
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
        showToast.success("Cart updated successfully");
    };

    const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Header
                showCart={showCart}
                setShowCart={setShowCart}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showChat={showChat}
                setShowChat={setShowChat}
                cartItemCount={cartItemCount}
            />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 text-center">
                    <h2 className="text-6xl py-4 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        AI-Powered eCommerce
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover amazing products with the help of our AI shopping assistant.
                        Get personalized recommendations tailored to your needs.
                    </p>
                </div>

                <ProductCatalog
                    initialProducts={products}
                    searchQuery={searchQuery}
                    onAddToCart={addToCart}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    favorites={favorites}
                    setFavorites={setFavorites}
                />
            </main>

            {/* Chat Assistant */}
            {showChat && (
                <ChatAssistant
                    products={products}
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

export default ClientHome