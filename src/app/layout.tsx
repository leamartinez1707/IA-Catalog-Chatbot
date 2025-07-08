
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
  title: "ShopSmart AI - AI Shopping Assistant",
  description: "Find your perfect product with the help of our AI shopping assistant",
  keywords: "shopping, AI, assistant, ecommerce, products",
  openGraph: {
    title: "ShopSmart AI - AI Shopping Assistant",
    description: "Find your perfect product with the help of our AI shopping assistant",
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
