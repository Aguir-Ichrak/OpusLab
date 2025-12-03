"use client"

import { createContext, useState, useEffect } from "react"
import { useTheme as useNextTheme } from "next-themes"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const { theme, setTheme } = useNextTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return {
    theme: (theme as "light" | "dark") || "light",
    toggleTheme,
  }
}

export function useThemeProvider() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return { mounted }
}
