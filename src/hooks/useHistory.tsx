import React, { useState, useEffect, useContext } from "react"
import { RECORD } from "../utils/interfaces"
import { AuthContext } from "../context/auth"
import {
  getFirestore,
  collection,
  doc,
  query,
  where,
  startAfter,
  orderBy,
  getDocs,
  limit,
  Timestamp,
  deleteDoc,
} from "firebase/firestore"
import { useIonToast } from "@ionic/react"

function useHistory() {
  const [recordsArr, setRecordsArr] = useState<RECORD[]>([])
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false)
  const [checkboxVisible, setCheckboxVisible] = useState(false)
  const [checkedIds, setCheckedIds] = useState<{ id?: string }[]>([])
  const [loadingDelete, setLoadingDelete] = useState(false)

  const [present, dismiss] = useIonToast()

  const { currentUser } = useContext(AuthContext)

  const ref = collection(getFirestore(), "records")

  const loadMoreRecords = async (event?: any) => {
    try {
      const q = query(
        ref,
        where("uid", "==", currentUser?.uid),
        orderBy("submittedOn", "desc"),
        limit(10),
        startAfter(
          recordsArr[recordsArr.length - 1]?.submittedOn || Timestamp.now()
        )
      )
      const data = await getDocs(q)
      data.docs.forEach((item) =>
        setRecordsArr((recordsArr) => [
          ...recordsArr,
          { ...item.data(), id: item.id } as RECORD,
        ])
      )
      event?.target?.complete()
    } catch (error) {
      console.error(error)
    }
  }

  const toggleCheckboxVisible = () => setCheckboxVisible(!checkboxVisible)

  const deleteRecords = async () => {
    try {
      setLoadingDelete(true)
      setCheckboxVisible(false)
      if (checkedIds.length !== 0) {
        await Promise.all(
          checkedIds.map(
            async ({ id }) =>
              await deleteDoc(doc(getFirestore(), `records/${id}`))
          )
        )
        setRecordsArr([])
        present({
          message: "Record deleted successfully",
          mode: "ios",
          color: "success",
          duration: 2000,
        })
        await loadMoreRecords()
        setLoadingDelete(false)
      }
    } catch (error: any) {
      present({
        message: error?.message || "Something went wrong",
        mode: "ios",
        color: "danger",
        duration: 2000,
      })
    }
  }

  const addId = (id?: string) =>
    setCheckedIds((checkedIds) => [...checkedIds, { id: id }])

  const removeId = (id?: string) =>
    setCheckedIds((checkedIds) => checkedIds.filter((item) => item.id !== id))

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
    checkedIds,
    addId,
    removeId,
    loadingDelete,
  }
}

export { useHistory }
