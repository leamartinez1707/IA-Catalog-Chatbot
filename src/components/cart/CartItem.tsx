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
        <Card key={item.id} className="rounded-[1.5rem] border border-slate-200/80 p-4 shadow-sm">
            <div className="flex items-center space-x-4">
                {item.image && (
                    <Image
                        src={item.image}
                        alt={item.name}
                        width={84}
                        height={84}
                        className="h-20 w-20 rounded-2xl object-cover"
                    />
                )}

                <div className="flex flex-col flex-1/2 justify-start items-start">
                    <ButtonToProductDetail productId={item.id}>
                        <h3 className="font-medium tracking-tight text-slate-950">{item.name}</h3>
                    </ButtonToProductDetail>
                    <p className="mt-1 text-sm text-slate-500">Qty {item.quantity}</p>
                    <p className="mt-1 font-semibold text-slate-950">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex items-center space-x-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                    <Button
                        size="sm"
                        onClick={() => handleDescreaseQuantity(item)}
                        className="h-8 w-8 rounded-full border-slate-200 p-0"
                    >
                        <Minus className="size-3 md:size-4" />
                    </Button>

                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>

                    <Button
                        size="sm"
                        onClick={() => handleIncreaseQuantity(item)}
                        className="h-8 w-8 rounded-full border-slate-200 p-0"
                    >
                        <Plus className="size-3 md:size-4" />
                    </Button>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFromCart(item)}
                    className="rounded-full text-red-500 hover:bg-rose-50 hover:text-red-700"
                >
                    <Trash2 className="size-2 md:size-4" />
                </Button>
            </div>
        </Card>
    )
}

export default CartProduct;