"use client"

import { useState } from "react"
import { Phone, Video, MoreVertical, User, Search, BellOff, ShieldAlert, Flag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import CallDialog from "@/components/chat/call-dialog"
import type { ChatData } from "@/types/chat"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SearchDialog from "@/components/chat/search-dialog"
import ProfileDialog from "@/components/chat/profile-dialog"

interface ChatHeaderProps {
  data: ChatData
  selectedUser: number
  clearChatHistory: (userId: number) => void
}

export default function ChatHeader({ data, selectedUser, clearChatHistory }: ChatHeaderProps) {
  const { toast } = useToast()
  const [callDialogOpen, setCallDialogOpen] = useState(false)
  const [callType, setCallType] = useState<"voice" | "video">("voice")
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [profileDialogOpen, setProfileDialogOpen] = useState(false)

  const selectedUserData = data.users.find((u) => u.id === selectedUser)

  const handleVoiceCall = () => {
    setCallType("voice")
    setCallDialogOpen(true)
    toast({
      title: "Voice Call Initiated",
      description: `Calling ${selectedUserData?.name}...`,
    })
  }

  const handleVideoCall = () => {
    setCallType("video")
    setCallDialogOpen(true)
    toast({
      title: "Video Call Initiated",
      description: `Video calling ${selectedUserData?.name}...`,
    })
  }

  const handleMoreAction = (action: string) => {
    switch (action) {
      case "view-profile":
        setProfileDialogOpen(true)
        break
      case "search":
        setSearchDialogOpen(true)
        break
      case "mute":
        toast({
          title: "Notifications Muted",
          description: `You won't receive notifications from ${selectedUserData?.name}`,
        })
        break
      case "block":
        toast({
          title: "User Blocked",
          description: `${selectedUserData?.name} has been blocked`,
          variant: "destructive",
        })
        break
      case "report":
        toast({
          title: "User Reported",
          description: `${selectedUserData?.name} has been reported`,
          variant: "destructive",
        })
        break
      case "clear":
        toast({
          title: "Chat Cleared",
          description: "Chat history has been cleared",
        })
        // Actually clear the chat history
        if (selectedUserData) {
          const userId = selectedUserData.id
          clearChatHistory(userId)
        }
        break
      default:
        break
    }
  }

  return (
    <>
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
          <Button variant="ghost" size="icon" aria-label="Voice call" onClick={handleVoiceCall}>
            <Phone size={18} />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Video call" onClick={handleVideoCall}>
            <Video size={18} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="More options">
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Conversation Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleMoreAction("view-profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>View Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMoreAction("search")}>
                <Search className="mr-2 h-4 w-4" />
                <span>Search in Conversation</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMoreAction("mute")}>
                <BellOff className="mr-2 h-4 w-4" />
                <span>Mute Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleMoreAction("block")}
                className="text-amber-600 dark:text-amber-400"
              >
                <ShieldAlert className="mr-2 h-4 w-4" />
                <span>Block User</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleMoreAction("report")}
                className="text-amber-600 dark:text-amber-400"
              >
                <Flag className="mr-2 h-4 w-4" />
                <span>Report User</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleMoreAction("clear")} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Clear Chat History</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CallDialog open={callDialogOpen} onOpenChange={setCallDialogOpen} user={selectedUserData} callType={callType} />

      <SearchDialog
        open={searchDialogOpen}
        onOpenChange={setSearchDialogOpen}
        data={data}
        selectedUser={selectedUser}
      />

      <ProfileDialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen} user={selectedUserData} />
    </>
  )
}
