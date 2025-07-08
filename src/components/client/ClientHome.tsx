import ProductCatalog from "@/components/products/ProductsCatalog";
import PageTitle from "@/components/titles/PageTitle";
const ClientHome = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 text-center">
                    <PageTitle>
                        AI-Powered eCommerce
                    </PageTitle>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover amazing products with the help of our AI shopping assistant.
                        Get personalized recommendations tailored to your needs.
                    </p>
                </div>
                <ProductCatalog
                />
            </main>
        </div>
    );
}

export default ClientHome