import React, { FC } from "react"
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonCard,
  IonText,
} from "@ionic/react"
import { useScan } from '../../hooks/useScan';

const Scan: FC = () => {

  const {
    multiplier,
    loading,
    incrementMult,
    decrementMult,
    decrementDisabled
  } = useScan()

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
        {/* Scanner Card */}
        <IonCard className="row align_center" style={{ padding: 21, marginBottom: 16 }} mode="ios">
          {/* Item image */}
          <div className="column">
            <IonText>
              {/* Item name */}
              {/* Item category */}
            </IonText>
          </div>

        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default Scan
