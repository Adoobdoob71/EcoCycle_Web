import React, { FC, useContext } from "react"
import { IonContent, IonPage, IonText, IonButton, IonIcon } from "@ionic/react"
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
import { AuthContext } from "../../context/auth"
import { useDimensions } from "../../hooks/useDimensions"
import { logoGithub, logoGoogle } from "ionicons/icons"
import "./SignIn.css"

const SignIn: FC = () => {
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

  const { height } = useDimensions()

  return (
    <IonPage>
      <IonContent>
        <div
          className="column"
          style={{
            height: height,
            justifyContent: "space-around",
            alignItems: "center",
          }}>
          <div
            className="row"
            style={{
              alignItems: "center",
            }}>
            <IonText color="dark">
              <span style={{ fontSize: 24, marginRight: 4 }}>Sign into</span>
            </IonText>
            <IonText color="primary">
              <span style={{ fontSize: 24, fontWeight: "bold" }}>EcoCycle</span>
            </IonText>
          </div>
          <div className="column">
            <IonButton
              onClick={signInGoogle}
              style={{ marginBottom: 8 }}
              shape="round"
              fill="outline"
              color="primary">
              <IonIcon icon={logoGoogle} style={{ marginRight: 8 }} />
              Sign In With Google
            </IonButton>
            <IonButton
              onClick={signInGithub}
              shape="round"
              fill="outline"
              color="secondary">
              <IonIcon icon={logoGithub} style={{ marginRight: 8 }} />
              Sign In With Github
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default SignIn
