"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Phone, Video, Mail, MapPin, Calendar, Clock } from "lucide-react"
import type { User } from "@/types/chat"

interface ProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | undefined
}

export default function ProfileDialog({ open, onOpenChange, user }: ProfileDialogProps) {
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-medium mb-4">
            {user.avatar}
          </div>
          <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
          <p className="text-sm text-muted-foreground mb-6">{user.online ? "Online" : `Last seen ${user.lastSeen}`}</p>

          <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-6">
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Video className="h-4 w-4" />
              <span>Video</span>
            </Button>
          </div>

          <div className="w-full space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{user.name.toLowerCase().replace(" ", ".")}@example.com</p>
                <p className="text-xs text-muted-foreground">Email</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">San Francisco, CA</p>
                <p className="text-xs text-muted-foreground">Location</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Joined January 2023</p>
                <p className="text-xs text-muted-foreground">Member since</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{user.online ? "Active now" : `Active ${user.lastSeen}`}</p>
                <p className="text-xs text-muted-foreground">Activity</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
