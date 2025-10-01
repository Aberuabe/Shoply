"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { products } from "@/lib/products"
import Link from "next/link"
import Image from "next/image"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<typeof products>([])
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleClear = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Rechercher des produits..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 glass-card border-border/50 focus:border-primary transition-all duration-300"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full glass-card border border-border/50 rounded-lg shadow-2xl max-h-96 overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          {results.length > 0 ? (
            <div className="p-2">
              <p className="text-xs text-muted-foreground px-3 py-2">
                {results.length} résultat{results.length > 1 ? "s" : ""}
              </p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/produit/${product.id}`}
                  onClick={() => {
                    setIsOpen(false)
                    setQuery("")
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-all duration-300 group"
                >
                  <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-sm font-bold text-primary">{product.price.toFixed(2)}€</div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm text-muted-foreground">Aucun produit trouvé</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
