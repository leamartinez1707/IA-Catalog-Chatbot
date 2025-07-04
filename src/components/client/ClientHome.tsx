import ProductCatalog from "@/components/products/ProductsCatalog";
const ClientHome = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 text-center">
                    <h2 className="text-6xl py-4 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        AI-Powered eCommerce
                    </h2>
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