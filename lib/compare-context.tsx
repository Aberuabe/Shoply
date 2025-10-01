"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/lib/products"

interface CompareContextType {
  compareItems: Product[]
  addToCompare: (product: Product) => void
  removeFromCompare: (id: number) => void
  clearCompare: () => void
  isInCompare: (id: number) => boolean
  maxItems: number
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

const MAX_COMPARE_ITEMS = 4

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareItems, setCompareItems] = useState<Product[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("compareItems")
    if (stored) {
      try {
        setCompareItems(JSON.parse(stored))
      } catch (e) {
        console.error("[v0] Failed to parse compare items from localStorage:", e)
      }
    }
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("compareItems", JSON.stringify(compareItems))
  }, [compareItems])

  const addToCompare = (product: Product) => {
    console.log("[v0] Adding product to compare:", product.id)
    setCompareItems((current) => {
      // Check if already in compare
      if (current.some((item) => item.id === product.id)) {
        console.log("[v0] Product already in compare list")
        return current
      }
      // Check max limit
      if (current.length >= MAX_COMPARE_ITEMS) {
        console.log("[v0] Compare list is full, cannot add more items")
        return current
      }
      return [...current, product]
    })
  }

  const removeFromCompare = (id: number) => {
    console.log("[v0] Removing product from compare:", id)
    setCompareItems((current) => current.filter((item) => item.id !== id))
  }

  const clearCompare = () => {
    console.log("[v0] Clearing compare list")
    setCompareItems([])
  }

  const isInCompare = (id: number) => {
    return compareItems.some((item) => item.id === id)
  }

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        maxItems: MAX_COMPARE_ITEMS,
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider")
  }
  return context
}
