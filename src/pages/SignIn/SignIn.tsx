import React, { FC, useContext } from "react"
import {
  IonContent,
  IonPage,
  IonText,
  IonButton,
  IonIcon,
  IonInput,
} from "@ionic/react"
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
import { useSignIn } from "../../hooks/useSignIn"
import { Helmet } from "react-helmet"
import { useTheme } from "../../hooks/useTheme"

const SignIn: FC = () => {
  const { signInGithub, signInGoogle } = useSignIn()
  const { height } = useDimensions()

  return (
    <IonPage>
      <Helmet>
        <title>EcoCycle - Sign In</title>
        <meta name="description" content="The Recycling App." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ecocycle.web.app/signin" />
        <meta property="og:title" content="EcoCycle - Sign In" />
        <meta property="og:description" content="The Recycling App." />
        <meta
          property="og:image"
          content="https://ecocycle.web.app/assets/icon/icon.png"
        />

        <meta name="twitter:card" content="summary" />
        <meta
          property="twitter:url"
          content="https://ecocycle.web.app/signin"
        />
        <meta name="twitter:title" content="EcoCycle - Sign In" />
        <meta name="twitter:description" content="The Recycling App." />
        <meta
          property="twitter:image"
          content="https://ecocycle.web.app/assets/icon/icon.png"
        />
      </Helmet>
      <IonContent>
        <div
          className="column"
          style={{
            height: height,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div
            className="column"
            style={{
              height: height - 100,
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "var(--ion-card-background)",
              padding: 24,
              borderRadius: 8,
              boxShadow: "rgb(0 0 0 / 12%) 0px 4px 16px",
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
                <span style={{ fontSize: 24, fontWeight: "bold" }}>
                  EcoCycle
                </span>
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
        </div>
      </IonContent>
    </IonPage>
  )
}

export default SignIn
