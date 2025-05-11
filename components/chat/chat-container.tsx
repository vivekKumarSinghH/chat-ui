"use client"

import { useState, useEffect } from "react"
import { Inter, Poppins } from "next/font/google"
import { cn } from "@/lib/utils"

import Sidebar from "@/components/chat/sidebar"
import ChatHeader from "@/components/chat/chat-header"
import MessageList from "@/components/chat/message-list"
import MessageInput from "@/components/chat/message-input"
import { Menu, X } from "lucide-react"
import IconButton from "@/components/chat/icon-button"

import { useChat } from "@/hooks/use-chat"
import { useTheme } from "@/hooks/use-theme"
import { useWindowSize } from "@/hooks/use-window-size"

// Font setup with multiple weights as required in the prompt
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Varying weights for hierarchy
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
})

export default function ChatContainer() {
  const { theme, currentTheme, toggleTheme } = useTheme()
  const { windowWidth, isMounted } = useWindowSize()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)

  const {
    data,
    selectedUser,
    setSelectedUser,
    newMessage,
    setNewMessage,
    handleSendMessage,
    messagesEndRef,
    getAvatarGradient,
  } = useChat()

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
    return <div className="h-screen w-screen bg-gray-100 dark:bg-gray-900" />
  }

  return (
    <div
      className={cn(
        "flex h-screen w-screen font-sans transition-colors duration-300",
        poppins.variable,
        inter.variable,
        currentTheme.bg,
        currentTheme.text,
      )}
    >
      {/* Mobile sidebar toggle button */}
      <IconButton
        onClick={toggleSidebar}
        icon={sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        className={cn(
          "md:hidden fixed top-4 left-4 z-50 p-2 rounded-full shadow-md",
          theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800",
        )}
      />

      {/* Sidebar with user list */}
      <Sidebar
        data={data}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        sidebarOpen={sidebarOpen}
        windowWidth={windowWidth}
        theme={theme}
        currentTheme={currentTheme}
        toggleTheme={toggleTheme}
        getAvatarGradient={getAvatarGradient}
      />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col" role="main">
        {/* Chat header with selected user info */}
        <ChatHeader
          data={data}
          selectedUser={selectedUser}
          theme={theme}
          currentTheme={currentTheme}
          getAvatarGradient={getAvatarGradient}
        />

        {/* Messages area with animations */}
        <MessageList
          data={data}
          selectedUser={selectedUser}
          theme={theme}
          currentTheme={currentTheme}
          getAvatarGradient={getAvatarGradient}
          messagesEndRef={messagesEndRef}
        />

        {/* Message input form */}
        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          theme={theme}
          currentTheme={currentTheme}
        />
      </div>
    </div>
  )
}
