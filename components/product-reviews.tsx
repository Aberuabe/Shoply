"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { StarRating } from "@/components/star-rating"
import { getReviewsByProductId, getAverageRating, getRatingDistribution } from "@/lib/reviews-data"
import { CheckCircle2, Star } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

interface ProductReviewsProps {
  productId: number
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const reviews = getReviewsByProductId(productId)
  const averageRating = getAverageRating(productId)
  const distribution = getRatingDistribution(productId)
  const totalReviews = reviews.length

  if (totalReviews === 0) {
    return (
      <Card className="glass-card border-border/50">
        <CardContent className="p-8 text-center">
          <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucun avis pour le moment</h3>
          <p className="text-muted-foreground text-sm">Soyez le premier à donner votre avis sur ce produit.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <ScrollReveal animation="fade-up">
        <Card className="glass-card border-border/50">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-6">Avis clients</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {averageRating.toFixed(1)}
                  </span>
                  <div>
                    <StarRating rating={averageRating} size="lg" />
                    <p className="text-sm text-muted-foreground mt-1">{totalReviews} avis</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = distribution[stars]
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0

                  return (
                    <div key={stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm font-medium">{stars}</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      </div>
                      <Progress value={percentage} className="flex-1 h-2" />
                      <span className="text-sm text-muted-foreground w-8 text-right">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <ScrollReveal key={review.id} animation="fade-up" delay={index * 100}>
            <Card className="glass-card border-border/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{review.author}</span>
                      {review.verified && (
                        <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 dark:bg-green-950 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Achat vérifié</span>
                        </div>
                      )}
                    </div>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
