"use client"

import type React from "react"

import { useRef } from "react"
import { cn } from "@/lib/utils"
import { Send, Smile, Paperclip } from "lucide-react"
import IconButton from "@/components/chat/icon-button"
import type { ThemeColors } from "@/types/theme"

interface MessageInputProps {
  newMessage: string
  setNewMessage: (message: string) => void
  handleSendMessage: (e: React.FormEvent) => void
  theme: "light" | "dark"
  currentTheme: ThemeColors
}

export default function MessageInput({
  newMessage,
  setNewMessage,
  handleSendMessage,
  theme,
  currentTheme,
}: MessageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey && newMessage.trim()) {
      e.preventDefault()
      handleSendMessage(e as unknown as React.FormEvent)
    }
  }

  return (
    <div className={cn("border-t p-4 backdrop-blur-sm", currentTheme.header, currentTheme.border)}>
      <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
        <IconButton
          icon={<Smile size={20} />}
          onClick={() => inputRef.current?.focus()}
          label="Add emoji"
          className={cn("p-3 rounded-full", currentTheme.hover, currentTheme.textSecondary)}
        />
        <IconButton
          icon={<Paperclip size={20} />}
          onClick={() => inputRef.current?.focus()}
          label="Attach file"
          className={cn("p-3 rounded-full", currentTheme.hover, currentTheme.textSecondary)}
        />
        <input
          ref={inputRef}
          type="text"
          value={newMessage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className={cn(
            "flex-1 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 font-inter transition-all duration-200",
            currentTheme.input,
          )}
          aria-label="Message input"
        />
        <IconButton
          type="submit"
          icon={<Send size={20} />}
          label="Send message"
          className={cn(
            "p-3 rounded-full text-white",
            "bg-gradient-to-r from-indigo-500 to-purple-600",
            !newMessage.trim() && "opacity-70 cursor-not-allowed",
          )}
          disabled={!newMessage.trim()}
        />
      </form>
    </div>
  )
}
