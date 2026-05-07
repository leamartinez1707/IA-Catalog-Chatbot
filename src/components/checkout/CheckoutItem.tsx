import { CartItem } from "@/types"
import { formatCurrency } from "@/utils"
import Image from "next/image"

const CheckoutItem = ({ product }: { product: CartItem }) => {

    const totalPrice = product.price * product.quantity
    return (
        <div className="mb-4 w-full rounded-[1.5rem] border border-slate-200 bg-white p-4 text-slate-800 shadow-sm">
            <div className="w-full flex items-center">
                <div className="h-16 w-16 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    <Image
                        aria-label="Product image"
                        quality={100}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover object-center"
                        src={product.image ?? '/broken-image.png'} alt={product.name ?? 'Product image not found'} />
                </div>
                <div className="flex-grow pl-3">
                    <h6 className="font-semibold text-slate-700">{product.name}</h6>
                    <p className="text-sm text-slate-400">x {product.quantity}</p>
                </div>
                <div>
                    <span className="text-xl font-semibold leading-none align-baseline text-slate-950">{formatCurrency(totalPrice)}</span>
                </div>
            </div>
        </div>
    )
}

export default CheckoutItem