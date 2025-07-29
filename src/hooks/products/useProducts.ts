import { useQuery } from "@tanstack/react-query";
import api from "@/lib/supabase/api";
import { Product } from "@/types";

export const useProducts = () => {
    const {
        data: products,
        isLoading,
        error,
    } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: api.getCatalog,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    });

    return {
        products,
        isLoading,
        error,
    };
};
