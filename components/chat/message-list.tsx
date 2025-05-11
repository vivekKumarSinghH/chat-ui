"use client"

import type { RefObject } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { MessageSquare } from "lucide-react"
import MessageItem from "@/components/chat/message-item"
import type { ChatData } from "@/types/chat"
import type { ThemeColors } from "@/types/theme"

interface MessageListProps {
  data: ChatData
  selectedUser: number
  theme: "light" | "dark"
  currentTheme: ThemeColors
  getAvatarGradient: (userId: number) => string
  messagesEndRef: RefObject<HTMLDivElement>
}

export default function MessageList({
  data,
  selectedUser,
  theme,
  currentTheme,
  getAvatarGradient,
  messagesEndRef,
}: MessageListProps) {
  const messages = data.conversations[selectedUser] || []

  return (
    <div
      className={cn("flex-1 overflow-y-auto p-4 md:p-6 space-y-4", theme === "dark" ? "bg-gray-900" : "bg-gray-50")}
      aria-label="Chat messages"
      role="log"
    >
      {messages.length === 0 ? (
        <motion.div
          className={cn("h-full flex flex-col items-center justify-center", currentTheme.textSecondary)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <MessageSquare size={48} className="mb-2 opacity-50" />
          <p className="text-sm">No messages yet. Start a conversation!</p>
        </motion.div>
      ) : (
        <AnimatePresence>
          {messages.map((message, index) => {
            const isCurrentUser = message.sender === data.currentUser.id
            const showAvatar = index === 0 || messages[index - 1].sender !== message.sender

            return (
              <MessageItem
                key={message.id}
                message={message}
                isCurrentUser={isCurrentUser}
                showAvatar={showAvatar}
                theme={theme}
                getAvatarGradient={getAvatarGradient}
                data={data}
                index={index}
              />
            )
          })}
        </AnimatePresence>
      )}
      <div ref={messagesEndRef} aria-hidden="true" />
    </div>
  )
}
