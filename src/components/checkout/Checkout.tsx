'use client';

import PageTitle from "@/components/titles/PageTitle";
import Image from "next/image"
import CartTotal from "../cart/CartTotal";
import { ArrowLeft, CreditCard, LandmarkIcon, ShieldCheck } from "lucide-react";
import { useAppStore } from "@/store";
import Link from "next/link";
import CheckoutItem from "./CheckoutItem";
import { useState } from "react";
import OrderSent from "./OrderSent";
import EmptyCheckout from "./EmptyCheckout";
import { toast } from "sonner";

const Checkout = () => {

    const cart = useAppStore((state) => state.cart);
    const clearCart = useAppStore((state) => state.clearCart);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSent, setOrderSent] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        billingAddress: '',
        nameOnCard: '',
        cardNumber: '',
        expiryMonth: '01',
        expiryYear: '2026',
        securityCode: '',
        paymentMethod: 'credit'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simular envío del pedido
        setTimeout(() => {
            setOrderSent(true);
            setIsSubmitting(false);
            clearCart();
            setFormData({
                email: '',
                billingAddress: '',
                nameOnCard: '',
                cardNumber: '',
                expiryMonth: '01',
                expiryYear: '2026',
                securityCode: '',
                paymentMethod: 'credit'
            });
            toast.success('Order sent successfully!');
        }, 2000);
    };

    // Pantalla de confirmación
    if (orderSent) {
        return <OrderSent setOrderSent={setOrderSent} />
    }
    if (cart.length === 0) {
        return <EmptyCheckout />
    }
    return (
        <div className="min-h-screen w-full bg-slate-50 py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 space-y-4 rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.25)] sm:p-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-950">
                        <ArrowLeft className="h-4 w-4" />
                        Back to shop
                    </Link>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <PageTitle>Checkout</PageTitle>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">Review your items, confirm billing details and complete the demo checkout flow.</p>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                            <ShieldCheck className="h-4 w-4" />
                            Demo-safe checkout experience
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="mx-auto max-w-7xl px-4 text-slate-800 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
                    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.25)] sm:p-6">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Order summary</h2>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">{cart.length} items</span>
                        </div>
                        <div>
                            {cart.map((item) => (
                                <CheckoutItem key={item.id} product={item} />
                            ))}
                            <CartTotal />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.25)] sm:p-6">
                            <div className="mb-5 flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-slate-400" />
                                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Billing and payment</h2>
                            </div>
                            <div className="mb-6 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-slate-800 font-light">
                                <div className="mb-4 w-full">
                                    <label className="mb-2 block text-sm font-semibold text-slate-600">Contact</label>
                                    <div>
                                        <input
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 outline-none transition-colors focus:border-blue-400"
                                            placeholder="youremail@example.com"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label className="mb-2 block text-sm font-semibold text-slate-600">Billing address</label>
                                    <div>
                                        <input
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 outline-none transition-colors focus:border-blue-400"
                                            placeholder="Your billing address"
                                            type="text"
                                            name="billingAddress"
                                            value={formData.billingAddress}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mx-auto rounded-[1.5rem] border border-slate-200 text-slate-800 font-light">
                                <div className="w-full border-b border-slate-200 p-4">
                                    <div className="mb-5 flex w-full items-center">
                                        <label htmlFor="type1" className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                className="form-radio h-5 w-5 text-indigo-500"
                                                name="paymentMethod"
                                                id="type1"
                                                value="credit"
                                                checked={formData.paymentMethod === 'credit'}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                        <Image
                                            width={150}
                                            height={34}
                                            src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="ml-3"
                                            alt="Credit Cards"
                                        />
                                        <span className="ml-3 font-semibold text-slate-600">Credit Card</span>
                                    </div>
                                    {formData.paymentMethod === 'credit' && (
                                        <div>
                                            <div className="mb-3">
                                                <label className="mb-2 ml-1 block text-sm font-semibold text-slate-600">Name on card</label>
                                                <div>
                                                    <input
                                                        className="mb-1 w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition-colors focus:border-blue-400"
                                                        placeholder="John Smith"
                                                        type="text"
                                                        name="nameOnCard"
                                                        value={formData.nameOnCard}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="mb-2 ml-1 block text-sm font-semibold text-slate-600">Card number</label>
                                                <div>
                                                    <input
                                                        className="mb-1 w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition-colors focus:border-blue-400"
                                                        placeholder="0000 0000 0000 0000"
                                                        type="text"
                                                        name="cardNumber"
                                                        value={formData.cardNumber}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 -mx-2 flex items-end">
                                                <div className="px-2 w-1/4">
                                                    <label className="mb-2 ml-1 block text-sm font-semibold text-slate-600">Expiration date</label>
                                                    <div>
                                                        <select
                                                            className="form-select mb-1 w-full cursor-pointer rounded-xl border border-slate-200 px-3 py-3 outline-none transition-colors focus:border-blue-400"
                                                            name="expiryMonth"
                                                            value={formData.expiryMonth}
                                                            onChange={handleInputChange}
                                                            required
                                                        >
                                                            <option value="01">01 - January</option>
                                                            <option value="02">02 - February</option>
                                                            <option value="03">03 - March</option>
                                                            <option value="04">04 - April</option>
                                                            <option value="05">05 - May</option>
                                                            <option value="06">06 - June</option>
                                                            <option value="07">07 - July</option>
                                                            <option value="08">08 - August</option>
                                                            <option value="09">09 - September</option>
                                                            <option value="10">10 - October</option>
                                                            <option value="11">11 - November</option>
                                                            <option value="12">12 - December</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="px-2 w-1/4">
                                                    <select
                                                        className="form-select mb-1 w-full cursor-pointer rounded-xl border border-slate-200 px-3 py-3 outline-none transition-colors focus:border-blue-400"
                                                        name="expiryYear"
                                                        value={formData.expiryYear}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                        <option value="2026">2026</option>
                                                        <option value="2027">2027</option>
                                                        <option value="2028">2028</option>
                                                        <option value="2029">2029</option>
                                                        <option value="2030">2030</option>
                                                        <option value="2031">2031</option>
                                                        <option value="2032">2032</option>
                                                        <option value="2033">2033</option>
                                                    </select>
                                                </div>
                                                <div className="px-2 w-1/4">
                                                    <label className="mb-2 ml-1 block text-sm font-semibold text-slate-600">Security code</label>
                                                    <div>
                                                        <input
                                                            className="mb-1 w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition-colors focus:border-blue-400"
                                                            placeholder="000"
                                                            type="text"
                                                            name="securityCode"
                                                            value={formData.securityCode}
                                                            onChange={handleInputChange}
                                                            required
                                                            maxLength={4}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex w-full items-center p-4">
                                    <label htmlFor="type2" className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            className="form-radio h-5 w-5 text-indigo-500"
                                            name="paymentMethod"
                                            id="type2"
                                            value="bank"
                                            checked={formData.paymentMethod === 'bank'}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <LandmarkIcon className="ml-3 h-5 w-5 text-slate-400" />
                                    <span className="mx-3 font-semibold text-slate-600">Bank transfer</span>
                                    <p>ITAU: 9971728</p>
                                </div>
                                {formData.paymentMethod === 'bank' && (
                                    <div className="px-4 pb-4">
                                        <p className="text-slate-500">Please transfer the total amount to the bank account and send your receipt to the following number: <br /> <a
                                            target="_blank" className="text-indigo-500 hover:underline"
                                            rel="noopener noreferrer"
                                            href="https://wa.me/+59895220063">+59895220063.</a>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-4 py-4 text-sm font-medium text-amber-800">
                            WARNING: This is only a demo checkout. Do not send any money and do not use real payment details.
                        </div>
                        <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="block w-full rounded-full bg-slate-950 px-4 py-3 font-semibold text-white transition-colors hover:bg-slate-800 disabled:bg-slate-300"
                                >
                                    {isSubmitting ? 'PROCESSING...' : 'PAY NOW'}
                                </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Checkout