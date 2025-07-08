import { CartItem } from "@/types";


export const cartTotals = (cart: CartItem[]) => {
    const subTotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0);
    const tax = subTotal * 0.15; // Assuming a 15% tax rate
    const total = subTotal + tax;

    return {
        subTotal: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
            subTotal,
        ),
        tax: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
            tax,
        ),
        total: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
            total,
        ),
    }
}