import React, { FC } from "react"
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButton,
} from "@ionic/react"
import { useDimensions } from "../../hooks/useDimensions"
import { useHistory } from "../../hooks/useHistory"
import { RecordItem } from "../../components"
import { Helmet } from "react-helmet"

const History: FC = () => {
  const {
    recordsArr,
    loadMoreRecords,
    isInfiniteDisabled,
    checkboxVisible,
    toggleCheckboxVisible,
  } = useHistory()

  const { width } = useDimensions()

  return (
    <IonPage>
      <Helmet>
        <title>EcoCycle - History</title>
        <meta name="description" content="The Recycling App." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ecocycle.web.app/history" />
        <meta property="og:title" content="EcoCycle - History" />
        <meta property="og:description" content="The Recycling App." />
        <meta
          property="og:image"
          content="https://ecocycle.web.app/assets/icon/icon.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://ecocycle.web.app/history"
        />
        <meta name="twitter:title" content="EcoCycle - History" />
        <meta name="twitter:description" content="The Recycling App." />
        <meta
          property="twitter:image"
          content="https://ecocycle.web.app/assets/icon/icon.png"
        />
      </Helmet>
      <IonContent fullscreen>
        <IonHeader slot="fixed">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>History</IonTitle>
            <IonButton
              slot="end"
              color="dark"
              fill="clear"
              onClick={toggleCheckboxVisible}>
              Select
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <div style={{ height: 56 }}></div>
          {recordsArr.map((item, index) => (
            <RecordItem
              {...item}
              checkboxVisible={checkboxVisible}
              key={index}
            />
          ))}
          <IonInfiniteScroll
            onIonInfinite={loadMoreRecords}
            threshold="100px"
            disabled={isInfiniteDisabled}>
            <IonInfiniteScrollContent loadingSpinner="circular"></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default History
