import React, { useContext, useEffect, useState } from "react"
import {
  getFirestore,
  getDocs,
  getDoc,
  query,
  where,
  collection,
  doc,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore"
import { AuthContext } from "../context/auth"
import { USER } from "../utils/interfaces"

function useFriends() {
  const [friends, setFriends] = useState<USER[]>([])
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false)

  const { currentUser } = useContext(AuthContext)

  const ref = collection(getFirestore(), "following")

  const loadFriends = async (event?: any) => {
    try {
      setFriends([])
      const q = query(
        ref,
        orderBy("timestamp", "asc"),
        where("followerUID", "==", currentUser?.uid),
        limit(10)
      )
      const result = await getDocs(q)
      Promise.all(
        result.docs.map(async (item) => {
          const followedData = await getDoc(
            doc(getFirestore(), "users", item.data().followedUID)
          )
          setFriends((friends) => [...friends, followedData.data() as USER])
        })
      )
      event?.target?.complete()
    } catch (error) {
      console.error(error)
    }
  }

  const loadMore = async (event: any) => {
    try {
      const q = query(
        ref,
        orderBy("timestamp", "asc"),
        startAfter(friends[friends.length - 1].joinedOn),
        limit(10)
      )
      const result = await getDocs(q)
      Promise.all(
        result.docs.map(async (item) => {
          const followedData = await getDoc(
            doc(getFirestore(), "users", item.data().followedUID)
          )
          setFriends((friends) => [...friends, followedData.data() as USER])
        })
      )
      event?.target?.complete()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadFriends()
  }, [])

  return { friends, isInfiniteDisabled, loadFriends, loadMore }
}

export { useFriends }
