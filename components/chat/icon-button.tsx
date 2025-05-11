"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface IconButtonProps {
  icon: React.ReactNode
  onClick?: () => void
  label: string
  className?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export default function IconButton({
  icon,
  onClick,
  label,
  className,
  disabled = false,
  type = "button",
}: IconButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={cn("p-2 rounded-full", className)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={label}
      disabled={disabled}
      initial={false}
    >
      {icon}
    </motion.button>
  )
}
