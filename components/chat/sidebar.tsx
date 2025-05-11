"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Moon, Sun, MessageSquare, MoreVertical } from "lucide-react"
import Avatar from "@/components/chat/avatar"
import IconButton from "@/components/chat/icon-button"
import UserListItem from "@/components/chat/user-list-item"
import type { ChatData } from "@/types/chat"
import type { ThemeColors } from "@/types/theme"

interface SidebarProps {
  data: ChatData
  selectedUser: number
  setSelectedUser: (userId: number) => void
  sidebarOpen: boolean
  windowWidth: number
  theme: "light" | "dark"
  currentTheme: ThemeColors
  toggleTheme: () => void
  getAvatarGradient: (userId: number) => string
}

export default function Sidebar({
  data,
  selectedUser,
  setSelectedUser,
  sidebarOpen,
  windowWidth,
  theme,
  currentTheme,
  toggleTheme,
  getAvatarGradient,
}: SidebarProps) {
  return (
    <AnimatePresence>
      {(sidebarOpen || windowWidth >= 768) && (
        <motion.div
          className={cn("fixed md:relative z-40 h-full w-72 flex-shrink-0 shadow-lg", currentTheme.sidebar)}
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          role="navigation"
          aria-label="Chat contacts"
        >
          <div className="flex flex-col h-full">
            {/* Sidebar header with app title and theme toggle */}
            <div className={cn("p-4 border-b flex items-center justify-between", currentTheme.border)}>
              <motion.h1
                className="text-xl font-semibold font-poppins flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <MessageSquare className="mr-2 text-indigo-500" size={24} />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                  ChatApp
                </span>
              </motion.h1>
              <IconButton
                icon={theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                onClick={toggleTheme}
                label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                className={currentTheme.hover}
              />
            </div>

            {/* User search input */}
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className={cn(
                    "w-full p-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-inter text-sm transition-all duration-200",
                    currentTheme.input,
                  )}
                  aria-label="Search users"
                />
              </div>
            </div>

            {/* User list with staggered animation */}
            <div className="flex-1 overflow-y-auto">
              <h2 className={cn("px-4 py-2 text-xs font-semibold uppercase", currentTheme.textSecondary)}>
                Recent Chats
              </h2>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.07,
                      delayChildren: 0.2,
                    },
                  },
                  hidden: {},
                }}
                role="listbox"
                aria-label="Chat contacts"
              >
                {data.users.map((user) => (
                  <UserListItem
                    key={user.id}
                    user={user}
                    isSelected={selectedUser === user.id}
                    onClick={() => setSelectedUser(user.id)}
                    theme={theme}
                    getAvatarGradient={getAvatarGradient}
                  />
                ))}
              </motion.ul>
            </div>

            {/* Current user profile section */}
            <div className={cn("p-4 border-t flex items-center", currentTheme.border)}>
              <Avatar
                userId={data.currentUser.id}
                showStatus={true}
                data={data}
                getAvatarGradient={getAvatarGradient}
              />
              <div className="ml-3">
                <p className="font-medium text-sm">{data.currentUser.name}</p>
                <p className={cn("text-xs", currentTheme.textSecondary)}>Online</p>
              </div>
              <IconButton
                icon={<MoreVertical size={18} />}
                label="User settings"
                className={cn("ml-auto", currentTheme.hover)}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
