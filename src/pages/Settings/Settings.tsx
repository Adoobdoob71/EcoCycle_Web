import React, { FC, useContext } from "react"
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonLabel,
  IonNote,
  IonList,
  IonListHeader,
  IonItemGroup,
  IonItem,
  IonToggle,
  IonCheckbox,
} from "@ionic/react"
import { AuthContext } from "../../context/auth"
import { ThemeContext } from "../../context/theme"
import { useSettings } from "../../hooks/useSettings"

const Settings: FC = () => {
  const { currentUser } = useContext(AuthContext)
  const { isThemeDark } = useContext(ThemeContext)
  const {
    signOutOfAccount,
    onThemeSwitchChange,
    saveHistoryChecked,
    saveHistoryChange,
    clearSearchHistory,
  } = useSettings()

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItemGroup>
            <IonListHeader>Account</IonListHeader>
            <IonItem onClick={signOutOfAccount}>
              <div className="column">
                <IonLabel>Sign out</IonLabel>
                <IonNote>Sign out of your account</IonNote>
              </div>
            </IonItem>
          </IonItemGroup>
          <IonItemGroup>
            <IonListHeader>Appearance</IonListHeader>
            <IonItem>
              <div className="column">
                <IonLabel>Theme</IonLabel>
                <IonNote>Decide whether you like it dark or bright</IonNote>
              </div>
              <IonToggle
                checked={isThemeDark}
                onIonChange={onThemeSwitchChange}
                slot="end"
              />
            </IonItem>
          </IonItemGroup>
          <IonItemGroup>
            <IonListHeader>History</IonListHeader>
            <IonItem>
              <div className="column">
                <IonLabel>Save history</IonLabel>
                <IonNote>Save your searches</IonNote>
              </div>
              <IonCheckbox
                checked={saveHistoryChecked}
                onIonChange={saveHistoryChange}
                slot="end"
              />
            </IonItem>
            <IonItem onClick={clearSearchHistory} button>
              <div className="column">
                <IonLabel>Clear history</IonLabel>
                <IonNote>Clear your search history</IonNote>
              </div>
            </IonItem>
          </IonItemGroup>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Settings
