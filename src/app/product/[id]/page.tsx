import type { Metadata } from "next";
import ProductDetail from "@/components/products/ProductDetail";
import { getCatalog } from "@/lib/supabase/api/server";
import type { Product } from "@/types";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const products = await getCatalog().catch((): Product[] => []);
    const product = products.find((p) => p.id === id);
    return {
        title: product ? `${product.name} | ShopSmart AI` : "Product | ShopSmart AI",
        description:
            product?.description ??
            "View product details, compare highlights, and move directly into the buying flow.",
        keywords: product
            ? `${product.name}, ${product.category}, ecommerce, ShopSmart AI`
            : "product detail, ecommerce, ShopSmart AI",
    };
}

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const products = await getCatalog().catch((): Product[] => []);
    const product = products.find((p) => p.id === id) ?? null;
    return (
        <div className="min-h-screen">
            <ProductDetail product={product} products={products} />
        </div>
    );
};

export default ProductPage;