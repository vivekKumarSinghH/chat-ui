"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { User } from "@/types/chat"

interface UserListItemProps {
  user: User
  isSelected: boolean
  onClick: () => void
}

export default function UserListItem({ user, isSelected, onClick }: UserListItemProps) {
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
        "flex items-center px-4 py-3 cursor-pointer hover:bg-muted/50",
        isSelected && "bg-muted border-l-4 border-primary",
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
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
          {user.avatar}
        </div>
        {user.online && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
        )}
      </div>
      <div className="ml-3 flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <p className="font-medium text-sm truncate">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.lastSeen}</p>
        </div>
        <p className="text-xs truncate text-muted-foreground">
          {user.online ? "Online" : `Last seen ${user.lastSeen}`}
        </p>
      </div>
    </motion.li>
  )
}
