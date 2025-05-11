"use client"

import type { RefObject } from "react"
import { motion } from "framer-motion"
import { MessageSquare } from "lucide-react"
import MessageItem from "@/components/chat/message-item"
import type { ChatData } from "@/types/chat"

interface MessageListProps {
  data: ChatData
  selectedUser: number
  messagesEndRef: RefObject<HTMLDivElement>
}

export default function MessageList({ data, selectedUser, messagesEndRef }: MessageListProps) {
  const messages = data.conversations[selectedUser] || []

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-muted/30" aria-label="Chat messages" role="log">
      {messages.length === 0 ? (
        <motion.div
          className="h-full flex flex-col items-center justify-center text-muted-foreground"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <MessageSquare size={48} className="mb-2 opacity-50" />
          <p className="text-sm">No messages yet. Start a conversation!</p>
        </motion.div>
      ) : (
        messages.map((message, index) => {
          const isCurrentUser = message.sender === data.currentUser.id
          const showAvatar = index === 0 || messages[index - 1].sender !== message.sender

          return (
            <MessageItem
              key={message.id}
              message={message}
              isCurrentUser={isCurrentUser}
              showAvatar={showAvatar}
              data={data}
              index={index}
            />
          )
        })
      )}
      <div ref={messagesEndRef} aria-hidden="true" />
    </div>
  )
}
