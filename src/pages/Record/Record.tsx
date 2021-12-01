import React, { FC } from "react"
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
} from "@ionic/react"
import { add, leaf, remove } from "ionicons/icons"
import { useRecord } from "../../hooks/useRecord"
import { useDimensions } from "../../hooks/useDimensions"
import { Timestamp } from "@firebase/firestore"
import { Chart } from "../../components"
import { RECYCLING_GOAL } from "../../utils/constants"

const Record: FC = () => {
  const {
    decrementRecord,
    decrementDisabled,
    incrementRecord,
    recordValue,
    records,
    addRecordToDb,
    recycledTotal,
    convertedRecords,
  } = useRecord()

  const { width } = useDimensions()

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader slot="fixed">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Record Recycled Items</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{ height: 56 }}></div>
        <div
          className="row"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            paddingInline: 10,
            paddingBlock: 12,
            marginInline: 12,
            marginBlock: 32,
          }}>
          <IonButton
            buttonType="icon"
            disabled={decrementDisabled}
            onClick={decrementRecord}>
            <IonIcon icon={remove} />
          </IonButton>
          <IonText color="dark">
            <span style={{ fontSize: 32, fontWeight: "bold" }}>
              {recordValue}
            </span>
          </IonText>
          <IonButton buttonType="icon" onClick={incrementRecord}>
            <IonIcon icon={add} />
          </IonButton>
        </div>
        <IonCard style={{ padding: 21 }} mode="ios">
          <div
            className="row"
            style={{
              marginBottom: 12,
              alignSelf: "stretch",
              alignItems: "center",
            }}>
            <IonIcon
              icon={leaf}
              size="large"
              color={
                recycledTotal + recordValue >= RECYCLING_GOAL
                  ? "primary"
                  : "dark"
              }
            />
            <div className="column" style={{ flex: 1, alignItems: "flex-end" }}>
              <div className="row" style={{ alignItems: "center" }}>
                <IonText
                  color={
                    recycledTotal + recordValue >= RECYCLING_GOAL
                      ? "primary"
                      : "dark"
                  }>
                  <span>{recycledTotal + recordValue}</span>
                </IonText>
                <IonText color="primary">
                  <span>/{RECYCLING_GOAL}</span>
                </IonText>
              </div>
              <IonText color="dark">
                <span>Items recycled</span>
              </IonText>
            </div>
          </div>
          <IonProgressBar
            value={(recycledTotal + recordValue) / RECYCLING_GOAL}
            buffer={(recycledTotal + recordValue) / RECYCLING_GOAL}
            style={{ borderRadius: 8 }}></IonProgressBar>
        </IonCard>
        <IonCard
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: 12,
            marginBottom: 24,
          }}
          mode="ios">
          <IonText color="primary">
            <span
              style={{
                fontSize: 16,
                marginInline: 12,
                fontWeight: "bold",
              }}>
              Recycling History
            </span>
          </IonText>
          <Chart
            data={convertedRecords?.slice(0, -1).concat([
              {
                ...convertedRecords[convertedRecords.length - 1],
                items:
                  convertedRecords[convertedRecords.length - 1].items +
                  recordValue,
              },
            ])}
          />
        </IonCard>
        <IonButton
          color="primary"
          onClick={addRecordToDb}
          disabled={recordValue === 0}
          style={{
            marginLeft: "50%",
            transform: "translate(-50%)",
            marginBottom: 24,
          }}
          mode="ios">
          Done
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Record
