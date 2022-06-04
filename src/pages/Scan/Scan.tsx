import React, { FC } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonBackButton,
  IonTitle,
  IonIcon,
  IonText,
  IonCard,
  IonProgressBar,
} from "@ionic/react";
import { add, leaf, remove } from "ionicons/icons";
import { useDimensions } from "../../hooks/useDimensions";
import { Chart } from "../../components";

const Scan: FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader slot="fixed">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Scan Items</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Scan;
