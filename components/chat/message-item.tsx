"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ChatData, Message, User } from "@/types/chat"

interface MessageItemProps {
  message: Message
  isCurrentUser: boolean
  showAvatar: boolean
  data: ChatData
  index: number
}

export default function MessageItem({ message, isCurrentUser, showAvatar, data, index }: MessageItemProps) {
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
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.05 }}
      aria-label={`Message from ${isCurrentUser ? "you" : sender?.name}`}
      role="article"
    >
      {!isCurrentUser && showAvatar && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium mr-2 self-end mb-1">
          {sender?.avatar.charAt(0) || "U"}
        </div>
      )}

      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2 shadow-sm",
          isCurrentUser ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-card rounded-tl-none",
        )}
      >
        <p className="text-sm">{message.message}</p>
        <p
          className={cn("text-xs mt-1", isCurrentUser ? "text-primary-foreground/80" : "text-muted-foreground")}
          aria-label={`Sent at ${message.timestamp}`}
        >
          {message.timestamp}
        </p>
      </div>

      {isCurrentUser && showAvatar && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium ml-2 self-end mb-1">
          {data.currentUser.avatar.charAt(0)}
        </div>
      )}
    </motion.div>
  )
}
