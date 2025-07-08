import { CheckCircle } from "lucide-react";
import PageTitle from "../titles/PageTitle";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

const OrderSent = ({ setOrderSent }: { setOrderSent: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <div className="min-w-screen min-h-screen bg-gray-50 py-10 text-center">
            <div className="px-5">
                <div className="flex justify-center mb-4">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <PageTitle>Order Sent Successfully!</PageTitle>
                <p className="text-gray-600 mb-4">
                    Your order has been received and is being processed. You will receive a confirmation email shortly.
                </p>
                <p className="text-sm text-gray-500 mb-8">
                    Thank you for your purchase!
                </p>
            </div>
            <div className="mt-5">
                <Link
                    href="/"
                    className="bg-gradient inline-block text-white rounded-lg px-3 py-2 font-semibold mr-4"
                    onClick={() => setOrderSent(false)}
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}

export default OrderSent