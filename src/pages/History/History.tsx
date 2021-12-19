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
  IonSpinner,
  IonModal,
  IonText,
  IonInput,
} from "@ionic/react"
import { useDimensions } from "../../hooks/useDimensions"
import { useHistory } from "../../hooks/useHistory"
import { RecordItem } from "../../components"
import { Helmet } from "react-helmet"
import { pencil, trash } from "ionicons/icons"
import "./History.css"

const History: FC = () => {
  const {
    recordsArr,
    loadMoreRecords,
    isInfiniteDisabled,
    checkboxVisible,
    toggleCheckboxVisible,
    deleteRecords,
    checkedIds,
    addId,
    removeId,
    loadingDelete,
  } = useHistory()

  const { width, height } = useDimensions()

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
                buttonType="icon"
                onClick={toggleCheckboxVisible}>
                <IonIcon
                  icon={pencil}
                  slot="icon-only"
                  style={{ fontSize: 18 }}
                />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <div style={{ height: 56 }}></div>
          {loadingDelete ? (
            <div
              style={{
                height: height - 56,
                display: "grid",
                placeItems: "center",
              }}>
              <IonSpinner color="primary" />
            </div>
          ) : (
            recordsArr.map((item, index) => (
              <RecordItem
                {...item}
                onCheck={() => addId(item.id)}
                onRemove={() => removeId(item.id)}
                checkboxVisible={checkboxVisible}
                key={index}
              />
            ))
          )}
          <IonInfiniteScroll
            onIonInfinite={(event) => loadMoreRecords(event)}
            threshold="100px"
            disabled={loadingDelete || isInfiniteDisabled}>
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
                disabled={loadingDelete || checkedIds.length === 0}
                fill="clear"
                onClick={deleteRecords}>
                <IonIcon
                  icon={trash}
                  style={{ marginRight: 8, fontSize: 18 }}
                />
                Delete
              </IonButton>
              <IonButton
                color="dark"
                style={{ marginLeft: "auto" }}
                disabled={loadingDelete || checkedIds.length !== 1}
                fill="clear">
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
