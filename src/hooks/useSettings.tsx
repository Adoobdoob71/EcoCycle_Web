import React, { useContext, useEffect, useState } from "react"
import { signOut, getAuth } from "firebase/auth"
import { useIonToast } from "@ionic/react"
import { ToggleChangeEventDetail, CheckboxChangeEventDetail } from "@ionic/core"
import { ThemeContext } from "../context/theme"

function useSettings() {
  const { isThemeDark, toggleTheme } = useContext(ThemeContext)
  const [themeSwitchChecked, setThemeSwitchChecked] = useState(isThemeDark)
  const [saveHistoryChecked, setSaveHistoryChecked] = useState(true)
  const [present, dismiss] = useIonToast()

  const signOutOfAccount = async () => {
    await signOut(getAuth())
  }

  const onThemeSwitchChange = (event: CustomEvent<ToggleChangeEventDetail>) => {
    if (event.detail.checked === isThemeDark) toggleTheme()
    setThemeSwitchChecked(event.detail.checked)
  }

  const readSaveHistory = () => {
    const data = localStorage.getItem("save_search_history")
    if (data) {
      const parsed = JSON.parse(data)
      setSaveHistoryChecked(parsed)
    }
  }

  const saveHistoryChange = (
    event: CustomEvent<CheckboxChangeEventDetail<any>>
  ) => {
    setSaveHistoryChecked(event.detail.checked)
    localStorage.setItem(
      "save_search_history",
      JSON.stringify(event.detail.checked)
    )
  }

  const clearSearchHistory = () => {
    try {
      localStorage.removeItem("query_history")
      present({
        message: "Successfully cleared",
        mode: "ios",
        color: "success",
        duration: 2000,
      })
    } catch (error) {
      console.error(error)
      present({
        message: "Something went wrong",
        mode: "ios",
        color: "danger",
        duration: 2000,
      })
    }
  }

  useEffect(() => {
    readSaveHistory()
  }, [])

  return {
    themeSwitchChecked,
    signOutOfAccount,
    onThemeSwitchChange,
    saveHistoryChecked,
    saveHistoryChange,
    clearSearchHistory,
  }
}

export { useSettings }
