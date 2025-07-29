import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { CartItem } from "@/types"
import { formatCurrency } from "@/utils"
import { useAppStore } from "@/store"
import { toast } from "sonner"
import { Minus, Plus, Trash2 } from "lucide-react"
import ButtonToProductDetail from "../products/ButtonToProductDetail"

interface Props {
    item: CartItem
}
const CartProduct = ({ item }: Props) => {

    const { removeFromCart, increaseQuantity, decreaseQuantity } = useAppStore()
    const handleRemoveFromCart = (item: CartItem) => {
        removeFromCart(item);
        toast.info(`${item.name} removed from cart`)
    }
    const handleIncreaseQuantity = (item: CartItem) => {
        increaseQuantity(item);
        toast.success(`${item.name} quantity increased`)
    }
    const handleDescreaseQuantity = (item: CartItem) => {
        if (item.quantity <= 1) {
            toast.error(`${item.name} quantity cannot be decreased below 1. Use remove button instead.`);
            return;
        }
        decreaseQuantity(item);
        toast.info(`${item.name} quantity increased`)
    }
    return (
        <Card key={item.id} className="p-2 md:p-4">
            <div className="flex items-center gap-x-2 md:gap-x-4">
                {item.image && (
                    <Image
                        src={item.image}
                        alt={item.name}
                        width={84}
                        height={84}
                        className="size-14 md:size-20 object-cover rounded-lg"
                    />
                )}

                <div className="flex flex-col flex-1/2 justify-start items-start">
                    <ButtonToProductDetail productId={item.id}>
                        <h3 className="text-sm md:text-xl text-left font-medium uppercase">{item.name}</h3>
                    </ButtonToProductDetail>
                    <p className="text-blue-600 font-semibold">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex flex-1 items-center md:space-x-2">
                    <Button
                        size="sm"
                        onClick={() => handleDescreaseQuantity(item)}
                    >
                        <Minus className="size-3 md:size-4" />
                    </Button>

                    <span className="w-4 md:w-8 text-center font-medium">{item.quantity}</span>

                    <Button
                        size="sm"
                        onClick={() => handleIncreaseQuantity(item)}
                    >
                        <Plus className="size-3 md:size-4" />
                    </Button>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFromCart(item)}
                    className="text-red-500 hover:text-red-700"
                >
                    <Trash2 className="size-2 md:size-4" />
                </Button>
            </div>
        </Card>
    )
}

export default CartProduct;