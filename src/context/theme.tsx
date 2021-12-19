import { createContext } from "react"

const ThemeContext = createContext<{
  isThemeDark: boolean
  toggleTheme: () => void
}>({
  isThemeDark: false,
  toggleTheme: () => {},
})

export { ThemeContext }
