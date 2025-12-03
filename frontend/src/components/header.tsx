"use client"

import Link from "next/link"
import { Search, Menu, X, Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "@/hooks/use-theme"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/opus_lab_logo.png" alt="Opus Lab Logo" width={60} height={40} priority />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition">
            Home
          </Link>
          <Link href="/categories" className="text-sm font-medium hover:text-primary transition">
            Categories
          </Link>
          <Link href="/tags" className="text-sm font-medium hover:text-primary transition">
            Tags
          </Link>
          <Link href="/authors" className="text-sm font-medium hover:text-primary transition">
            Authors
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          {/* Mobile Version */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {isOpen && (
        <nav className="md:hidden border-t border-border bg-card">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/tags"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Tags
            </Link>
            <Link
              href="/authors"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Authors
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
