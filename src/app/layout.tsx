
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";
import Header from "@/components/headers/Header";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopSmart AI - AI Shopping Assistant",
  description: "Find your perfect product with the help of our AI shopping assistant",
  keywords: "shopping, AI, assistant, ecommerce, products",
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
          {children}
          <Toaster richColors position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
