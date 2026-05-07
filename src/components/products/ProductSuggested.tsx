import type { Product } from "@/types"
import { formatCurrency } from "@/utils"
import Image from "next/image"
import Link from "next/link"

interface Props {
    product: Product
}
const ProductSuggested = ({ product }: Props) => {
    return (
        <Link replace href={`/product/${product.id}`} className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(15,23,42,0.4)]">
            <Image
                width={400}
                height={320}
                alt={product.name}
                src={product.image}
                className="h-56 w-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{product.category}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{product.name}</h3>
                <p className="mt-3 text-lg font-semibold text-slate-700">{formatCurrency(product.price)}</p>
            </div>
        </Link>
    )
}

export default ProductSuggested