'use client';

import PageTitle from "@/components/titles/PageTitle";
import Image from "next/image"
import CartTotal from "../cart/CartTotal";
import { LandmarkIcon } from "lucide-react";
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
        expiryYear: '2024',
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
                expiryYear: '2024',
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
        <div className="w-full max-w-full min-h-screen bg-gray-50 py-5">
            <div className="px-5">
                <div className="mb-2">
                    <Link href="/" className="focus:outline-none hover:underline text-gray-500 text-lg"><i className="mdi mdi-arrow-left text-gray-400"></i>Back</Link>
                </div>
                <div className="mb-2">
                    <PageTitle>Checkout</PageTitle>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
                <div className="w-full">
                    <div className="md:flex items-start">
                        <div className="px-3 md:w-7/12 lg:pr-12">
                            {cart.map((item) => (
                                <CheckoutItem key={item.id} product={item} />
                            ))}
                            <CartTotal />
                        </div>
                        <div className="px-3 md:w-5/12">
                            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                                <div className="w-full flex mb-3 items-center">
                                    <div className="w-32">
                                        <span className="text-gray-600 font-semibold">Contact</span>
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <input
                                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                            placeholder="youremail@example.com"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex items-center">
                                    <div className="w-32">
                                        <span className="text-gray-600 font-semibold">Billing Address</span>
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <input
                                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
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
                            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                                <div className="w-full p-3 border-b border-gray-200">
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
                                        <span className="ml-3 text-gray-600 font-semibold">Credit Card</span>
                                    </div>
                                    {formData.paymentMethod === 'credit' && (
                                        <div>
                                            <div className="mb-3">
                                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Name on card</label>
                                                <div>
                                                    <input
                                                        className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
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
                                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Card number</label>
                                                <div>
                                                    <input
                                                        className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
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
                                                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Expiration date</label>
                                                    <div>
                                                        <select
                                                            className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
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
                                                        className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                                                        name="expiryYear"
                                                        value={formData.expiryYear}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                        <option value="2024">2024</option>
                                                        <option value="2025">2025</option>
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
                                                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Security code</label>
                                                    <div>
                                                        <input
                                                            className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
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
                                <div className="w-full flex p-3 items-center">
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
                                    <LandmarkIcon className="w-5 h-5 text-gray-400 ml-3" />
                                    <span className="mx-3 text-gray-600 font-semibold">Bank transfer</span>
                                    <p>ITAU: 9971728</p>
                                </div>
                                {formData.paymentMethod === 'bank' && (
                                    <div className="px-4 pb-4">
                                        <p className="text-gray-400">Please transfer the total amount to the bank account and send your receipt to the following number: <br /> <a
                                            target="_blank" className="text-indigo-500 hover:underline"
                                            rel="noopener noreferrer"
                                            href="https://wa.me/+59895220063">+59895220063.</a>
                                        </p>
                                    </div>
                                )}
                                <p className="text-red-600 font-semibold m-4">
                                    WARNING: This is only a demo template. Do not send any money—no purchases can be made on this site.
                                </p>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-lg px-3 py-2 font-semibold transition-colors"
                                >
                                    <i className="mdi mdi-lock-outline mr-1"></i>
                                    {isSubmitting ? 'PROCESSING...' : 'PAY NOW'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Checkout