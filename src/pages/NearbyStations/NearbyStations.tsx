import React, { FC } from "react"
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonFab,
  IonFabButton,
  IonIcon,
  IonText,
  IonButton,
  useIonModal,
  IonModal,
} from "@ionic/react"
import GoogleMapReact from "google-map-react"
import { useDimensions } from "../../hooks/useDimensions"
import { chevronUp } from "ionicons/icons"
import { useNearbyStations } from "../../hooks/useNearbyStations"
import "./NearbyStations.css"

interface Props {
  router: HTMLIonRouterOutletElement | null
}

const NearbyStations: FC<Props> = ({ router }) => {
  const { height, width } = useDimensions()
  const { menuOpen, toggleMenu } = useNearbyStations()
  // const [present, dismiss] = useIonModal(
  //   <div
  //     style={{
  //       height: 200,
  //       backgroundColor: "var(--ion-toolbar-background)",
  //     }}></div>
  // )

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
          mode="ios"
          cssClass="nearby_stations_modal"
          showBackdrop={false}
          isOpen={menuOpen}>
          <div
            className="row"
            style={{
              height: 300,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--ion-background-color)",
            }}>
            <IonButton color="tertiary" mode="md" onClick={toggleMenu}>
              Close
            </IonButton>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}

export default NearbyStations
