import React, { useContext, useEffect, useState } from "react"
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
import { useDimensions } from "./useDimensions"
import { USER, RECORD } from "../utils/interfaces"
import { AuthContext } from "../context/auth"
import { DateTime } from "luxon"
import { DAYS_TO_LOAD } from "../utils/constants"

interface FRIENDS extends USER {
  records: RECORD[]
}

function useHome() {
  const [friends, setFriends] = useState<FRIENDS[]>([])
  const [loading, setLoading] = useState(true)

  const { currentUser, records, recycledTotal, convertedRecords } =
    useContext(AuthContext)

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
          const ref = doc(getFirestore(), "users", item.data()?.followedUID)
          const data = await getDoc(ref)
          const refCollection = collection(getFirestore(), "records")
          const date = DateTime.now()
            .minus({ days: DAYS_TO_LOAD })
            .startOf("day")
            .toJSDate()
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
