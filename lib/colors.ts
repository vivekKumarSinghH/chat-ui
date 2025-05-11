import type { ColorScheme } from "@/types/theme"

// Modern color palette
export const colors: ColorScheme = {
  gradients: {
    primary: "from-violet-500 to-indigo-600",
    secondary: "from-fuchsia-500 to-purple-600",
    tertiary: "from-cyan-400 to-blue-500",
    success: "from-emerald-400 to-teal-500",
    warning: "from-amber-400 to-orange-500",
    danger: "from-rose-400 to-pink-600",
  },
  light: {
    bg: "bg-gray-100",
    sidebar: "bg-gradient-to-b from-white to-gray-50",
    header: "bg-white/80",
    text: "text-gray-900",
    textSecondary: "text-gray-500",
    input: "bg-gray-200",
    hover: "hover:bg-gray-200",
    border: "border-gray-200",
    messageBg: "bg-white",
  },
  dark: {
    bg: "bg-gray-950",
    sidebar: "bg-gradient-to-b from-gray-800 to-gray-900",
    header: "bg-gray-800/80",
    text: "text-gray-100",
    textSecondary: "text-gray-400",
    input: "bg-gray-700",
    hover: "hover:bg-gray-700",
    border: "border-gray-700",
    messageBg: "bg-gray-800",
  },
}
