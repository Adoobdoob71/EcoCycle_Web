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
