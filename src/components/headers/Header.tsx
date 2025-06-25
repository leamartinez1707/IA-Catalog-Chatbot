import { ShoppingBag, MessageCircle } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { HeaderProps } from "@/types";


const Header = ({ setSearchQuery, cartItemCount, setShowChat, showChat, setShowCart, showCart }: HeaderProps) => {
    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <ShoppingBag className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ShopSmart AI
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="outline"
                            onClick={() => setShowChat(!showChat)}
                            className="relative hover:scale-105 transition-transform"
                        >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            AI Assistant
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => setShowCart(!showCart)}
                            className="relative hover:scale-105 transition-transform"
                        >
                            <ShoppingBag className="w-5 h-5 mr-2" />
                            Cart
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {cartItemCount}
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
                <div className="flex-1 max-w-2xl mx-8 md:mx-0 my-4">
                    <SearchBar onSearch={setSearchQuery} />
                </div>
            </div>
        </header>
    )
}

export default Header