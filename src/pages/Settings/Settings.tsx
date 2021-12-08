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
  IonSelect,
  IonSelectOption,
} from "@ionic/react"
import { AuthContext } from "../../context/auth"
import { ThemeContext } from "../../context/theme"
import { useSettings } from "../../hooks/useSettings"
import { Helmet } from "react-helmet"

const Settings: FC = () => {
  const { currentUser } = useContext(AuthContext)
  const { isThemeDark } = useContext(ThemeContext)
  const {
    signOutOfAccount,
    onThemeSwitchChange,
    saveHistoryChecked,
    saveHistoryChange,
    clearSearchHistory,
    recyclingGoal,
    onRecycleGoalChange,
  } = useSettings()

  return (
    <IonPage>
      <Helmet>
        <title>EcoCycle - Settings</title>
        <meta name="description" content="The Recycling App." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ecocycle.web.app/settings" />
        <meta property="og:title" content="EcoCycle - Settings" />
        <meta property="og:description" content="The Recycling App." />
        <meta
          property="og:image"
          content="https://ecocycle.web.app/assets/icon/icon.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ecocycle.web.app/settings" />
        <meta name="twitter:title" content="EcoCycle - Settings" />
        <meta name="twitter:description" content="The Recycling App." />
        <meta
          name="twitter:image"
          content="https://ecocycle.web.app/assets/icon/icon.png"
        />
      </Helmet>
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
            <IonListHeader>Goals</IonListHeader>
            <IonItem>
              <div className="column">
                <IonLabel>Recycling goal</IonLabel>
                <IonNote>How much do you recycle in a week?</IonNote>
              </div>
              <IonSelect
                value={recyclingGoal}
                placeholder={`${recyclingGoal}`}
                onIonChange={onRecycleGoalChange}
                defaultValue={recyclingGoal}
                slot="end">
                <IonSelectOption value="10">10</IonSelectOption>
                <IonSelectOption value="20">20</IonSelectOption>
                <IonSelectOption value="30">30</IonSelectOption>
                <IonSelectOption value="40">40</IonSelectOption>
              </IonSelect>
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
