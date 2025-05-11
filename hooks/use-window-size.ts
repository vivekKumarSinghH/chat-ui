"use client"

import { useState, useEffect, useCallback } from "react"

export function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  // Set mounted state for client-side rendering
  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth)
    }
  }, [])

  // Debounce function for resize events
  const debounce = <T extends (...args: any[]) => any>(
    callback: T,
    delay: number,
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout | null = null

    return (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        callback(...args)
      }, delay)
    }
  }

  // Debounced resize handler for better performance
  const handleResize = useCallback(
    debounce(() => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth)
      }
    }, 200),
    [],
  )

  // Handle window resize
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [handleResize])

  return {
    windowWidth,
    isMounted,
  }
}
