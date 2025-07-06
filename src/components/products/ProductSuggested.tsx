import type { Product } from "@/types"
import { formatCurrency } from "@/utils"
import Image from "next/image"
import Link from "next/link"

interface Props {
    product: Product
}
const ProductSuggested = ({ product }: Props) => {
    return (
        <Link replace href={`/product/${product.id}`} className="shadow-lg rounded-b-md hover:scale-105 transition-all duration-200">
            <Image
                width={200}
                height={200}
                alt={product.name}
                src={product.image}
                className="transition-all duration-200 rounded-t-xl w-full h-48 object-cover"
            />
            <div className="p-2 mb-4">
                <h3 className="text-2xl font-bold uppercase mb-2">{product.name}</h3>
                <span className="text-xl font-semibold">{formatCurrency(product.price)}</span>
            </div>
        </Link>
    )
}

export default ProductSuggested