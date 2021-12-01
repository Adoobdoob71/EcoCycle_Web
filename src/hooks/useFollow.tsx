import React, { useEffect, useState } from "react"
import {
  getFirestore,
  getDocs,
  setDoc,
  collection,
  doc,
  query,
  where,
  Timestamp,
} from "firebase/firestore"

function useFollow(followerUID?: string, followedUID?: string) {
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [followingStatus, setFollowingStatus] = useState(false)
  const ref = collection(getFirestore(), "following")

  const toggleStatus = async () => {
    if (followerUID && followedUID) {
      setLoadingStatus(true)
      const document = doc(
        getFirestore(),
        "following",
        `${followerUID + followedUID}`
      )

      if (followingStatus)
        await setDoc(document, {
          followerUID: followerUID,
          followedUID: followedUID,
          status: !followingStatus,
        })
      else
        await setDoc(document, {
          followerUID: followerUID,
          followedUID: followedUID,
          status: !followingStatus,
          timestamp: Timestamp.now(),
        })

      setFollowingStatus(!followingStatus)
      setLoadingStatus(false)
    }
  }

  useEffect(() => {
    if (followerUID && followedUID && followerUID !== followedUID) {
      const q = query(
        ref,
        where("followerUID", "==", followerUID),
        where("followedUID", "==", followedUID)
      )
      getDocs(q)
        .then((result) => {
          if (result.docs.length !== 0)
            setFollowingStatus(result.docs[0].data().status)
          setLoadingStatus(false)
        })
        .catch((error) => console.error(error))
    }
  }, [])

  return {
    loadingStatus,
    followingStatus,
    toggleStatus,
  }
}

export { useFollow }
