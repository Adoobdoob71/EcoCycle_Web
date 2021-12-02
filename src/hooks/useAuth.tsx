import React, { useEffect, useState } from "react"
import { getAuth, User, onAuthStateChanged } from "firebase/auth"
import {
  orderBy,
  onSnapshot,
  getFirestore,
  query,
  where,
  collection,
  limit,
  Timestamp,
} from "firebase/firestore"
import { RECORD } from "../utils/interfaces"
import { DateTime } from "luxon"
import { orderRecordArray } from "../utils/functions"
import { DAYS_TO_LOAD } from "../utils/constants"

function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [records, setRecords] = useState<RECORD[]>([])
  const [recycledTotal, setRecycledTotal] = useState(0)
  const [convertedRecords, setConvertedRecords] = useState<
    { items: number; date: Timestamp }[] | undefined
  >(undefined)

  const auth = getAuth()

  const updateUser = async (newUser: User) => setCurrentUser(newUser)

  useEffect(() => {
    setLoading(true)
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          ...user,
          email: user.providerData[0].email,
        })
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })
    return () => unsubAuth()
  }, [])

  useEffect(() => {
    if (currentUser) {
      const ref = collection(getFirestore(), "records")
      const date = DateTime.now()
        .minus({ days: DAYS_TO_LOAD })
        .startOf("day")
        .toJSDate()
      const refQuery = query(
        ref,
        orderBy("submittedOn", "desc"),
        where("uid", "==", currentUser?.uid),
        where("submittedOn", ">", Timestamp.fromDate(date))
      )
      const timestamp = Timestamp.fromDate(
        DateTime.now().startOf("day").toJSDate()
      )
      const unsubFirestore = onSnapshot(refQuery, (value) => {
        setRecords([])
        setRecycledTotal(0)
        value.docs.reverse().forEach((item) => {
          setRecords((records) => [...records, item.data() as RECORD])
          if (timestamp.toMillis() < item.data().submittedOn.toMillis())
            setRecycledTotal(
              (recycledTotal) => recycledTotal + item.data().items
            )
        })
      })
      return () => unsubFirestore()
    }
  }, [currentUser])

  useEffect(() => {
    setConvertedRecords(orderRecordArray(records))
  }, [records])

  const authObj = {
    auth,
    currentUser,
    updateUser,
    records,
    recycledTotal,
    convertedRecords,
  }

  return {
    currentUser,
    auth,
    updateUser,
    authObj,
    records,
    recycledTotal,
    convertedRecords,
    loading,
  }
}

export { useAuth }
