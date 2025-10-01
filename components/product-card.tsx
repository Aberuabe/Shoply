"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Eye, Scale } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWishlist } from "@/lib/wishlist-context"
import { useCompare } from "@/lib/compare-context"
import { useToast } from "@/hooks/use-toast"
import { StarRating } from "@/components/star-rating"
import { getAverageRating, getReviewsByProductId } from "@/lib/reviews-data"

interface ProductCardProps {
  id: number
  name: string
  price: number
  category: string
  description: string
  image: string
  onQuickView?: () => void
}

export function ProductCard({ id, name, price, category, description, image, onQuickView }: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { isInCompare, addToCompare, removeFromCompare, compareItems, maxItems } = useCompare()
  const { toast } = useToast()
  const isLiked = isInWishlist(id)
  const isComparing = isInCompare(id)

  const averageRating = getAverageRating(id)
  const reviewCount = getReviewsByProductId(id).length

  const handleToggleWishlist = () => {
    if (isLiked) {
      removeFromWishlist(id)
      toast({
        title: "Retiré des favoris",
        description: `${name} a été retiré de vos favoris.`,
        duration: 3000,
      })
    } else {
      addToWishlist({ id, name, price, category, description, image })
      toast({
        title: "Ajouté aux favoris",
        description: `${name} a été ajouté à vos favoris.`,
        duration: 3000,
      })
    }
  }

  const handleToggleCompare = () => {
    if (isComparing) {
      removeFromCompare(id)
      toast({
        title: "Retiré de la comparaison",
        description: `${name} a été retiré de la comparaison.`,
        duration: 3000,
      })
    } else {
      if (compareItems.length >= maxItems) {
        toast({
          title: "Limite atteinte",
          description: `Vous pouvez comparer jusqu'à ${maxItems} produits à la fois.`,
          variant: "destructive",
          duration: 3000,
        })
        return
      }
      addToCompare({ id, name, price, category, description, image })
      toast({
        title: "Ajouté à la comparaison",
        description: `${name} a été ajouté à la comparaison.`,
        duration: 3000,
      })
    }
  }

  return (
    <Card className="group overflow-hidden glass-card border-border/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 glow-on-hover relative">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {onQuickView && (
          <button
            onClick={onQuickView}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border bg-white/80 border-white/50 hover:bg-white/90 hover:scale-110 opacity-0 group-hover:opacity-100"
            aria-label="Aperçu rapide"
          >
            <Eye className="h-5 w-5 text-gray-700" />
          </button>
        )}

        <button
          onClick={handleToggleCompare}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
            "backdrop-blur-md border",
            isComparing
              ? "bg-accent/90 border-accent scale-110"
              : "bg-white/80 border-white/50 hover:bg-white/90 hover:scale-110",
          )}
          aria-label={isComparing ? "Retirer de la comparaison" : "Ajouter à la comparaison"}
        >
          <Scale
            className={cn(
              "h-5 w-5 transition-all duration-300",
              isComparing ? "fill-white text-white" : "text-gray-700",
            )}
          />
        </button>

        <button
          onClick={handleToggleWishlist}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
            "backdrop-blur-md border",
            isLiked
              ? "bg-red-500/90 border-red-400 scale-110"
              : "bg-white/80 border-white/50 hover:bg-white/90 hover:scale-110",
          )}
          aria-label={isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart
            className={cn("h-5 w-5 transition-all duration-300", isLiked ? "fill-white text-white" : "text-gray-700")}
          />
        </button>
      </div>

      <Link href={`/produit/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/50">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <span className="text-white font-semibold text-lg px-6 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
              Voir le produit
            </span>
          </div>
        </div>
      </Link>

      <CardContent className="p-6">
        <div className="mb-2">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary inline-block animate-in fade-in duration-500">
            {category}
          </span>
        </div>
        <Link href={`/produit/${id}`}>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {name}
          </h3>
        </Link>

        {reviewCount > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={averageRating} size="sm" />
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>
        )}

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {price.toFixed(2)}€
          </span>
          <Button
            asChild
            variant="default"
            size="sm"
            className="group/btn bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-110 transition-all duration-300 relative overflow-hidden"
          >
            <Link href={`/produit/${id}`}>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700"></span>
              <span className="relative z-10">Voir</span>
              <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
