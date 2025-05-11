import type { ChatData } from "@/types/chat"

// Initial data structure - storing everything in one object as requested
// Users and their messages are in a single data structure
export const initialData: ChatData = {
  currentUser: {
    id: 1,
    name: "You",
    avatar: "YO",
    online: true,
    lastSeen: "Just now",
  },
  users: [
    { id: 2, name: "John Doe", avatar: "JD", online: true, lastSeen: "Just now" },
    { id: 3, name: "Jane Smith", avatar: "JS", online: true, lastSeen: "Just now" },
    { id: 4, name: "Robert Johnson", avatar: "RJ", online: false, lastSeen: "2h ago" },
    { id: 5, name: "Emily Davis", avatar: "ED", online: false, lastSeen: "1d ago" },
    { id: 6, name: "Michael Wilson", avatar: "MW", online: true, lastSeen: "Just now" },
  ],
  // Conversations stored by user ID
  conversations: {
    2: [
      { id: 1, sender: 2, message: "Hey there! How's it going?", timestamp: "10:30 AM" },
      { id: 2, sender: 1, message: "I'm doing well, thanks for asking! How about you?", timestamp: "10:32 AM" },
      { id: 3, sender: 2, message: "Pretty good! Just working on that project we discussed.", timestamp: "10:33 AM" },
    ],
    3: [],
    4: [],
    5: [],
    6: [],
  },
}
