"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getProductById, products } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { ArrowLeft, Check, ShoppingCart, Truck, Shield, RotateCcw, ArrowRight } from "lucide-react"
import { useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useToast } from "@/hooks/use-toast"
import { ProductReviews } from "@/components/product-reviews"
import { StarRating } from "@/components/star-rating"
import { getAverageRating, getReviewsByProductId } from "@/lib/reviews-data"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(Number(params.id))
  const { addItem } = useCart()
  const [addedToCart, setAddedToCart] = useState(false)
  const { toast } = useToast()

  if (!product) {
    notFound()
  }

  const averageRating = getAverageRating(product.id)
  const reviewCount = getReviewsByProductId(product.id).length

  const handleAddToCart = () => {
    console.log("[v0] Adding product to cart:", product)
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    console.log("[v0] Product added successfully")
    setAddedToCart(true)

    toast({
      title: "Produit ajouté au panier",
      description: `${product.name} a été ajouté à votre panier.`,
      duration: 3000,
    })

    setTimeout(() => setAddedToCart(false), 2000)
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href="/catalogue">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au catalogue
          </Link>
        </Button>
      </div>

      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollReveal animation="fade-right">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left">
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="text-sm font-medium text-primary">{product.category}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{product.name}</h1>

              {reviewCount > 0 && (
                <div className="flex items-center gap-3 mb-4">
                  <StarRating rating={averageRating} size="md" showNumber />
                  <span className="text-sm text-muted-foreground">({reviewCount} avis)</span>
                </div>
              )}

              <div className="text-4xl font-bold mb-6">{product.price.toFixed(2)}€</div>

              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{product.description}</p>

              <Button
                size="lg"
                onClick={handleAddToCart}
                className="w-full md:w-auto mb-8 text-base group shadow-lg hover:shadow-xl"
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Ajouté au panier
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Ajouter au panier
                  </>
                )}
              </Button>

              <div className="space-y-4 border-t border-border pt-8">
                <ScrollReveal animation="fade-up" delay={100}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Livraison gratuite</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Livraison offerte pour toute commande supérieure à 50€
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={200}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <RotateCcw className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Retours faciles</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        30 jours pour retourner votre produit
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={300}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Garantie qualité</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Tous nos produits sont garantis 2 ans
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 border-t border-border">
        <ProductReviews productId={product.id} />
      </section>

      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 py-12 border-t border-border">
          <ScrollReveal animation="fade-down">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Produits similaires</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <ScrollReveal key={relatedProduct.id} animation="zoom-in" delay={index * 100}>
                <Card className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <span className="text-xs font-medium text-primary">{relatedProduct.category}</span>
                    </div>
                    <h3 className="font-semibold text-base mb-2 line-clamp-1">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold">{relatedProduct.price.toFixed(2)}€</span>
                      <Button asChild variant="default" size="sm" className="shadow-md hover:shadow-lg group/btn">
                        <Link href={`/produit/${relatedProduct.id}`}>
                          Voir
                          <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
