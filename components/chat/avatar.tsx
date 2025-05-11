"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ChatData } from "@/types/chat"

interface AvatarProps {
  userId: number
  size?: "sm" | "md" | "lg"
  showStatus?: boolean
  className?: string
  data: ChatData
  getAvatarGradient: (userId: number) => string
}

export default function Avatar({
  userId,
  size = "md",
  showStatus = false,
  className,
  data,
  getAvatarGradient,
}: AvatarProps) {
  const user =
    data.users.find((u) => u.id === userId) || (userId === data.currentUser.id ? data.currentUser : undefined)

  if (!user) return null

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  }

  return (
    <div className="relative">
      <motion.div
        className={cn(
          "rounded-full flex items-center justify-center text-white font-medium shadow-md",
          "bg-gradient-to-br",
          getAvatarGradient(userId),
          sizeClasses[size],
          className,
        )}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        aria-hidden="true"
      >
        {user.avatar}
      </motion.div>
      {showStatus && user.online && (
        <motion.div
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-gray-800",
            size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3",
            "bg-emerald-500",
          )}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          aria-label="Online"
        />
      )}
    </div>
  )
}
