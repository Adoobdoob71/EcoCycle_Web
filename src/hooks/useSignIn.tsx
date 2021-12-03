import React, { FC, useContext, useState } from "react"
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth"
import {
  setDoc,
  getFirestore,
  doc,
  Timestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore"
import { AuthContext } from "../context/auth"

function useSignIn() {
  const { auth } = useContext(AuthContext)
  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()
  googleProvider.addScope("https://www.googleapis.com/auth/userinfo.email")
  githubProvider.addScope("user:email")

  const signInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const exists = await getDoc(doc(getFirestore(), "users", result.user.uid))
      console.log(result.user)
      if (exists.exists())
        await updateDoc(doc(getFirestore(), "users", result.user.uid), {
          email: result.user.providerData[0].email,
          photoURL: result.user.photoURL,
          displayName: result.user.displayName,
        })
      else
        await setDoc(doc(getFirestore(), "users", result.user.uid), {
          email: result.user.providerData[0].email,
          photoURL: result.user.photoURL,
          displayName: result.user.displayName,
          uid: result.user.uid,
          joinedOn: Timestamp.now(),
        })
    } catch (error) {
      console.error(error)
    }
  }

  const signInGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider)
      const exists = await getDoc(doc(getFirestore(), "users", result.user.uid))
      if (exists.exists())
        await updateDoc(doc(getFirestore(), "users", result.user.uid), {
          email: result.user.providerData[0].email,
          photoURL: result.user.photoURL,
          displayName: result.user.displayName,
        })
      else
        await setDoc(doc(getFirestore(), "users", result.user.uid), {
          email: result.user.providerData[0].email,
          photoURL: result.user.photoURL,
          displayName: result.user.displayName,
          uid: result.user.uid,
          joinedOn: Timestamp.now(),
        })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    auth,
    googleProvider,
    githubProvider,
    signInGoogle,
    signInGithub,
  }
}

export { useSignIn }
