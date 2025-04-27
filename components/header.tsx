"use client"

import { useState, useEffect, type FormEvent } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const categories = [
  { name: "Home", path: "/" },
  { name: "World", path: "/category/world" },
  { name: "Business", path: "/category/business" },
  { name: "Technology", path: "/category/technology" },
  { name: "Sports", path: "/category/sports" },
  { name: "Entertainment", path: "/category/entertainment" },
  { name: "Health", path: "/category/health" },
  { name: "Science", path: "/category/science" },
  { name: "Africa", path: "/category/africa" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
          : "bg-background",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {categories.map((category) => (
                    <Link
                      key={category.path}
                      href={category.path}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === category.path ? "text-primary font-bold" : "text-muted-foreground",
                      )}
                    >
                      {category.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center space-x-2 mr-6">
              <span className="font-bold text-xl md:text-2xl">Global News Network</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <Link
                key={category.path}
                href={category.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === category.path ? "text-primary font-bold" : "text-muted-foreground",
                )}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search news..."
                  className="w-[200px] md:w-[300px]"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close search</span>
                </Button>
              </form>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="py-2 border-t border-b text-xs text-muted-foreground hidden md:block">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span>Breaking News</span>
              <span className="animate-pulse">•</span>
              <span className="truncate">Global leaders meet to discuss climate change initiatives</span>
            </div>
            <div>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
