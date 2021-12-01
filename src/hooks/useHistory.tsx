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
} from "firebase/firestore"

function useHistory() {
  const [recordsArr, setRecordsArr] = useState<RECORD[]>([])
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false)
  const [checkboxVisible, setCheckboxVisible] = useState(false)

  const { records, currentUser } = useContext(AuthContext)

  const ref = collection(getFirestore(), "records")

  const loadMoreRecords = async (event?: any) => {
    try {
      const q = query(
        ref,
        where("uid", "==", currentUser?.uid),
        startAfter(recordsArr[recordsArr.length - 1]),
        orderBy("submittedOn", "desc"),
        limit(5)
      )
      const data = await getDocs(q)
      data.docs.forEach((item) =>
        setRecordsArr((recordsArr) => [...recordsArr, item.data() as RECORD])
      )

      event.target.complete()
    } catch (error) {
      console.error(error)
    }
  }

  const toggleCheckboxVisible = () => setCheckboxVisible(!checkboxVisible)

  useEffect(() => {
    setRecordsArr(records)
  }, [])

  return {
    recordsArr,
    isInfiniteDisabled,
    loadMoreRecords,
    checkboxVisible,
    toggleCheckboxVisible,
  }
}

export { useHistory }
