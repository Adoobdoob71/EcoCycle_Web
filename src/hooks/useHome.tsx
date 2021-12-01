import React, { useContext, useEffect, useState } from "react"
import { ItemReorderEventDetail } from "@ionic/core"
import {
  getFirestore,
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  orderBy,
  limit,
} from "firebase/firestore"
import { useLongPress } from "./useLongPress"
import { useDimensions } from "./useDimensions"
import { USER, RECORD } from "../utils/interfaces"
import { AuthContext } from "../context/auth"
import { DateTime } from "luxon"

interface FRIENDS extends USER {
  records: RECORD[]
}

function useHome() {
  const [friends, setFriends] = useState<FRIENDS[]>([])
  const [loading, setLoading] = useState(true)
  const [reorderDisabled, setReorderDisabled] = useState(true)
  let order = [1, 2, 3]

  const { currentUser, records, recycledTotal, convertedRecords } =
    useContext(AuthContext)

  const completeReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    let indexMoved = order.splice(event.detail.from, 1)[0]
    order.splice(event.detail.to, 0, indexMoved)
    event.detail.complete()
    localStorage.setItem("home_order", JSON.stringify(order))
  }

  const enableReorder = () => {
    setReorderDisabled(true)
    navigator.vibrate(50)
  }

  const disableReorder = () => setReorderDisabled(true)

  const onLongPress = useLongPress(
    reorderDisabled ? enableReorder : undefined,
    1000
  )

  const loadFriends = async () => {
    try {
      setLoading(true)
      setFriends([])
      const ref = collection(getFirestore(), "following")
      const q = query(
        ref,
        orderBy("timestamp", "asc"),
        where("followerUID", "==", currentUser?.uid),
        limit(3)
      )
      const result = await getDocs(q)
      Promise.all(
        result.docs.map(async (item) => {
          const followedData = await getDoc(
            doc(getFirestore(), "users", item.data().followedUID)
          )
          const ref = doc(getFirestore(), "users", item.data()?.followedUID)
          const data = await getDoc(ref)
          const refCollection = collection(getFirestore(), "records")
          const date = DateTime.now().startOf("day").toJSDate()
          const refQuery = query(
            refCollection,
            orderBy("submittedOn", "desc"),
            where("uid", "==", item.data()?.followedUID),
            where("submittedOn", ">", Timestamp.fromDate(date))
          )
          const recordsData = await getDocs(refQuery)
          const recordsDataParsed = recordsData.docs
            .reverse()
            .map((item) => item.data() as RECORD)
          setFriends((friends) => [
            ...friends,
            { ...(data.data() as USER), records: recordsDataParsed },
          ])
        })
      )
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadFriends()
  }, [currentUser])

  const { width } = useDimensions()

  return {
    reorderDisabled,
    completeReorder,
    enableReorder,
    disableReorder,
    onLongPress,
    records,
    width,
    currentUser,
    recycledTotal,
    convertedRecords,
    loading,
    loadFriends,
    friends,
  }
}

export { useHome }
