import React, { useState, useEffect, useContext } from "react"
import { RECORD } from "../utils/interfaces"
import { AuthContext } from "../context/auth"
import {
  getFirestore,
  collection,
  query,
  where,
  startAfter,
  orderBy,
  getDocs,
  limit,
  Timestamp,
} from "firebase/firestore"
import { useIonToast } from "@ionic/react"

function useHistory() {
  const [recordsArr, setRecordsArr] = useState<RECORD[]>([])
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false)
  const [checkboxVisible, setCheckboxVisible] = useState(false)

  const [present, dismiss] = useIonToast()

  const { records, currentUser } = useContext(AuthContext)

  const ref = collection(getFirestore(), "records")

  const loadMoreRecords = async (event?: any) => {
    try {
      const q = query(
        ref,
        where("uid", "==", currentUser?.uid),
        orderBy("submittedOn", "desc"),
        startAfter(
          recordsArr[recordsArr.length - 1]?.submittedOn || Timestamp.now()
        ),
        limit(10)
      )
      const data = await getDocs(q)
      data.docs.forEach((item) =>
        setRecordsArr((recordsArr) => [...recordsArr, item.data() as RECORD])
      )
      event?.target.complete()
    } catch (error) {
      console.error(error)
    }
  }

  const toggleCheckboxVisible = () => setCheckboxVisible(!checkboxVisible)

  const deleteRecords = async () => {
    try {
    } catch (error: any) {
      present({
        message: error?.message || "Something went wrong",
        mode: "ios",
        color: "danger",
        duration: 2000,
      })
    }
  }
  useEffect(() => {
    loadMoreRecords()
  }, [])

  return {
    recordsArr,
    isInfiniteDisabled,
    loadMoreRecords,
    checkboxVisible,
    toggleCheckboxVisible,
    deleteRecords,
  }
}

export { useHistory }
