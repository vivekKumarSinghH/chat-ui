"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { initialData } from "@/lib/data"
import { colors } from "@/lib/colors"
import type { ChatData, Message } from "@/types/chat"

export function useChat() {
  const [data, setData] = useState<ChatData>(initialData)
  const [newMessage, setNewMessage] = useState<string>("")
  const [selectedUser, setSelectedUser] = useState<number>(2) // Default selected user

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [data.conversations[selectedUser]])

  // Handle sending a new message
  const handleSendMessage = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault()
      if (newMessage.trim() !== "") {
        const now = new Date()
        const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

        // Create new message
        const newMsg: Message = {
          id: data.conversations[selectedUser]?.length + 1 || 1,
          sender: data.currentUser.id,
          message: newMessage,
          timestamp: timeString,
        }

        // Update conversations in the data structure
        setData((prevData) => ({
          ...prevData,
          conversations: {
            ...prevData.conversations,
            [selectedUser]: [...(prevData.conversations[selectedUser] || []), newMsg],
          },
        }))

        setNewMessage("")
      }
    },
    [data, newMessage, selectedUser, data.currentUser.id],
  )

  // Get avatar gradient based on user ID for visual variety
  const getAvatarGradient = useCallback((userId: number): string => {
    const gradientKeys = Object.keys(colors.gradients) as Array<keyof typeof colors.gradients>
    return colors.gradients[gradientKeys[userId % gradientKeys.length]]
  }, [])

  return {
    data,
    selectedUser,
    setSelectedUser,
    newMessage,
    setNewMessage,
    handleSendMessage,
    messagesEndRef,
    getAvatarGradient,
  }
}
