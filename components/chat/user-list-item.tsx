"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { User } from "@/types/chat"

interface UserListItemProps {
  user: User
  isSelected: boolean
  onClick: () => void
  theme: "light" | "dark"
  getAvatarGradient: (userId: number) => string
}

export default function UserListItem({ user, isSelected, onClick, theme, getAvatarGradient }: UserListItemProps) {
  const currentTheme =
    theme === "dark"
      ? { hover: "hover:bg-gray-700", textSecondary: "text-gray-400" }
      : { hover: "hover:bg-gray-200", textSecondary: "text-gray-500" }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <motion.li
      onClick={onClick}
      className={cn(
        "flex items-center px-4 py-3 cursor-pointer",
        currentTheme.hover,
        isSelected &&
          (theme === "dark"
            ? "bg-gray-700/70 border-l-4 border-indigo-500"
            : "bg-indigo-50 border-l-4 border-indigo-500"),
      )}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
      }}
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="relative">
        <motion.div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-white font-medium shadow-md",
            "bg-gradient-to-br",
            getAvatarGradient(user.id),
          )}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          aria-hidden="true"
        >
          {user.avatar}
        </motion.div>
        {user.online && (
          <motion.div
            className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            aria-label="Online"
          />
        )}
      </div>
      <div className="ml-3 flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <p className="font-medium text-sm truncate">{user.name}</p>
          <p className={cn("text-xs", currentTheme.textSecondary)}>{user.lastSeen}</p>
        </div>
        <p className={cn("text-xs truncate", currentTheme.textSecondary)}>
          {user.online ? "Online" : `Last seen ${user.lastSeen}`}
        </p>
      </div>
    </motion.li>
  )
}
