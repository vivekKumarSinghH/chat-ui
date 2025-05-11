export interface User {
  id: number
  name: string
  avatar: string
  online: boolean
  lastSeen: string
}

export interface Message {
  id: number
  sender: number
  message: string
  timestamp: string
}

export interface ChatData {
  currentUser: User
  users: User[]
  conversations: Record<number, Message[]>
}
