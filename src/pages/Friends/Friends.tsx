import {
  IonButtons,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from "@ionic/react"
import React, { FC } from "react"
import { Friend } from "../../components/."
import { useFriends } from "../../hooks/useFriends"

const Friends: FC = (props) => {
  const { friends, isInfiniteDisabled, loadMore, loadFriends } = useFriends()

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader slot="fixed">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Friends</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRefresher slot="fixed" onIonRefresh={loadFriends}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList>
          <div style={{ height: 56 }}></div>
          {friends.map((item, index) => (
            <Friend {...item} key={index} />
          ))}
        </IonList>
        <IonInfiniteScroll
          onIonInfinite={loadMore}
          threshold="100px"
          disabled={isInfiniteDisabled}>
          <IonInfiniteScrollContent loadingSpinner="circular"></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  )
}

export default Friends
