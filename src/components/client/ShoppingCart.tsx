
"use client";

import { X, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CartItem, ShoppingCartProps } from "@/types";
import { toast } from "sonner";
import Link from "next/link";
import { useAppStore } from "@/store";

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  onClose,
}) => {

  const items = useAppStore((state) => state.cart);
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useAppStore()
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.15; // 15% tax
  const total = subtotal + tax;

  const handleRemoveFromCart = (item: CartItem) => {
    removeFromCart(item);
    toast.info(`${item.name} removed from cart`)
  }
  const handleIncreaseQuantity = (item: CartItem) => {
    increaseQuantity(item);
    toast.success(`${item.name} quantity increased`)
  }
  const handleDescreaseQuantity = (item: CartItem) => {
    if (item.quantity <= 1) {
      toast.error(`${item.name} quantity cannot be decreased below 1. Use remove button instead.`);
      return;
    }
    decreaseQuantity(item);
    toast.info(`${item.name} quantity increased`)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 h-screen">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col animate-scale-in bg-white py-0">
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
              {items.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center space-x-4">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}

                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-blue-600 font-semibold">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDescreaseQuantity(item)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>

                      <span className="w-8 text-center font-medium">{item.quantity}</span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFromCart(item)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r text-white from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link className="w-full" href={'/checkout'}>Proceed to Checkout</Link>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
export default ShoppingCart;