"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, ExternalLink } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  category: string
  description: string
  image: string
}

interface ProductQuickViewProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductQuickView({ product, open, onOpenChange }: ProductQuickViewProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isAdding, setIsAdding] = useState(false)

  if (!product) return null

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })

    toast({
      title: "Produit ajouté au panier",
      description: `${product.name} a été ajouté à votre panier.`,
      duration: 3000,
    })

    setTimeout(() => {
      setIsAdding(false)
      onOpenChange(false)
    }, 500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className="sr-only">Aperçu rapide du produit</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-muted to-muted/50">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-3">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary inline-block">
                {product.category}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">{product.name}</h2>

            <div className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {product.price.toFixed(2)}€
            </div>

            <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

            <div className="flex flex-col gap-3 mt-auto">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-xl transition-all duration-300"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isAdding ? "Ajout en cours..." : "Ajouter au panier"}
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full glass-card bg-transparent">
                <Link href={`/produit/${product.id}`} onClick={() => onOpenChange(false)}>
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Voir les détails complets
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
