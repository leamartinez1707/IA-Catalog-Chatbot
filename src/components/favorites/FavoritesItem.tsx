import { Product } from "@/types"
import Image from "next/image"
import AddToCartButton from "../cart/AddToCartButton"
import FavoriteButton from "./FavoriteButton"
import Link from "next/link"

interface Props {
    product: Product
}

const FavoritesItem = ({ product }: Props) => {


    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-2 justify-between mb-6 rounded-lg bg-white p-6 shadow-md">
                <Image src={product.image ?? ''} alt="product-image"
                    width={200} height={200}
                    className="rounded-lg sm:h-fit max-h-[200px] max-w-[200px] sm:w-full" />
                <div className="space-y-4 sm:space-y-2 w-full sm:mt-0 flex flex-col sm:ml-4 ">
                    <div className="flex items-center justify-end space-x-4">
                        <p className="text-sm">${product.price}</p>
                        <div className="absolute">
                            <FavoriteButton product={product} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-evenly w-full h-full gap-y-4">
                        <div>
                            <Link href={`/product/${product.id}`} className="hover:underline">
                                <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
                            </Link>
                            <p className="mt-1 text-gray-700">{product.description}</p>
                            <p className="mt-1 text-xs text-gray-700">{product.features}</p>
                        </div>
                        <AddToCartButton
                            product={product} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FavoritesItem