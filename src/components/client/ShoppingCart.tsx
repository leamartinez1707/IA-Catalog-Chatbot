"use client";

import { useEffect } from "react";
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

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm" role="presentation" onClick={onClose}>
      <Card role="dialog" aria-modal="true" aria-labelledby="shopping-cart-title" className="flex h-[560px] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white py-0 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.45)] md:h-[820px]" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 id="shopping-cart-title" className="text-xl font-semibold tracking-tight text-slate-950" style={{ fontFamily: "var(--font-display)" }}>Shopping Cart</h2>
            <p className="text-sm text-slate-500">{items.length} {items.length === 1 ? 'item' : 'items'} selected</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close shopping cart">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
              <p className="text-lg font-medium text-slate-950">Your cart is empty</p>
              <p className="mt-2 text-sm text-slate-500">Add a few products and they will appear here instantly.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={cleanCart}
                className="w-full rounded-full border border-rose-200 bg-rose-50 py-2.5 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-100">
                Clear cart
              </button>
              {items.map((item) => (
                <CartProduct
                  key={item.id}
                  item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-4 border-t border-slate-200 bg-slate-50/70 p-5">
            <CartTotal />
            <Button
              onClick={() => {
                onClose();
                router.push('/checkout');
              }}
              className="h-11 w-full rounded-full bg-slate-950 text-white hover:bg-slate-800">
              Proceed to Checkout
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
export default ShoppingCart;