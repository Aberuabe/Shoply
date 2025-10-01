"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { products, categories } from "@/lib/products"
import { Filter, Grid3x3, LayoutGrid } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ProductCard } from "@/components/product-card"
import { ProductQuickView } from "@/components/product-quick-view"

export default function CataloguePage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [priceFilter, setPriceFilter] = useState("all")
  const [gridView, setGridView] = useState<"3" | "4">("3")
  const [quickViewProduct, setQuickViewProduct] = useState<(typeof products)[0] | null>(null)
  const [quickViewOpen, setQuickViewOpen] = useState(false)

  // Filter products by category
  let filteredProducts =
    selectedCategory === "Tous" ? products : products.filter((p) => p.category === selectedCategory)

  // Filter by price
  if (priceFilter === "low") {
    filteredProducts = filteredProducts.filter((p) => p.price < 100)
  } else if (priceFilter === "medium") {
    filteredProducts = filteredProducts.filter((p) => p.price >= 100 && p.price < 200)
  } else if (priceFilter === "high") {
    filteredProducts = filteredProducts.filter((p) => p.price >= 200)
  }

  const handleQuickView = (product: (typeof products)[0]) => {
    setQuickViewProduct(product)
    setQuickViewOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="gradient-hero py-12 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-40"></div>
        <ScrollReveal animation="fade-down">
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Notre Catalogue
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explorez notre collection complète de produits de qualité
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="glass-nav py-6 border-b border-border/50 sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <span className="font-semibold">Filtres</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-start sm:items-center">
              {/* Category Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Catégorie</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[180px] glass-card border-border/50">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Prix</label>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] glass-card border-border/50">
                    <SelectValue placeholder="Prix" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les prix</SelectItem>
                    <SelectItem value="low">Moins de 100€</SelectItem>
                    <SelectItem value="medium">100€ - 200€</SelectItem>
                    <SelectItem value="high">Plus de 200€</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Affichage</label>
                <div className="flex gap-2">
                  <Button
                    variant={gridView === "3" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setGridView("3")}
                    className="transition-all duration-300"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={gridView === "4" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setGridView("4")}
                    className="transition-all duration-300"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground animate-in fade-in duration-500">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé
            {filteredProducts.length > 1 ? "s" : ""}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
              <p className="text-lg text-muted-foreground mb-4">Aucun produit trouvé avec ces filtres.</p>
              <Button
                onClick={() => {
                  setSelectedCategory("Tous")
                  setPriceFilter("all")
                }}
                variant="outline"
                className="glass-card hover:scale-105 transition-all duration-300"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${gridView === "3" ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-6 transition-all duration-500`}
            >
              {filteredProducts.map((product, index) => (
                <ScrollReveal key={product.id} animation="flip-up" delay={index * 50}>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    category={product.category}
                    description={product.description}
                    image={product.image}
                    onQuickView={() => handleQuickView(product)}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <ProductQuickView product={quickViewProduct} open={quickViewOpen} onOpenChange={setQuickViewOpen} />
    </div>
  )
}
