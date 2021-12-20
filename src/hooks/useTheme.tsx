import { useEffect, useState } from "react"

const useTheme = () => {
  const [isThemeDark, setIsThemeDark] = useState(false)

  const toggleTheme = () => {
    document.body.setAttribute("color-theme", isThemeDark ? "light" : "dark")
    localStorage.setItem("color-theme", isThemeDark ? "light" : "dark")
    document
      .getElementsByName("theme-color")
      .item(0)
      .setAttribute("content", isThemeDark ? "#FFFFFF" : "#1f1f1f")
    setIsThemeDark(!isThemeDark)
  }

  useEffect(() => {
    const colorTheme = localStorage.getItem("color-theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)")
    if (colorTheme) {
      if (colorTheme === "dark") {
        setIsThemeDark(true)
        document.body.setAttribute("color-theme", "dark")
      } else {
        document
          .getElementsByName("theme-color")
          .item(0)
          .setAttribute("content", "#FFFFFF")

        document
          .getElementsByName("apple-mobile-web-app-status-bar-style")
          .item(0)
          .setAttribute("content", "#FFFFFF")
      }
    } else {
      setIsThemeDark(prefersDark.matches)
      document.body.setAttribute(
        "color-theme",
        prefersDark.matches ? "dark" : "light"
      )
    }

    prefersDark.addEventListener("change", (event) => {
      setIsThemeDark(event.matches)
      document.body.setAttribute(
        "color-theme",
        event.matches ? "dark" : "light"
      )
      document
        .getElementsByName("theme-color")
        .item(0)
        .setAttribute("content", event.matches ? "#1f1f1f" : "#FFFFFF")
      document
        .getElementsByName("apple-mobile-web-app-status-bar-style")
        .item(0)
        .setAttribute("content", event.matches ? "#1f1f1f" : "#FFFFFF")
    })
  }, [])

  const themeObj = {
    isThemeDark,
    toggleTheme,
  }

  return { isThemeDark, toggleTheme, themeObj }
}

export { useTheme }
