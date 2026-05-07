
import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";
import Header from "@/components/headers/Header";
import Footer from "@/components/footer/Footer";
import GlobalOverlays from "@/components/client/GlobalOverlays";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "ShopSmart AI | Conversational Product Discovery",
  description:
    "A polished e-commerce experience focused on conversational product discovery, guided recommendations, and faster buying decisions.",
  keywords: [
    "Next.js ecommerce portfolio",
    "AI shopping assistant",
    "conversational commerce",
    "frontend portfolio project",
    "product discovery UX",
  ],
  openGraph: {
    title: "ShopSmart AI | Conversational Product Discovery",
    description:
      "An e-commerce product experience that uses AI guidance to reduce choice overload and move users from discovery to checkout faster.",
    url: "https://shopsmart-ai.vercel.app/",
    siteName: "ShopSmart AI",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="page-shell font-body min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.08),_transparent_32%),linear-gradient(180deg,_#fcfdff_0%,_#f8fafc_100%)] text-slate-950 antialiased">
        <QueryProvider>
          <a
            href="#main-content"
            className="sr-only z-[60] rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <GlobalOverlays />
          <Toaster richColors position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
