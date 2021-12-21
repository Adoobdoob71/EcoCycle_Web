import React, { FC } from "react"
import { IonContent, IonPage, IonText, IonButton, IonIcon } from "@ionic/react"
import { useDimensions } from "../../hooks/useDimensions"
import { logoGithub, logoGoogle } from "ionicons/icons"
import "./SignIn.css"
import { useSignIn } from "../../hooks/useSignIn"

const SignIn: FC = () => {
  const { signInGithub, signInGoogle } = useSignIn()
  const { height } = useDimensions()

  return (
    <IonPage>
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
              height: height * 0.4,
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "var(--ion-card-background)",
              padding: 32,
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
              {/* <IonButton
                onClick={signInGoogle}
                style={{ marginBottom: 8 }}
                shape="round"
                fill="outline"
                color="primary">
                <IonIcon icon={logoGoogle} style={{ marginRight: 8 }} />
                Sign In With Google
              </IonButton> */}
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
