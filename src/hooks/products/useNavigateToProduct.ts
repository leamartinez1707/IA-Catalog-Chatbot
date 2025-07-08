import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";


export const useNavigateToProduct = () => {
    const router = useRouter();
    const setShowCart = useAppStore((state) => state.setShowCart);

    const handleNavigateToProduct = (productId: number) => {
        setShowCart(false);
        router.push(`/product/${productId}`);
    };
    return { handleNavigateToProduct }
};