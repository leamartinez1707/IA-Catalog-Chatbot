import Checkout from "@/components/checkout/Checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Checkout | ShopSmart AI",
    description: "Review your items and complete the demo checkout flow with a clean, purchase-ready interface.",
    keywords: "checkout, ecommerce, payment flow, shopping cart, ShopSmart AI"
};

const CheckoutPage = () => {
    return (
        <Checkout />
    )
}

export default CheckoutPage;