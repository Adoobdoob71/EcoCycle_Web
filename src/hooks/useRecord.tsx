import React, { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../context/auth"
import { addDoc, collection, getFirestore, Timestamp } from "firebase/firestore"
import { RECORD } from "../utils/interfaces"
import { useIonToast } from "@ionic/react"

function useRecord() {
  const [recordValue, setRecordValue] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const [present, dismiss] = useIonToast()

  const { currentUser, records, recycledTotal, convertedRecords } =
    useContext(AuthContext)

  const decrementRecord = () => setRecordValue((recordValue) => recordValue - 1)

  const incrementRecord = () => setRecordValue((recordValue) => recordValue + 1)

  const decrementDisabled = recordValue === 0

  const isMountRef = useRef(false)

  const addRecordToDb = async () => {
    try {
      setError(null)
      setLoading(true)
      if (currentUser) {
        const ref = collection(getFirestore(), "records")
        const record: RECORD = {
          uid: currentUser.uid,
          items: recordValue,
          submittedOn: Timestamp.now(),
        }
        await addDoc(ref, record)
        setRecordValue(0)
      }
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (error)
      present({
        message: error,
        mode: "ios",
        color: "error",
        duration: 3000,
      })
  }, [error])

  useEffect(() => {
    if (isMountRef.current) {
      if (loading)
        present({
          message: "Loading...",
          mode: "ios",
          duration: 3000,
        })

      if (!loading && !error) {
        dismiss()
        setTimeout(
          () =>
            present({
              message: "Recorded successfully",
              color: "success",
              mode: "ios",
              duration: 3000,
            }),
          500
        )
      }
    }
  }, [loading])

  useEffect(() => {
    isMountRef.current = true
  }, [])

  return {
    recordValue,
    records,
    decrementRecord,
    incrementRecord,
    decrementDisabled,
    addRecordToDb,
    loading,
    error,
    recycledTotal,
    convertedRecords,
  }
}

export { useRecord }
