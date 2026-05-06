'use client';

import { useAppStore } from "@/store";
import { cartTotals } from "@/utils/cartUtils";

const CartTotal = () => {

    const cart = useAppStore((state) => state.cart)
    const { total, subTotal, tax } = cartTotals(cart);

    return (
        <>
            <div className="mb-5 border-b border-slate-200 pb-5 text-slate-800">
                <div className="w-full flex mb-3 items-center">
                    <div className="flex-grow">
                        <span className="text-slate-500">Subtotal</span>
                    </div>
                    <div className="pl-3">
                        <span className="font-semibold">{subTotal}</span>
                    </div>
                </div>
                <div className="w-full flex items-center">
                    <div className="flex-grow">
                        <span className="text-slate-500">Taxes</span>
                    </div>
                    <div className="pl-3">
                        <span className="font-semibold">{tax}</span>
                    </div>
                </div>
            </div>
            <div className="text-xl text-slate-800 md:border-none">
                <div className="w-full flex items-center">
                    <div className="flex-grow">
                        <span className="text-slate-500">Total</span>
                    </div>
                    <div className="pl-3">
                        <span className="text-sm font-semibold text-slate-400">USD</span> <span className="font-semibold">{total}</span>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CartTotal