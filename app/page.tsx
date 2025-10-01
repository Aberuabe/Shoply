import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ShoppingBag, Truck, Shield, Headphones, Sparkles } from "lucide-react"
import { products } from "@/lib/products"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function HomePage() {
  const featuredProducts = products.slice(0, 3)

  return (
    <div className="min-h-screen">
      <section className="relative gradient-hero py-20 md:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 gradient-mesh opacity-60"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal animation="fade-up" duration={1000}>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 animate-in fade-in slide-in-from-top duration-700">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Nouvelle collection disponible</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight bg-gradient-to-br from-foreground via-primary to-accent bg-clip-text text-transparent">
                Découvrez l'excellence du shopping en ligne
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
                Explorez notre collection soigneusement sélectionnée de produits tendance et de qualité supérieure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="text-base group bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:scale-105 transition-all duration-300 glow-on-hover"
                >
                  <Link href="/catalogue">
                    Découvrir nos produits
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-base glass-card hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollReveal animation="zoom-in" delay={0}>
              <Card className="glass-card border-border/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 glow-on-hover group">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Truck className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">Livraison Gratuite</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Sur toutes les commandes de plus de 50€
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation="zoom-in" delay={100}>
              <Card className="glass-card border-border/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 glow-on-hover group">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">Paiement Sécurisé</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Transactions 100% sécurisées et cryptées
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation="zoom-in" delay={200}>
              <Card className="glass-card border-border/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 glow-on-hover group">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ShoppingBag className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">Retours Faciles</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">30 jours pour changer d'avis</p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation="zoom-in" delay={300}>
              <Card className="glass-card border-border/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 glow-on-hover group">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Headphones className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">Support 24/7</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Notre équipe est toujours disponible</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal animation="fade-down">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Produits Vedettes
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                Découvrez notre sélection de produits les plus populaires
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ScrollReveal key={product.id} animation="fade-up" delay={index * 100}>
                <Card className="group overflow-hidden glass-card border-border/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 glow-on-hover">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {product.price.toFixed(2)}€
                      </span>
                      <Button
                        asChild
                        variant="default"
                        size="sm"
                        className="group/btn bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-110 transition-all duration-300"
                      >
                        <Link href={`/produit/${product.id}`}>
                          <span className="relative z-10">Voir</span>
                          <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="fade-up" delay={400}>
            <div className="text-center mt-12">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="glass-card hover:scale-105 hover:shadow-xl transition-all duration-300 bg-transparent"
              >
                <Link href="/catalogue">Voir tous les produits</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal animation="zoom-in">
        <section className="py-20 bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-5 bg-cover bg-center"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Prêt à commencer vos achats ?</h2>
            <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto text-pretty leading-relaxed">
              Rejoignez des milliers de clients satisfaits et découvrez pourquoi Shoply est leur destination shopping
              préférée.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-base hover:scale-110 hover:shadow-2xl transition-all duration-300"
            >
              <Link href="/catalogue">Explorer le catalogue</Link>
            </Button>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
