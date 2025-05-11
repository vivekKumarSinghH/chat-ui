export interface ThemeGradients {
  primary: string
  secondary: string
  tertiary: string
  success: string
  warning: string
  danger: string
}

export interface ThemeColors {
  bg: string
  sidebar: string
  header: string
  text: string
  textSecondary: string
  input: string
  hover: string
  border: string
  messageBg: string
}

export interface ColorScheme {
  gradients: ThemeGradients
  light: ThemeColors
  dark: ThemeColors
}
