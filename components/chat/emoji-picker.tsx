"use client"

import { motion } from "framer-motion"

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
  onClose: () => void
}

export default function EmojiPicker({ onEmojiSelect, onClose }: EmojiPickerProps) {
  // Common emojis for the picker
  const emojis = [
    "😊",
    "👍",
    "❤️",
    "🎉",
    "🔥",
    "😂",
    "🙌",
    "👏",
    "🤔",
    "👋",
    "✅",
    "⭐",
    "🎯",
    "💯",
    "🙏",
    "👀",
    "💪",
    "🚀",
    "🌟",
    "💡",
  ]

  return (
    <motion.div
      className="absolute bottom-20 left-4 p-3 rounded-lg shadow-lg grid grid-cols-5 gap-2 z-10 bg-background border"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      role="dialog"
      aria-label="Emoji picker"
    >
      {emojis.map((emoji) => (
        <motion.button
          key={emoji}
          className="text-xl p-2 hover:bg-muted rounded"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            onEmojiSelect(emoji)
            onClose()
          }}
          aria-label={`Insert ${emoji} emoji`}
        >
          {emoji}
        </motion.button>
      ))}
    </motion.div>
  )
}
