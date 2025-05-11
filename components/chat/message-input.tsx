"use client"

import type React from "react"

import { useRef } from "react"
import { Send, Smile, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MessageInputProps {
  newMessage: string
  setNewMessage: (message: string) => void
  handleSendMessage: (e: React.FormEvent) => void
}

export default function MessageInput({ newMessage, setNewMessage, handleSendMessage }: MessageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey && newMessage.trim()) {
      e.preventDefault()
      handleSendMessage(e as unknown as React.FormEvent)
    }
  }

  return (
    <div className="border-t p-4 bg-background/80 backdrop-blur-sm">
      <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => inputRef.current?.focus()}
          aria-label="Add emoji"
        >
          <Smile size={20} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => inputRef.current?.focus()}
          aria-label="Attach file"
        >
          <Paperclip size={20} />
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
