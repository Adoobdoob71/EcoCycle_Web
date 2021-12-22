import { FC } from "react"
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonFab,
  IonIcon,
  IonText,
  IonButton,
  IonModal,
} from "@ionic/react"
import GoogleMapReact from "google-map-react"
import { useDimensions } from "../../hooks/useDimensions"
import { chevronUp } from "ionicons/icons"
import { useNearbyStations } from "../../hooks/useNearbyStations"
import "./NearbyStations.css"

const NearbyStations: FC = () => {
  const { height, width } = useDimensions()
  const { menuOpen, toggleMenu, setMenuOpen } = useNearbyStations()
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Nearby Stations</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{ width: width, height: height - 56 }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyA13vOQ9K40Ic4qxD0H5ac_epCrZvDSHf8",
              language: "en",
              region: "us",
            }}
            defaultCenter={{ lat: 28.3772, lng: 81.5707 }}
            zoom={5}
          />
        </div>
        <IonFab
          vertical="bottom"
          horizontal="center"
          style={{ transform: "translate(-25%)" }}
          slot="fixed">
          <IonButton color="tertiary" onClick={toggleMenu}>
            <IonIcon icon={chevronUp} style={{ marginInlineEnd: 8 }} />
            Options
          </IonButton>
        </IonFab>
        <IonModal
          breakpoints={[0, 0.4, 1]}
          initialBreakpoint={0.4}
          onDidDismiss={() => setMenuOpen(false)}
          isOpen={menuOpen}
          swipeToClose={true}>
          <div
            className="column"
            style={{
              height: 300,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--ion-background-color)",
            }}>
            <IonText color="dark" style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: "bold" }}>
                Coming soon
              </span>
            </IonText>
            <IonButton
              color="tertiary"
              mode="md"
              onClick={() => setMenuOpen(false)}>
              Close
            </IonButton>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}

export default NearbyStations
