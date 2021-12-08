import React, { FC } from "react"
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonFooter,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButton,
  IonIcon,
} from "@ionic/react"
import { useDimensions } from "../../hooks/useDimensions"
import { useHistory } from "../../hooks/useHistory"
import { RecordItem } from "../../components"
import { Helmet } from "react-helmet"
import { pencil, trash } from "ionicons/icons"

const History: FC = () => {
  const {
    recordsArr,
    loadMoreRecords,
    isInfiniteDisabled,
    checkboxVisible,
    toggleCheckboxVisible,
    deleteRecords,
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
        <meta name="twitter:url" content="https://ecocycle.web.app/history" />
        <meta name="twitter:title" content="EcoCycle - History" />
        <meta name="twitter:description" content="The Recycling App." />
        <meta
          name="twitter:image"
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
            <IonButtons slot="end">
              <IonButton
                color="dark"
                fill="clear"
                onClick={toggleCheckboxVisible}>
                Select
              </IonButton>
            </IonButtons>
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
      {checkboxVisible && (
        <IonFooter>
          <IonToolbar>
            <IonButtons style={{ paddingInline: 12 }}>
              <IonButton
                color="dark"
                disabled={false}
                fill="clear"
                onClick={deleteRecords}
                style={{ marginRight: 8 }}>
                <IonIcon
                  icon={trash}
                  style={{ marginRight: 8, fontSize: 18 }}
                />
                Delete
              </IonButton>
              <IonButton
                color="dark"
                disabled={false}
                fill="clear"
                style={{ marginRight: 8 }}>
                <IonIcon
                  icon={pencil}
                  style={{ marginRight: 8, fontSize: 18 }}
                />
                Edit
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  )
}

export default History
