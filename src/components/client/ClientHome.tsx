"use client";

import { Suspense } from "react";
import { ArrowRight, MessageCircle, Sparkles, Star, Zap } from "lucide-react";
import ProductCatalog from "@/components/products/ProductsCatalog";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import type { Product } from "@/types";

const features = [
  { icon: Sparkles, label: "AI-powered recommendations" },
  { icon: Zap,       label: "Instant product matching" },
  { icon: Star,      label: "Curated catalog" },
];

const CatalogSkeleton = () => (
  <div className="space-y-8" aria-hidden>
    <div className="h-52 animate-pulse rounded-[1.75rem] bg-slate-100" />
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-96 animate-pulse rounded-[1.75rem] bg-slate-100" />
      ))}
    </div>
  </div>
);

interface ClientHomeProps {
  products: Product[];
}

const ClientHome = ({ products }: ClientHomeProps) => {
  const setShowChat = useAppStore((state) => state.setShowChat);

  const scrollToCatalog = () => {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-blue-200 backdrop-blur">
              <Sparkles className="size-3.5" />
              Powered by OpenAI
            </div>

            <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Shop smarter with{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI guidance
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Tell the assistant what you need — a budget, a use case, a gift idea — and get a tailored product recommendation in seconds.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() => setShowChat(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-purple-700"
              >
                <MessageCircle className="size-4" />
                Ask the AI assistant
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToCatalog}
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                Browse the catalog
                <ArrowRight className="size-4" />
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              {features.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="size-4 text-blue-400" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Suspense fallback={<CatalogSkeleton />}>
          <ProductCatalog products={products} />
        </Suspense>
      </section>
    </div>
  );
};

export default ClientHome;