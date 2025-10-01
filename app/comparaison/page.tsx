"use client"

import { useCompare } from "@/lib/compare-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ShoppingCart, ArrowRight, Scale } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { ScrollReveal } from "@/components/scroll-reveal"
import { getAverageRating, getReviewsByProductId } from "@/lib/reviews-data"
import { StarRating } from "@/components/star-rating"

export default function ComparisonPage() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare()
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: (typeof compareItems)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté à votre panier.`,
      duration: 3000,
    })
  }

  if (compareItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <section className="gradient-hero py-12 border-b border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-40"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Comparaison de Produits
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Comparez jusqu'à 4 produits côte à côte</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-6">
                <Scale className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Aucun produit à comparer</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Ajoutez des produits à votre liste de comparaison pour voir leurs caractéristiques côte à côte.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Link href="/catalogue">
                  Explorer le catalogue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="gradient-hero py-12 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-40"></div>
        <ScrollReveal animation="fade-down">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Comparaison de Produits
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {compareItems.length} produit{compareItems.length > 1 ? "s" : ""} en comparaison
                </p>
              </div>
              <Button
                onClick={clearCompare}
                variant="outline"
                className="glass-card hover:scale-105 transition-all duration-300 bg-transparent"
              >
                Tout effacer
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto">
            <div className="min-w-max">
              {/* Product Images Row */}
              <div
                className="grid gap-4 mb-6"
                style={{ gridTemplateColumns: `200px repeat(${compareItems.length}, 1fr)` }}
              >
                <div className="font-semibold text-lg flex items-end pb-4">Produit</div>
                {compareItems.map((product, index) => (
                  <ScrollReveal key={product.id} animation="fade-up" delay={index * 100}>
                    <Card className="glass-card border-border/50 relative group hover:shadow-xl transition-all duration-300">
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-destructive/90 text-destructive-foreground flex items-center justify-center hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
                        aria-label="Retirer de la comparaison"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gradient-to-br from-muted to-muted/50">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <Link href={`/produit/${product.id}`}>
                          <h3 className="font-semibold text-base mb-2 hover:text-primary transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary inline-block">
                          {product.category}
                        </span>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>

              {/* Price Row */}
              <div
                className="grid gap-4 mb-4"
                style={{ gridTemplateColumns: `200px repeat(${compareItems.length}, 1fr)` }}
              >
                <div className="font-semibold flex items-center py-4 border-t border-border/50">Prix</div>
                {compareItems.map((product) => (
                  <div key={`price-${product.id}`} className="flex items-center py-4 border-t border-border/50">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {product.price.toFixed(2)}€
                    </span>
                  </div>
                ))}
              </div>

              {/* Rating Row */}
              <div
                className="grid gap-4 mb-4"
                style={{ gridTemplateColumns: `200px repeat(${compareItems.length}, 1fr)` }}
              >
                <div className="font-semibold flex items-center py-4 border-t border-border/50">Note</div>
                {compareItems.map((product) => {
                  const rating = getAverageRating(product.id)
                  const reviewCount = getReviewsByProductId(product.id).length
                  return (
                    <div
                      key={`rating-${product.id}`}
                      className="flex items-center gap-2 py-4 border-t border-border/50"
                    >
                      {reviewCount > 0 ? (
                        <>
                          <StarRating rating={rating} size="sm" />
                          <span className="text-sm text-muted-foreground">({reviewCount})</span>
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground">Pas d'avis</span>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Description Row */}
              <div
                className="grid gap-4 mb-4"
                style={{ gridTemplateColumns: `200px repeat(${compareItems.length}, 1fr)` }}
              >
                <div className="font-semibold flex items-start py-4 border-t border-border/50">Description</div>
                {compareItems.map((product) => (
                  <div key={`desc-${product.id}`} className="py-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                  </div>
                ))}
              </div>

              {/* Action Row */}
              <div
                className="grid gap-4 mb-4"
                style={{ gridTemplateColumns: `200px repeat(${compareItems.length}, 1fr)` }}
              >
                <div className="font-semibold flex items-center py-4 border-t border-border/50">Actions</div>
                {compareItems.map((product) => (
                  <div key={`action-${product.id}`} className="py-4 border-t border-border/50 flex flex-col gap-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Ajouter au panier
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full glass-card hover:scale-105 transition-all duration-300 bg-transparent"
                    >
                      <Link href={`/produit/${product.id}`}>Voir détails</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {compareItems.length < 4 && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                Vous pouvez ajouter jusqu'à {4 - compareItems.length} produit{4 - compareItems.length > 1 ? "s" : ""}{" "}
                supplémentaire
                {4 - compareItems.length > 1 ? "s" : ""}
              </p>
              <Button
                asChild
                variant="outline"
                className="glass-card hover:scale-105 hover:shadow-xl transition-all duration-300 bg-transparent"
              >
                <Link href="/catalogue">Ajouter plus de produits</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
