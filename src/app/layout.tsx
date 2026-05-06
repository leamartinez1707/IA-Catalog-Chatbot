
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";
import Header from "@/components/headers/Header";
import ChatAssistant from "@/components/client/ChatAssistant";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Header />
          <ChatAssistant />
          {children}
          <Footer />
          <Toaster richColors position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
