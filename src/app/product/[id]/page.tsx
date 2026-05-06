import ProductDetail from "@/components/products/ProductDetail";

export const metadata = {
    title: 'Product | ShopSmart AI',
    description: 'View product details, compare highlights, and move directly into the buying flow.',
    keywords: 'product detail, ecommerce product page, shopping, ShopSmart AI'
}


const ProductPage = () => {
    return (
        <div className="min-h-screen">
            <div className="items-center overflow-hidden relative w-full mx-auto">
                <ProductDetail />
            </div>
        </div>
    )
}

export default ProductPage