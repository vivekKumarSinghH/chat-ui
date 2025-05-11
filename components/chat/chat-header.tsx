"use client"

import { cn } from "@/lib/utils"
import { Phone, Video, MoreVertical } from "lucide-react"
import Avatar from "@/components/chat/avatar"
import IconButton from "@/components/chat/icon-button"
import type { ChatData } from "@/types/chat"
import type { ThemeColors } from "@/types/theme"

interface ChatHeaderProps {
  data: ChatData
  selectedUser: number
  theme: "light" | "dark"
  currentTheme: ThemeColors
  getAvatarGradient: (userId: number) => string
}

export default function ChatHeader({ data, selectedUser, theme, currentTheme, getAvatarGradient }: ChatHeaderProps) {
  const selectedUserData = data.users.find((u) => u.id === selectedUser)

  return (
    <div
      className={cn(
        "h-16 border-b flex items-center justify-between px-4 md:px-6 backdrop-blur-sm",
        currentTheme.header,
        currentTheme.border,
      )}
    >
      <div className="flex items-center">
        <Avatar userId={selectedUser} showStatus={true} data={data} getAvatarGradient={getAvatarGradient} />
        <div className="ml-3">
          <p className="font-medium">{selectedUserData?.name || "User"}</p>
          <p className={cn("text-xs", currentTheme.textSecondary)}>
            {selectedUserData?.online ? "Online" : `Last seen ${selectedUserData?.lastSeen}`}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <IconButton icon={<Phone size={18} />} label="Voice call" className={currentTheme.hover} />
        <IconButton icon={<Video size={18} />} label="Video call" className={currentTheme.hover} />
        <IconButton icon={<MoreVertical size={18} />} label="More options" className={currentTheme.hover} />
      </div>
    </div>
  )
}
