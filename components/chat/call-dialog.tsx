"use client"

import { useState } from "react"
import { Mic, MicOff, Camera, CameraOff, PhoneOff } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { User } from "@/types/chat"
import { cn } from "@/lib/utils"

interface CallDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | undefined
  callType: "voice" | "video"
}

export default function CallDialog({ open, onOpenChange, user, callType }: CallDialogProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [callTime, setCallTime] = useState("00:00")

  // In a real app, this would be connected to WebRTC or another calling service

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{callType === "voice" ? "Voice Call" : "Video Call"}</DialogTitle>
          <DialogDescription>
            {callType === "voice" ? "Voice calling" : "Video calling"} {user?.name}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6">
          {callType === "video" && (
            <div className="relative w-full h-48 mb-4 bg-muted rounded-lg overflow-hidden">
              {!isVideoOff ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-medium">
                    {user?.avatar}
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <CameraOff className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>
          )}

          <div
            className={cn(
              "w-24 h-24 rounded-full flex items-center justify-center text-3xl font-medium mb-4",
              callType === "voice" ? "bg-primary/10 text-primary" : "",
            )}
          >
            {user?.avatar}
          </div>

          <h3 className="text-lg font-medium mb-1">{user?.name}</h3>
          <p className="text-sm text-muted-foreground mb-6">{callTime}</p>

          <div className="flex space-x-4">
            {callType === "video" && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12"
                onClick={() => setIsVideoOff(!isVideoOff)}
              >
                {isVideoOff ? <Camera /> : <CameraOff />}
              </Button>
            )}

            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <Mic /> : <MicOff />}
            </Button>

            <Button
              variant="destructive"
              size="icon"
              className="rounded-full h-12 w-12"
              onClick={() => onOpenChange(false)}
            >
              <PhoneOff />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
