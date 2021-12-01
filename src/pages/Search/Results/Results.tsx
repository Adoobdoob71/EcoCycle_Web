import React, { FC } from "react"
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonInput,
} from "@ionic/react"
import { useHistory, useParams } from "react-router-dom"
import { TabItem } from "../../../components"
import { useResults } from "../../../hooks/useResults"
import SwipeableViews from "react-swipeable-views"
import ResultsUsers from "../../../fragments/ResultsUsers/ResultsUsers"

const Results: FC = () => {
  const { query } = useParams<{ query: string }>()

  const { activeTab, onActiveTabChange } = useResults(query)

  const history = useHistory()

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonInput
              placeholder="Search anything"
              inputMode="search"
              style={{
                background: "var(--ion-background-color)",
                borderRadius: 8,
                marginInlineEnd: 12,
                width: "auto",
              }}
              onClick={() => history.goBack()}
              disabled={true}
              value={query}
            />
          </IonToolbar>
          <div
            className="row"
            style={{
              width: "100%",
              backgroundColor: "var(--ion-toolbar-background)",
            }}>
            <TabItem
              text="Users"
              active={activeTab === 0}
              style={{ height: 50 }}
              onClick={() => onActiveTabChange(0)}
            />
            <TabItem
              text="Items"
              active={activeTab === 1}
              style={{ height: 50 }}
              onClick={() => onActiveTabChange(1)}
            />
            <TabItem
              text="News"
              active={activeTab === 2}
              style={{ height: 50 }}
              onClick={() => onActiveTabChange(2)}
            />
          </div>
        </IonHeader>
        <SwipeableViews index={activeTab} onChangeIndex={onActiveTabChange}>
          <ResultsUsers query={query} />
          <div>Coming soon</div>
          <div>Coming soon</div>
        </SwipeableViews>
      </IonContent>
    </IonPage>
  )
}

export default Results
