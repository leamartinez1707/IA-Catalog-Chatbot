'use client'
import { ShoppingBag, MessageCircle, Star, ArrowRight } from "lucide-react";
import SearchBar from "@/components/headers/SearchBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShoppingCart from "@/components/client/ShoppingCart";
import { useAppStore } from "@/store";

const Header = () => {
    const { setShowChat, showChat, setShowCart, showCart, setSearchQuery } = useAppStore()
    const cartLength = useAppStore((state) => state.cart).length
    return (
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/92 py-4 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 py-1">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center justify-between gap-4">
                            <Link href={'/'} className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 via-blue-700 to-cyan-500 shadow-lg shadow-cyan-500/20">
                                    <ShoppingBag className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold tracking-tight text-slate-950 sm:text-xl">
                                        ShopSmart AI
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        Conversational discovery for modern shopping flows
                                    </p>
                                </div>
                            </Link>
                            <div className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 lg:inline-flex">
                                Live AI assistant
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <Button
                                onClick={() => setShowChat(!showChat)}
                                className="h-11 rounded-full bg-slate-950 px-5 text-white shadow-lg shadow-slate-950/15 hover:bg-slate-800"
                            >
                                <MessageCircle className="mr-2 h-4 w-4" />
                                AI Assistant
                            </Button>
                            <Link
                                href={'/favorites'}
                                className="inline-flex h-11 items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                            >
                                <Star className="mr-2 h-4 w-4" />
                                Favorites
                            </Link>
                            <Button
                                variant="outline"
                                onClick={() => setShowCart(!showCart)}
                                className="relative h-11 rounded-full border-slate-200 bg-white px-4 text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                            >
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                Cart
                                {cartLength > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs text-white">
                                    {cartLength}
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 border-t border-slate-200/70 pt-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="w-full max-w-2xl">
                            <SearchBar onSearch={setSearchQuery} />
                        </div>
                        <div className="hidden items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm text-slate-600 lg:inline-flex">
                            Browse products, then jump into AI guidance when filters stop being enough.
                            <ArrowRight className="h-4 w-4 text-slate-400" />
                        </div>
                    </div>
                </div>
            </div>
            {showCart && (
                <ShoppingCart
                    onClose={() => setShowCart(false)}
                />
            )}
        </header>
    )
}

export default Header