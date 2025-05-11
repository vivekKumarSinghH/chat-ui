"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare } from "lucide-react"
import UserListItem from "@/components/chat/user-list-item"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import type { ChatData } from "@/types/chat"

interface SidebarProps {
  data: ChatData
  selectedUser: number
  setSelectedUser: (userId: number) => void
  sidebarOpen: boolean
  windowWidth: number
}

export default function Sidebar({ data, selectedUser, setSelectedUser, sidebarOpen, windowWidth }: SidebarProps) {
  return (
    <AnimatePresence>
      {(sidebarOpen || windowWidth >= 768) && (
        <motion.div
          className="fixed md:relative z-40 h-full w-72 flex-shrink-0 border-r bg-background"
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          role="navigation"
          aria-label="Chat contacts"
        >
          <div className="flex flex-col h-full">
            {/* Sidebar header with app title and theme toggle */}
            <div className="p-4 border-b flex items-center justify-between">
              <motion.h1
                className="text-xl font-semibold font-poppins flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <MessageSquare className="mr-2 text-primary" size={24} />
                <span className="text-primary">ChatApp</span>
              </motion.h1>
              <ModeToggle />
            </div>

            {/* User search input */}
            <div className="p-4">
              <Input type="text" placeholder="Search users..." className="w-full" aria-label="Search users" />
            </div>

            {/* User list with staggered animation */}
            <div className="flex-1 overflow-y-auto">
              <h2 className="px-4 py-2 text-xs font-semibold uppercase text-muted-foreground">Recent Chats</h2>
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
                  />
                ))}
              </motion.ul>
            </div>

            {/* Current user profile section */}
            <div className="p-4 border-t flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                {data.currentUser.avatar}
              </div>
              <div className="ml-3">
                <p className="font-medium text-sm">{data.currentUser.name}</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
