import React, { FC } from "react"
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonSkeletonText,
  IonItem,
  IonInput,
  IonButtons,
  IonList,
  IonListHeader,
} from "@ionic/react"
import { useSearch } from "../../hooks/useSearch"
import { Friend, QueryHistory } from "../../components"
import { useHistory } from "react-router-dom"

const Search: FC = () => {
  const {
    users,
    queryString,
    onChangeQuery,
    submitSearch,
    queryHistory,
    deleteSearchQuery,
  } = useSearch()
  const history = useHistory()

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader slot="fixed">
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
              debounce={350}
              clearInput={true}
              value={queryString}
              enterkeyhint="search"
              minlength={1}
              onKeyUp={submitSearch}
              onIonChange={onChangeQuery}
              autofocus={true}></IonInput>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <div style={{ height: 56 }}></div>
          {queryHistory.map((item, index) => (
            <QueryHistory
              text={item}
              onClick={() => history.push(`/search/${item}`)}
              onDelete={() => deleteSearchQuery(item)}
              key={index}
            />
          ))}
          <IonListHeader>Users</IonListHeader>
          {users.length === 0 &&
            [0, 0, 0].map((item, index) => (
              <IonItem key={index}>
                <IonSkeletonText
                  animated
                  style={{ width: 42, height: 42, borderRadius: 21 }}
                  slot="start"
                />
                <div className="column" style={{ flex: 1, marginInline: 12 }}>
                  <IonSkeletonText animated style={{ alignSelf: "stretch" }} />
                  <IonSkeletonText
                    animated
                    style={{ alignSelf: "stretch", marginTop: 4 }}
                  />
                </div>
              </IonItem>
            ))}
          {users.length !== 0 &&
            users.map((item, index) => <Friend {...item} key={index} />)}
          <IonListHeader>Items</IonListHeader>
          {[0, 0, 0].map((item, index) => (
            <IonItem key={index}>
              <IonSkeletonText
                animated
                style={{ width: 42, height: 42, borderRadius: 21 }}
                slot="start"
              />
              <div className="column" style={{ flex: 1, marginInline: 12 }}>
                <IonSkeletonText animated style={{ alignSelf: "stretch" }} />
                <IonSkeletonText
                  animated
                  style={{ alignSelf: "stretch", marginTop: 4 }}
                />
              </div>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Search
