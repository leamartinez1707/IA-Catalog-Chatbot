'use client';

import { useAppStore } from "@/store";
import { cartTotals } from "@/utils/cartUtils";

const CartTotal = () => {

    const cart = useAppStore((state) => state.cart)
    const { total, subTotal, tax } = cartTotals(cart);

    return (
        <>
            <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                <div className="w-full flex mb-3 items-center">
                    <div className="flex-grow">
                        <span className="text-gray-600">Subtotal</span>
                    </div>
                    <div className="pl-3">
                        <span className="font-semibold">{subTotal}</span>
                    </div>
                </div>
                <div className="w-full flex items-center">
                    <div className="flex-grow">
                        <span className="text-gray-600">Taxes</span>
                    </div>
                    <div className="pl-3">
                        <span className="font-semibold">{tax}</span>
                    </div>
                </div>
            </div>
            <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                <div className="w-full flex items-center">
                    <div className="flex-grow">
                        <span className="text-gray-600">Total</span>
                    </div>
                    <div className="pl-3">
                        <span className="font-semibold text-gray-400 text-sm">USD</span> <span className="font-semibold">{total}</span>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CartTotal