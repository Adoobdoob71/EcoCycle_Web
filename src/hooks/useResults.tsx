import React, { useState } from "react"

function useResults(query: string) {
  const [activeTab, setActiveTab] = useState(0)

  const onActiveTabChange = (index: number) => setActiveTab(index)

  return {
    activeTab,
    onActiveTabChange,
  }
}

export { useResults }
