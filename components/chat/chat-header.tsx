"use client"

import { Phone, Video, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ChatData } from "@/types/chat"

interface ChatHeaderProps {
  data: ChatData
  selectedUser: number
}

export default function ChatHeader({ data, selectedUser }: ChatHeaderProps) {
  const selectedUserData = data.users.find((u) => u.id === selectedUser)

  return (
    <div className="h-16 border-b flex items-center justify-between px-4 md:px-6 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
            {selectedUserData?.avatar}
          </div>
          {selectedUserData?.online && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
          )}
        </div>
        <div className="ml-3">
          <p className="font-medium">{selectedUserData?.name || "User"}</p>
          <p className="text-xs text-muted-foreground">
            {selectedUserData?.online ? "Online" : `Last seen ${selectedUserData?.lastSeen}`}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" aria-label="Voice call">
          <Phone size={18} />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Video call">
          <Video size={18} />
        </Button>
        <Button variant="ghost" size="icon" aria-label="More options">
          <MoreVertical size={18} />
        </Button>
      </div>
    </div>
  )
}
