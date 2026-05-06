import { CheckCircle } from "lucide-react";
import PageTitle from "../titles/PageTitle";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

const OrderSent = ({ setOrderSent }: { setOrderSent: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <div className="min-w-screen min-h-screen bg-slate-50 py-10 text-center">
            <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200/80 bg-white px-6 py-14 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.25)]">
                <div className="flex justify-center mb-4">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <PageTitle>Order Sent Successfully!</PageTitle>
                <p className="mb-4 text-slate-600">
                    Your order has been received and is being processed. You will receive a confirmation email shortly.
                </p>
                <p className="mb-8 text-sm text-slate-500">
                    Thank you for your purchase!
                </p>
            </div>
            <div className="mt-5">
                <Link
                    href="/"
                    className="mr-4 inline-block rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition-colors hover:bg-slate-800"
                    onClick={() => setOrderSent(false)}
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}

export default OrderSent