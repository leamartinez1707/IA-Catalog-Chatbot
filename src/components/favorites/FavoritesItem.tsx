import type { Product } from "@/types"
import Image from "next/image"
import AddToCartButton from "../cart/AddToCartButton"
import FavoriteButton from "./FavoriteButton"
import ButtonToProductDetail from "../products/ButtonToProductDetail"

interface Props {
    product: Product
}

const FavoritesItem = ({ product }: Props) => {
    return (
        <div className="mb-6">
            <div className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.22)] sm:flex-row sm:items-start">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100 sm:w-[220px] sm:min-w-[220px]">
                    <Image src={product.image ?? ''} alt="product-image"
                        width={220} height={220}
                        className="h-[220px] w-full object-cover" />
                </div>
                <div className="flex w-full flex-col gap-5 sm:ml-2">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Saved item</p>
                            <ButtonToProductDetail productId={product.id}>
                                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{product.name}</h2>
                            </ButtonToProductDetail>
                        </div>
                        <div className="relative h-9 w-9">
                            <FavoriteButton product={product} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-evenly gap-y-4">
                        <div>
                            <p className="text-sm leading-6 text-slate-600">{product.description}</p>
                            <p className="mt-3 text-xs leading-6 text-slate-500">{product.features}</p>
                        </div>
                        <div className="flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-2xl font-semibold tracking-tight text-slate-950">${product.price.toFixed(2)}</p>
                            <div className="w-full sm:w-auto sm:min-w-[220px]">
                                <AddToCartButton
                                    product={product} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FavoritesItem