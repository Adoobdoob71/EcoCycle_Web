import React, { useEffect, useState } from "react"
import {
  getDoc,
  doc,
  getFirestore,
  collection,
  query,
  orderBy,
  where,
  Timestamp,
  getDocs,
} from "firebase/firestore"
import { USER, RECORD } from "../utils/interfaces"
import { DateTime } from "luxon"
import { useIonToast } from "@ionic/react"
import { RefresherEventDetail } from "@ionic/core"
import { orderRecordArray } from "../utils/functions"
import { DAYS_TO_LOAD } from "../utils/constants"

function useLoadUser(uid: string) {
  const [userData, setUserData] = useState<USER | null>(null)
  const [records, setRecords] = useState<RECORD[]>([])
  const [recycledTotal, setRecycledTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)
  const [present, dismiss] = useIonToast()
  const [convertedRecords, setConvertedRecords] = useState<
    { items: number; date: Timestamp }[] | undefined
  >(undefined)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async (event?: CustomEvent<RefresherEventDetail>) => {
    await loadUser()
    if (error)
      present({
        buttons: [{ text: "Hide", handler: () => dismiss() }],
        message: error.message,
      })
    event?.detail.complete()
  }

  const loadUser = async () => {
    try {
      setLoading(true)
      setRecords([])
      setRecycledTotal(0)
      const ref = doc(getFirestore(), "users", uid)
      const data = await getDoc(ref)
      const refCollection = collection(getFirestore(), "records")
      const date = DateTime.now()
        .minus({ days: DAYS_TO_LOAD })
        .startOf("day")
        .toJSDate()
      const refQuery = query(
        refCollection,
        orderBy("submittedOn", "desc"),
        where("uid", "==", uid),
        where("submittedOn", ">", Timestamp.fromDate(date))
      )
      setUserData(data.data() as USER)
      const recordsData = await getDocs(refQuery)
      recordsData.docs
        .reverse()
        .forEach((item) =>
          setRecords((records) => [...records, item.data() as RECORD])
        )
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    const convRecs = orderRecordArray(records)
    setConvertedRecords(convRecs)
    if (convRecs)
      setRecycledTotal(
        convRecs.reduce((prev, current) => prev + current.items, 0)
      )
  }, [records])

  return {
    userData,
    loading,
    loadUser,
    error,
    records,
    recycledTotal,
    loadProfile,
    convertedRecords,
  }
}

export { useLoadUser }
