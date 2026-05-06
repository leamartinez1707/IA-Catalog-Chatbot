import PageTitle from '../titles/PageTitle'
import Link from 'next/link'

const EmptyCheckout = () => {
    return (
        <div className="min-w-screen min-h-screen bg-slate-50 py-10 text-center">
            <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200/80 bg-white px-6 py-14 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.25)]">
                <PageTitle>Your cart is empty</PageTitle>
                <p className="text-slate-600">Add a few items before moving into checkout.</p>
            </div>
            <div className="mt-5">
                <Link href="/" className="inline-block rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition-colors hover:bg-slate-800">Go to Shop</Link>
            </div>
        </div>
    )
}

export default EmptyCheckout