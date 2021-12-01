import React, { useEffect, useState } from "react"
import { USER } from "../../utils/interfaces"
import {
  getFirestore,
  query,
  getDocs,
  where,
  limit,
  collection,
  orderBy,
  startAfter,
} from "firebase/firestore"

function useResultsUsers(queryString: string) {
  const [users, setUsers] = useState<USER[]>([])
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false)

  const ref = collection(getFirestore(), "users")

  const getUsers = async () => {
    try {
      const q = query(
        ref,
        where("displayName", ">=", queryString),
        where("displayName", "<=", queryString + "\uf8ff"),
        limit(10)
      )
      const data = await getDocs(q)
      data.docs.forEach((item) =>
        setUsers((users) => [...users, item.data() as USER])
      )
    } catch (error) {
      console.error(error)
    }
  }

  const loadMore = async (event: any) => {
    try {
      const q = query(
        ref,
        orderBy("timestamp", "asc"),
        startAfter(users[users.length - 1]),
        limit(10)
      )
      const result = await getDocs(q)
      result.docs.forEach((item) =>
        setUsers((users) => [...users, item.data() as USER])
      )
      event.target.complete()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return {
    users,
    loadMore,
    isInfiniteDisabled,
  }
}

export { useResultsUsers }
