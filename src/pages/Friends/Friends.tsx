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
import { Helmet } from "react-helmet"
import { Friend } from "../../components/."
import { useFriends } from "../../hooks/useFriends"

const Friends: FC = (props) => {
  const { friends, isInfiniteDisabled, loadMore, loadFriends } = useFriends()

  return (
    <IonPage>
      <Helmet>
        <title>EcoCycle - Friends</title>
        <meta name="description" content="The Recycling App." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ecocycle.web.app/friends" />
        <meta property="og:title" content="EcoCycle - Friends" />
        <meta property="og:description" content="The Recycling App." />
        <meta
          property="og:image"
          content="https://ecocycle.web.app/assets/icon/icon.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://ecocycle.web.app/friends"
        />
        <meta name="twitter:title" content="EcoCycle - Friends" />
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
