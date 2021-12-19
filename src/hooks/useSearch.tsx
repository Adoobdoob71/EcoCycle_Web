import React, { useState, useEffect, KeyboardEvent } from "react"
import {
  collection,
  getFirestore,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore"
import { NEWS, USER } from "../utils/interfaces"
import { InputChangeEventDetail } from "@ionic/core"
import { useHistory } from "react-router-dom"

function useSearch() {
  const [users, setUsers] = useState<USER[]>([])
  const [items, setItems] = useState([])
  const [news, setNews] = useState<NEWS[]>([])
  const [queryString, setQueryString] = useState<string | null | undefined>("")
  const [queryHistory, setQueryHistory] = useState<
    (string | undefined | null)[]
  >([])

  const history = useHistory()

  const loadUsers = async () => {
    if (queryString?.length !== 0) {
      const lowerCase = queryString?.toLocaleLowerCase()
      const ref = collection(getFirestore(), "users")
      const q = query(
        ref,
        where("queryName", ">=", lowerCase),
        where("queryName", "<=", lowerCase + "\uf8ff"),
        limit(5)
      )
      setUsers([])
      const results = await getDocs(q)
      results.docs.forEach((item) =>
        setUsers((users) => [...users, item.data() as USER])
      )
    }
  }

  const loadItems = async () => {}

  const onChangeQuery = (event: CustomEvent<InputChangeEventDetail>) =>
    setQueryString(event.detail.value)

  const submitSearch = (event: KeyboardEvent<HTMLIonInputElement>) => {
    if (event.key === "Enter" && queryString?.length !== 0) {
      saveSearchQuery()
      history.push(`/search/${queryString}`)
    }
  }

  const readSearchHistory = () => {
    const qryHistory = localStorage.getItem("query_history")
    if (qryHistory) setQueryHistory(JSON.parse(qryHistory))
  }

  const deleteSearchQuery = (q: string | undefined | null) => {
    setQueryHistory((queryHistory) => {
      const filteredHistory = queryHistory.filter((item) => item !== q)
      localStorage.setItem("query_history", JSON.stringify(filteredHistory))
      return filteredHistory
    })
  }

  const saveSearchQuery = () => {
    setQueryHistory((queryHistory) => {
      const saveSearchHistory = localStorage.getItem("save_search_history")
      const parsedData = JSON.parse(
        saveSearchHistory ? saveSearchHistory : "true"
      )
      const found = queryHistory.some((item) => item === queryString?.trim())
      if (!found && parsedData === true) {
        localStorage.setItem(
          "query_history",
          JSON.stringify([...queryHistory, queryString])
        )
        return [...queryHistory, queryString]
      }
      return queryHistory
    })
  }

  useEffect(() => {
    readSearchHistory()
  }, [])

  useEffect(() => {
    loadUsers()
    loadItems()
  }, [queryString])

  return {
    users,
    queryString,
    onChangeQuery,
    items,
    submitSearch,
    queryHistory,
    deleteSearchQuery,
  }
}

export { useSearch }
