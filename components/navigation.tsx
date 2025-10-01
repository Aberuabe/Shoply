"use client"

import Link from "next/link"
import { ShoppingCart, Menu, X, Heart, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useCompare } from "@/lib/compare-context"
import { SearchBar } from "@/components/search-bar"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { items } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { compareItems } = useCompare()

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlistItems.length
  const compareCount = compareItems.length

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 flex-shrink-0"
          >
            Shoply
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 flex-shrink-0">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-all duration-300 font-medium relative group"
            >
              Accueil
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/catalogue"
              className="text-foreground hover:text-primary transition-all duration-300 font-medium relative group"
            >
              Catalogue
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-primary transition-all duration-300 font-medium relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/comparaison" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-primary/10 hover:scale-110 transition-all duration-300"
              >
                <Scale className="h-5 w-5" />
                {compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-accent to-primary text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-in zoom-in duration-300">
                    {compareCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/favoris" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-primary/10 hover:scale-110 transition-all duration-300"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-in zoom-in duration-300">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/panier" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-primary/10 hover:scale-110 transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-in zoom-in duration-300">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/comparaison" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-primary/10 hover:scale-110 transition-all duration-300"
              >
                <Scale className="h-5 w-5" />
                {compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-accent to-primary text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {compareCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/favoris" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-primary/10 hover:scale-110 transition-all duration-300"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/panier" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-primary/10 hover:scale-110 transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:bg-primary/10 hover:scale-110 transition-all duration-300"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Mobile Search */}
            <div className="mb-4">
              <SearchBar />
            </div>

            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors font-medium hover:translate-x-2 transition-transform duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/catalogue"
                className="text-foreground hover:text-primary transition-colors font-medium hover:translate-x-2 transition-transform duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Catalogue
              </Link>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary transition-colors font-medium hover:translate-x-2 transition-transform duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
