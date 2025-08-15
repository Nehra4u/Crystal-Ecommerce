import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: "LARIMARITA • MILENA ODA - Premium Crystals & Jewelry",
  description: "Discover the magic of crystals with our carefully curated collection of premium crystals, minerals, and healing stones from around the world. Each stone is unique and carries its own story.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        <CartProvider>
          <WishlistProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
