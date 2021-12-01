import React, { useState } from "react"

function useNearbyStations() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return {
    menuOpen,
    toggleMenu,
  }
}

export { useNearbyStations }
