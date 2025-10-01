export interface Review {
  id: number
  productId: number
  author: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    author: "Marie Dubois",
    rating: 5,
    comment:
      "Excellentes sneakers! Très confortables et le design est magnifique. Je les porte tous les jours depuis 2 mois.",
    date: "2024-12-15",
    verified: true,
  },
  {
    id: 2,
    productId: 1,
    author: "Thomas Martin",
    rating: 4,
    comment: "Bonne qualité mais un peu chères. Le cuir est vraiment premium et la finition impeccable.",
    date: "2024-12-10",
    verified: true,
  },
  {
    id: 3,
    productId: 2,
    author: "Sophie Laurent",
    rating: 5,
    comment: "Montre élégante et précise. Le bracelet en acier est de très bonne qualité. Très satisfaite!",
    date: "2024-12-20",
    verified: true,
  },
  {
    id: 4,
    productId: 2,
    author: "Pierre Durand",
    rating: 5,
    comment: "Design intemporel et finition parfaite. C'est exactement ce que je cherchais.",
    date: "2024-12-18",
    verified: false,
  },
  {
    id: 5,
    productId: 3,
    author: "Julie Bernard",
    rating: 4,
    comment:
      "Très pratique pour le quotidien. Le compartiment pour ordinateur est bien rembourré. Juste un peu lourd quand il est plein.",
    date: "2024-12-22",
    verified: true,
  },
  {
    id: 6,
    productId: 4,
    author: "Lucas Petit",
    rating: 5,
    comment:
      "Son exceptionnel et la réduction de bruit est impressionnante. L'autonomie tient vraiment 24h. Je recommande!",
    date: "2024-12-25",
    verified: true,
  },
  {
    id: 7,
    productId: 4,
    author: "Emma Rousseau",
    rating: 5,
    comment: "Meilleurs écouteurs que j'ai eus. Confortables même après plusieurs heures d'utilisation.",
    date: "2024-12-23",
    verified: true,
  },
  {
    id: 8,
    productId: 5,
    author: "Alexandre Moreau",
    rating: 4,
    comment: "Lunettes stylées et protection UV efficace. La monture est légère et confortable.",
    date: "2024-12-19",
    verified: false,
  },
]

export function getReviewsByProductId(productId: number): Review[] {
  return reviews.filter((r) => r.productId === productId)
}

export function getAverageRating(productId: number): number {
  const productReviews = getReviewsByProductId(productId)
  if (productReviews.length === 0) return 0
  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0)
  return sum / productReviews.length
}

export function getRatingDistribution(productId: number): Record<number, number> {
  const productReviews = getReviewsByProductId(productId)
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }

  productReviews.forEach((review) => {
    distribution[review.rating]++
  })

  return distribution
}
