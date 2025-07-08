"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ShoppingCartProps } from "@/types";
import { useAppStore } from "@/store";
import CartTotal from "../cart/CartTotal";
import CartProduct from "@/components/cart/CartItem";
import { useRouter } from "next/navigation";

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  onClose,
}) => {

  const items = useAppStore((state) => state.cart);
  const cleanCart = useAppStore((state) => state.clearCart);

  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 h-screen">
      <Card className="w-full max-w-2xl h-[500px] md:h-[800px] flex flex-col animate-scale-in bg-white py-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Shopping Cart ({items.length} items)</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400">Add some products to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={cleanCart}
                className="w-full mb-4 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors">
                Clean cart
              </button>
              {items.map((item) => (
                <CartProduct
                  key={item.id}
                  item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t space-y-4">
            <CartTotal />
            <Button
              onClick={() => {
                onClose();
                router.push('/checkout');
              }}
              className="w-full bg-gradient-to-r text-white from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Proceed to Checkout
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
export default ShoppingCart;