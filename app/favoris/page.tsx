"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag } from "lucide-react"
import { useWishlist } from "@/lib/wishlist-context"
import { ProductCard } from "@/components/product-card"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function FavorisPage() {
  const { items, clearWishlist } = useWishlist()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 mb-6">
              <Heart className="h-10 w-10 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Votre liste de favoris est vide</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Découvrez notre catalogue et ajoutez vos produits préférés à votre liste de favoris.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent">
              <Link href="/catalogue">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Découvrir nos produits
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="gradient-hero py-12 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal animation="fade-down">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Mes Favoris
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {items.length} produit{items.length > 1 ? "s" : ""} dans votre liste
                </p>
              </div>
              {items.length > 0 && (
                <Button
                  variant="outline"
                  onClick={clearWishlist}
                  className="glass-card bg-transparent hover:scale-105 transition-all duration-300"
                >
                  Vider la liste
                </Button>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product, index) => (
              <ScrollReveal key={product.id} animation="flip-up" delay={index * 50}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  category={product.category}
                  description={product.description}
                  image={product.image}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
