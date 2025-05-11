"use client"

import type React from "react"

import { useRef, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Send, Smile, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import EmojiPicker from "@/components/chat/emoji-picker"

interface MessageInputProps {
  newMessage: string
  setNewMessage: (message: string) => void
  handleSendMessage: (e: React.FormEvent) => void
}

export default function MessageInput({ newMessage, setNewMessage, handleSendMessage }: MessageInputProps) {
  const { toast } = useToast()
  const inputRef = useRef<HTMLInputElement>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey && newMessage.trim()) {
      e.preventDefault()
      handleSendMessage(e as unknown as React.FormEvent)
    }
  }

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage((prev) => prev + emoji)
    toast({
      title: "Emoji Added",
      description: `Added ${emoji} to your message`,
      duration: 1500,
    })
    // Focus the input after selecting an emoji
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handleAttachment = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      toast({
        title: "File Attached",
        description: `${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
      })
      // In a real app, you would upload the file to a server here
      // For now, we'll just clear the input
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <div className="border-t p-4 bg-background/80 backdrop-blur-sm relative">
      <AnimatePresence>
        {showEmojiPicker && <EmojiPicker onEmojiSelect={handleEmojiSelect} onClose={() => setShowEmojiPicker(false)} />}
      </AnimatePresence>

      <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          aria-label={showEmojiPicker ? "Close emoji picker" : "Open emoji picker"}
          className={showEmojiPicker ? "text-primary" : ""}
        >
          <Smile size={20} />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={handleAttachment} aria-label="Attach file">
          <Paperclip size={20} />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
        </Button>
        <Input
          ref={inputRef}
          type="text"
          value={newMessage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 rounded-full"
          aria-label="Message input"
        />
        <Button
          type="submit"
          size="icon"
          className="rounded-full"
          disabled={!newMessage.trim()}
          aria-label="Send message"
        >
          <Send size={20} />
        </Button>
      </form>
    </div>
  )
}
