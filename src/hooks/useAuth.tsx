import React, { useEffect, useState } from "react"
import { getAuth, User, onAuthStateChanged } from "firebase/auth"
import {
  orderBy,
  onSnapshot,
  getFirestore,
  query,
  where,
  collection,
  Timestamp,
  setDoc,
  doc,
  getDoc,
  updateDoc,
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
    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const exists = await getDoc(doc(getFirestore(), "users", user.uid))
        const user_data = await fetch(
          `https://api.github.com/user/${user.providerData[0].uid}`
        )
        const user_parsed = await user_data.json()
        if (exists.exists())
          await updateDoc(doc(getFirestore(), "users", user.uid), {
            email: user.providerData[0].email,
            photoURL: user.photoURL,
            displayName: user_parsed?.login,
            queryName: user_parsed?.login?.toLowerCase() || "",
          })
        else
          await setDoc(doc(getFirestore(), "users", user.uid), {
            email: user.providerData[0].email,
            photoURL: user.photoURL,
            displayName: user_parsed?.login,
            queryName: user_parsed?.login?.toLowerCase() || "",
            uid: user.uid,
            joinedOn: Timestamp.now(),
          })
        setCurrentUser({
          ...user,
          displayName: user_parsed?.login,
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
        value.docs
          .reverse()
          .forEach((item) =>
            setRecords((records) => [
              ...records,
              { ...item.data(), id: item.id } as RECORD,
            ])
          )
      })
      return () => unsubFirestore()
    }
  }, [currentUser])

  useEffect(() => {
    const convRecs = orderRecordArray(records)
    setConvertedRecords(convRecs)
    if (convRecs)
      setRecycledTotal(
        convRecs.reduce((prev, current) => prev + current.items, 0)
      )
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
