import PageTitle from '../titles/PageTitle'
import Link from 'next/link'

const EmptyCheckout = () => {
    return (
        <div className="min-w-screen min-h-screen bg-gray-50 py-5 text-center">
            <div className="px-5">
                <PageTitle>Your cart is empty</PageTitle>
                <p className="text-gray-600">Please add some items to your cart before proceeding to checkout.</p>
            </div>
            <div className="mt-5">
                <Link href="/" className="bg-gradient inline-block text-white rounded-lg px-3 py-2 font-semibold">Go to Shop</Link>
            </div>
        </div>
    )
}

export default EmptyCheckout