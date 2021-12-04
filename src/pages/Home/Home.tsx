import {
  IonContent,
  IonMenuButton,
  IonPage,
  IonCard,
  IonText,
  IonIcon,
  IonButton,
  IonAvatar,
  IonProgressBar,
  IonImg,
  IonSpinner,
  IonRouterLink,
  IonReorderGroup,
  IonReorder,
} from "@ionic/react"
import { leaf, add, refresh } from "ionicons/icons"

import { useHome } from "../../hooks/useHome"

import { Chart, UserProgress } from "../../components/."

import "./Home.css"
import { RECYCLING_GOAL } from "../../utils/constants"

const Home: React.FC = () => {
  const {
    currentUser,
    completeReorder,
    records,
    disableReorder,
    enableReorder,
    onLongPress,
    reorderDisabled,
    width,
    recycledTotal,
    convertedRecords,
    loading,
    loadFriends,
    friends,
  } = useHome()

  return (
    <IonPage>
      <IonContent>
        <IonCard className="home_header" mode="ios">
          <IonMenuButton color="dark" mode="md" />
          <div style={{ flex: 1 }}>
            <IonText color="dark">
              <div className="column">
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom: 2,
                  }}>
                  Welcome back,{" "}
                  {currentUser?.displayName?.substring(
                    0,
                    currentUser?.displayName.indexOf(" ")
                  )}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}>
                  Planning on recycling more?
                </span>
              </div>
            </IonText>
          </div>
          <div className="row" style={{ alignItems: "center" }}>
            <IonButton
              fill="clear"
              color="dark"
              routerLink="/record"
              mode="md"
              routerDirection="forward">
              <IonIcon icon={add} />
            </IonButton>
            <IonRouterLink
              routerLink={`/profile/${currentUser?.uid}`}
              routerDirection="forward">
              <IonAvatar style={{ width: 36, height: 36 }}>
                <IonImg
                  src={currentUser?.photoURL || ""}
                  className="touch_opacity"
                />
              </IonAvatar>
            </IonRouterLink>
          </div>
        </IonCard>
        <div style={{ height: 75 }}></div>
        {!reorderDisabled && (
          <div
            className="row"
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              marginInline: 18,
              marginTop: 16,
            }}>
            <IonText color="medium">
              <span style={{ fontSize: 16, fontWeight: "bold" }}>
                Save Order Changes
              </span>
            </IonText>
            <IonButton
              color="primary"
              onClick={disableReorder}
              mode="ios"
              size="small">
              Save
            </IonButton>
          </div>
        )}
        <IonReorderGroup
          disabled={reorderDisabled}
          onIonItemReorder={completeReorder}>
          <IonReorder>
            <IonCard
              style={{ padding: 21, marginBottom: 16 }}
              className="home_card"
              mode="ios"
              routerLink="/history"
              routerDirection="forward"
              {...onLongPress}>
              <div
                className="row"
                style={{
                  marginBottom: 12,
                  alignSelf: "stretch",
                  alignItems: "center",
                }}>
                <IonIcon icon={leaf} size="large" color="dark" />
                <div
                  className="column"
                  style={{ flex: 1, alignItems: "flex-end" }}>
                  <div className="row" style={{ alignItems: "center" }}>
                    <IonText
                      color={
                        recycledTotal >= RECYCLING_GOAL ? "primary" : "dark"
                      }>
                      <span>{recycledTotal}</span>
                    </IonText>
                    <IonText color="primary">
                      <span>/{RECYCLING_GOAL}</span>
                    </IonText>
                  </div>
                  <IonText color="dark">
                    <span>Items recycled today</span>
                  </IonText>
                </div>
              </div>
              <IonProgressBar
                value={recycledTotal / RECYCLING_GOAL}
                buffer={recycledTotal / RECYCLING_GOAL}
                style={{ borderRadius: 8 }}></IonProgressBar>
            </IonCard>
          </IonReorder>
          {convertedRecords ? (
            <IonReorder>
              <IonCard
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingTop: 12,
                  marginBottom: 16,
                }}
                className="home_card"
                mode="ios"
                {...onLongPress}>
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
                <Chart data={convertedRecords} />
              </IonCard>
            </IonReorder>
          ) : (
            <IonReorder>
              <IonCard
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBlock: 40,
                  marginBottom: 16,
                }}
                className="home_card"
                mode="ios"
                {...onLongPress}>
                <IonText color="disabled">
                  <span
                    style={{
                      fontSize: 18,
                      marginInline: 12,
                      fontWeight: "bold",
                    }}>
                    No Data
                  </span>
                </IonText>
                <IonButton
                  fill="outline"
                  shape="round"
                  routerLink="/record"
                  routerDirection="forward"
                  style={{ marginTop: 12 }}
                  mode="md">
                  Record Data
                </IonButton>
              </IonCard>
            </IonReorder>
          )}
          <IonReorder>
            <IonCard
              style={{ paddingBlock: 16, paddingInline: 12 }}
              // routerLink="/friends"
              // routerDirection="forward"
              className="home_card"
              mode="ios"
              {...onLongPress}>
              <div className="row" style={{ alignItems: "center" }}>
                <IonText color="primary">
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}>
                    You Vs Your Friends
                  </span>
                </IonText>
                <IonIcon
                  icon={refresh}
                  style={{ marginInlineStart: "auto", fontSize: 16 }}
                  color="dark"
                  className="touch_opacity"
                  onClick={loadFriends}
                />
              </div>
              <UserProgress
                full_name={currentUser?.displayName}
                avatar_url={currentUser?.photoURL}
                progress={recycledTotal / RECYCLING_GOAL}
                uid={currentUser?.uid}
                style={{ marginTop: 12 }}
              />
              {loading ? (
                <div
                  className="row"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 12,
                  }}>
                  <IonSpinner color="tertiary" />
                </div>
              ) : (
                friends.map((item, index) => (
                  <UserProgress
                    full_name={item.displayName}
                    avatar_url={item.photoURL}
                    progress={
                      item.records.reduce(
                        (previous, current) => previous + current.items,
                        0
                      ) / RECYCLING_GOAL
                    }
                    uid={item.uid}
                    style={{ marginTop: 12 }}
                    key={index}
                  />
                ))
              )}
            </IonCard>
          </IonReorder>
        </IonReorderGroup>
      </IonContent>
    </IonPage>
  )
}

export default Home
