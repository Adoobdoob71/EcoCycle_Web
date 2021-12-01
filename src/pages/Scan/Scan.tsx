import React, { FC, useState } from "react"
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonTitle,
  IonButtons,
} from "@ionic/react"
import SwipeableViews from "react-swipeable-views"
import { TabItem } from "../../components/."
import QRscan from "../../fragments/QRscan"

const Scan: FC = () => {
  const [activeTab, setActiveTab] = useState(0)

  const changeActiveTab = (index: number) => setActiveTab(index)

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Scan</IonTitle>
          </IonToolbar>
          <div
            className="row"
            style={{
              width: "100%",
              backgroundColor: "var(--ion-toolbar-background)",
            }}>
            <TabItem
              text="QR"
              active={activeTab === 0}
              style={{ height: 50 }}
              onClick={() => setActiveTab(0)}
            />
            <TabItem
              text="NFC"
              active={activeTab === 1}
              style={{ height: 50 }}
              onClick={() => setActiveTab(1)}
            />
          </div>
        </IonHeader>
        <SwipeableViews index={activeTab} onChangeIndex={changeActiveTab}>
          <QRscan />
          <div>hello</div>
        </SwipeableViews>
      </IonContent>
    </IonPage>
  )
}

export default Scan
