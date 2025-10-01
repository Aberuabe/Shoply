export interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  description: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Sneakers Premium",
    price: 129.99,
    category: "Chaussures",
    image: "/modern-white-sneakers-product-photo.jpg",
    description:
      "Sneakers premium en cuir véritable avec semelle confortable. Design moderne et élégant pour un style urbain sophistiqué.",
  },
  {
    id: 2,
    name: "Montre Élégante",
    price: 249.99,
    category: "Accessoires",
    image: "/luxury-silver-watch-product-photo.jpg",
    description: "Montre élégante avec bracelet en acier inoxydable. Mouvement à quartz précis et design intemporel.",
  },
  {
    id: 3,
    name: "Sac à Dos Urbain",
    price: 89.99,
    category: "Sacs",
    image: "/modern-black-backpack-product-photo.jpg",
    description:
      "Sac à dos urbain avec compartiment pour ordinateur portable. Matériaux résistants à l'eau et design minimaliste.",
  },
  {
    id: 4,
    name: "Écouteurs Sans Fil",
    price: 179.99,
    category: "Électronique",
    image: "/white-wireless-earbuds-product-photo.jpg",
    description: "Écouteurs sans fil avec réduction de bruit active. Autonomie de 24h et qualité audio exceptionnelle.",
  },
  {
    id: 5,
    name: "Lunettes de Soleil",
    price: 149.99,
    category: "Accessoires",
    image: "/modern-sunglasses-product-photo.jpg",
    description: "Lunettes de soleil avec protection UV400. Monture légère et design contemporain.",
  },
  {
    id: 6,
    name: "Portefeuille Cuir",
    price: 69.99,
    category: "Accessoires",
    image: "/leather-wallet-product-photo.jpg",
    description:
      "Portefeuille en cuir véritable avec protection RFID. Compact et élégant avec multiples compartiments.",
  },
  {
    id: 7,
    name: "Casquette Premium",
    price: 39.99,
    category: "Accessoires",
    image: "/black-baseball-cap-product-photo.jpg",
    description:
      "Casquette premium en coton avec broderie de qualité. Ajustable et confortable pour un usage quotidien.",
  },
  {
    id: 8,
    name: "Chargeur Sans Fil",
    price: 49.99,
    category: "Électronique",
    image: "/wireless-charger-product-photo.jpg",
    description: "Chargeur sans fil rapide compatible avec tous les appareils Qi. Design élégant et charge sécurisée.",
  },
]

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "Tous") return products
  return products.filter((p) => p.category === category)
}

export const categories = ["Tous", "Chaussures", "Accessoires", "Sacs", "Électronique"]
