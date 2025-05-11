"use client"

import { useState, useEffect, useCallback } from "react"
import { colors } from "@/lib/colors"

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  // Handle theme change and system preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark")
      }
    }
  }, [])

  // Toggle between light and dark theme
  const toggleTheme = useCallback((): void => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }, [])

  // Get current theme colors
  const currentTheme = theme === "dark" ? colors.dark : colors.light

  return {
    theme,
    setTheme,
    toggleTheme,
    currentTheme,
  }
}
