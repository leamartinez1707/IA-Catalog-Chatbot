'use client'

import { useProducts } from "@/hooks/products/useProducts"
import Image from "next/image"
import { useParams } from "next/navigation"
import AddToCartButton from "../cart/AddToCartButton"
import { ArrowLeft, BadgeCheck, MessageCircle, ShieldCheck, Star } from "lucide-react"
import SuggestedProducts from "./SuggestedProducts"
import Link from "next/link"

const ProductDetail = () => {

    const { id } = useParams()
    const { products, isLoading, error } = useProducts()

    if (isLoading) {
        return <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-14 text-center text-slate-500 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)]">Loading product...</div>
    }

    if (error) {
        return <div className="rounded-[2rem] border border-rose-200 bg-rose-50 px-6 py-14 text-center text-rose-600">Error loading product details.</div>
    }

    if (!products || products.length === 0) {
        return <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-14 text-center text-slate-500 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)]">No products available</div>
    }

    const product = products.find((prd) => prd.id === String(id))
    if (!product) {
        return <div className="rounded-[2rem] border border-rose-200 bg-rose-50 px-6 py-14 text-center text-rose-600">Product not found</div>
    }

    const features = product.features.split(',').map((feature) => feature.trim()).filter(Boolean)

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="mb-6">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-950">
                    <ArrowLeft className="h-4 w-4" />
                    Back to catalog
                </Link>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_25px_60px_-35px_rgba(15,23,42,0.35)]">
                    <div className="relative aspect-[1/1.02] overflow-hidden bg-slate-100">
                        <Image
                            width={800}
                            height={800}
                            alt={product.name}
                            src={product.image}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/55 to-transparent" />
                        <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/92 px-4 py-2 text-sm font-medium text-slate-700 shadow-lg backdrop-blur">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            {product.rating} out of 5
                        </div>
                    </div>

                    <div className="grid gap-4 border-t border-slate-100 p-5 sm:grid-cols-3">
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Category</p>
                            <p className="mt-2 font-medium capitalize text-slate-950">{product.category}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Delivery</p>
                            <p className="mt-2 font-medium text-slate-950">Fast checkout flow</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Fit</p>
                            <p className="mt-2 font-medium text-slate-950">Great for AI-assisted discovery</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.35)] sm:p-8">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                                {product.category}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                <BadgeCheck className="h-3.5 w-3.5" />
                                Curated pick
                            </span>
                        </div>

                        <div className="mt-5 space-y-4">
                            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{product.name}</h1>
                            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">{product.description}</p>
                        </div>

                        <div className="mt-8 flex flex-col gap-5 border-y border-slate-100 py-6 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Price</p>
                                <div className="mt-2 text-5xl font-semibold tracking-tight text-slate-950">
                                    ${product.price.toFixed(2)}
                                </div>
                            </div>
                            <div className="w-full sm:w-auto sm:min-w-[220px]">
                                <AddToCartButton product={product} />
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-950">
                                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                                    Purchase-ready flow
                                </div>
                                <p className="mt-2 text-sm leading-6 text-slate-500">Favorites, cart, checkout and AI recommendations stay connected from this product page.</p>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-950">
                                    <MessageCircle className="h-4 w-4 text-blue-600" />
                                    Ask the assistant
                                </div>
                                <p className="mt-2 text-sm leading-6 text-slate-500">Use the AI assistant to compare this item against similar options or refine by budget and use case.</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.28)] sm:p-8">
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">What stands out</h2>
                        <div className="mt-5 grid gap-3">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">•</span>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <SuggestedProducts category={product.category} id={product.id} />
        </div>
    )
}

export default ProductDetail