import ProductDetail from "@/components/products/ProductDetail";
import PageTitle from "@/components/titles/PageTitle";

export const metadata = {
    title: 'Product Detail',
    description: 'View product details and add to cart',
}

const ProductPage = () => {
    return (
        <div className="min-h-screen mt-10">
            <PageTitle>
                Product Detail
            </PageTitle>
            <div className="items-center p-5 lg:p-10 overflow-hidden relative w-full mx-auto">
                <ProductDetail />
            </div>
        </div>
    )
}

export default ProductPage