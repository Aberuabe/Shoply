import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { CompareProvider } from "@/lib/compare-context"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Shoply - Boutique en ligne moderne",
  description: "Découvrez notre sélection de produits tendance et de qualité",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <CartProvider>
          <WishlistProvider>
            <CompareProvider>
              <Navigation />
              <Suspense fallback={<div>Loading...</div>}>
                <main className="pt-16 min-h-screen">{children}</main>
              </Suspense>
              <Footer />
              <Toaster />
            </CompareProvider>
          </WishlistProvider>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
