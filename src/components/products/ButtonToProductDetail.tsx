import { useNavigateToProduct } from "@/hooks/products/useNavigateToProduct"

interface Props {
    productId: string
    children?: React.ReactNode
}
const ButtonToProductDetail = ({ productId, children }: Props) => {
    const { handleNavigateToProduct } = useNavigateToProduct()
    return (
        <button onClick={() => handleNavigateToProduct(productId)} className="hover:underline">
            {children && children}
        </button>
    )
}

export default ButtonToProductDetail