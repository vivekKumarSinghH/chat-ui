"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"

import Sidebar from "@/components/chat/sidebar"
import ChatHeader from "@/components/chat/chat-header"
import MessageList from "@/components/chat/message-list"
import MessageInput from "@/components/chat/message-input"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useChat } from "@/hooks/use-chat"
import { useWindowSize } from "@/hooks/use-window-size"

// Font setup with multiple weights as required in the prompt
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export default function ChatContainer() {
  const { theme } = useTheme()
  const { windowWidth, isMounted } = useWindowSize()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)

  const { data, selectedUser, setSelectedUser, newMessage, setNewMessage, handleSendMessage, messagesEndRef } =
    useChat()

  // Handle window resize for responsive sidebar
  useEffect(() => {
    if (windowWidth >= 768 && !sidebarOpen) {
      setSidebarOpen(true)
    }
  }, [windowWidth, sidebarOpen])

  // Toggle sidebar visibility (for mobile)
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  // Don't render on server
  if (!isMounted) {
    return <div className="h-screen w-screen bg-background" />
  }

  return (
    <div className={cn("flex h-screen w-screen font-sans bg-background text-foreground", poppins.variable)}>
      {/* Mobile sidebar toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full shadow-md bg-background"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Sidebar with user list */}
      <Sidebar
        data={data}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        sidebarOpen={sidebarOpen}
        windowWidth={windowWidth}
      />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col" role="main">
        {/* Chat header with selected user info */}
        <ChatHeader data={data} selectedUser={selectedUser} />

        {/* Messages area with animations */}
        <MessageList data={data} selectedUser={selectedUser} messagesEndRef={messagesEndRef} />

        {/* Message input form */}
        <MessageInput newMessage={newMessage} setNewMessage={setNewMessage} handleSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}
