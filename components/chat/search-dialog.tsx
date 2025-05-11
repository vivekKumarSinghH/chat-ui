"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowUp, ArrowDown } from "lucide-react"
import type { ChatData, Message } from "@/types/chat"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: ChatData
  selectedUser: number
}

export default function SearchDialog({ open, onOpenChange, data, selectedUser }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Message[]>([])
  const [currentResultIndex, setCurrentResultIndex] = useState(0)

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    const messages = data.conversations[selectedUser] || []
    const results = messages.filter((message) => message.message.toLowerCase().includes(searchQuery.toLowerCase()))

    setSearchResults(results)
    setCurrentResultIndex(0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const navigateResults = (direction: "next" | "prev") => {
    if (searchResults.length === 0) return

    if (direction === "next") {
      setCurrentResultIndex((prev) => (prev + 1) % searchResults.length)
    } else {
      setCurrentResultIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length)
    }
  }

  const selectedUserData = data.users.find((u) => u.id === selectedUser)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search in Conversation</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={handleSearch} size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {searchResults.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {currentResultIndex + 1} of {searchResults.length} results
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => navigateResults("prev")}
                    disabled={searchResults.length <= 1}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => navigateResults("next")}
                    disabled={searchResults.length <= 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto rounded-md border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">
                    {searchResults[currentResultIndex].sender === data.currentUser.id
                      ? data.currentUser.avatar.charAt(0)
                      : selectedUserData?.avatar.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">
                    {searchResults[currentResultIndex].sender === data.currentUser.id ? "You" : selectedUserData?.name}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {searchResults[currentResultIndex].timestamp}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap break-words">{searchResults[currentResultIndex].message}</p>
              </div>
            </div>
          )}

          {searchQuery && searchResults.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">No results found for "{searchQuery}"</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
