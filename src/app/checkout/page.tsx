import Checkout from "@/components/checkout/Checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Checkout",
    description: "Complete your purchase securely and efficiently.",
    keywords: "checkout, ecommerce, payment, secure purchase, shopping cart"
};

const CheckoutPage = () => {
    return (
        <Checkout />
    )
}

export default CheckoutPage;