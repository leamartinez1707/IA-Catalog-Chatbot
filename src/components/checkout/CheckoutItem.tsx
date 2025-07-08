import { CartItem } from "@/types"
import { formatCurrency } from "@/utils"
import Image from "next/image"

const CheckoutItem = ({ product }: { product: CartItem }) => {

    const totalPrice = product.price * product.quantity
    return (
        <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
            <div className="w-full flex items-center">
                <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                    <Image
                        aria-label="Product image"
                        quality={100}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover object-center"
                        src={product.image ?? '/broken-image.png'} alt={product.name ?? 'Product image not found'} />
                </div>
                <div className="flex-grow pl-3">
                    <h6 className="font-semibold uppercase text-gray-600">{product.name}</h6>
                    <p className="text-gray-400">x {product.quantity}</p>
                </div>
                <div>
                    <span className="font-semibold text-2xl leading-none align-baseline">{formatCurrency(totalPrice).split('.')[0]}</span>
                    <span className="text-xl leading-none align-baseline">.{formatCurrency(totalPrice).split('.')[1]}</span>
                </div>
            </div>
        </div>
    )
}

export default CheckoutItem