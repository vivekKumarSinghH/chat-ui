"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ChatData, Message, User } from "@/types/chat"

interface MessageItemProps {
  message: Message
  isCurrentUser: boolean
  showAvatar: boolean
  theme: "light" | "dark"
  getAvatarGradient: (userId: number) => string
  data: ChatData
  index: number
}

export default function MessageItem({
  message,
  isCurrentUser,
  showAvatar,
  theme,
  getAvatarGradient,
  data,
  index,
}: MessageItemProps) {
  const currentTheme = theme === "dark" ? { textSecondary: "text-gray-400" } : { textSecondary: "text-gray-500" }

  const getUserById = (id: number): User | undefined => {
    if (id === data.currentUser.id) return data.currentUser
    return data.users.find((u) => u.id === id)
  }

  const sender = getUserById(message.sender)

  return (
    <motion.div
      className={cn("flex", isCurrentUser ? "justify-end" : "justify-start")}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.05 }}
      aria-label={`Message from ${isCurrentUser ? "you" : sender?.name}`}
      role="article"
    >
      {!isCurrentUser && showAvatar && (
        <motion.div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium mr-2 self-end mb-1",
            "bg-gradient-to-br",
            getAvatarGradient(message.sender),
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          aria-hidden="true"
        >
          {sender?.avatar.charAt(0) || "U"}
        </motion.div>
      )}

      <motion.div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2 shadow-sm",
          isCurrentUser
            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-tr-none"
            : theme === "dark"
              ? "bg-gray-800 rounded-tl-none"
              : "bg-white rounded-tl-none",
        )}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <p className="text-sm">{message.message}</p>
        <p
          className={cn("text-xs mt-1", isCurrentUser ? "text-indigo-100" : currentTheme.textSecondary)}
          aria-label={`Sent at ${message.timestamp}`}
        >
          {message.timestamp}
        </p>
      </motion.div>

      {isCurrentUser && showAvatar && (
        <motion.div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ml-2 self-end mb-1",
            "bg-gradient-to-br",
            getAvatarGradient(message.sender),
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          aria-hidden="true"
        >
          {data.currentUser.avatar.charAt(0)}
        </motion.div>
      )}
    </motion.div>
  )
}
