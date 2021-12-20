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
  IonItem,
  IonSkeletonText,
} from "@ionic/react"
import { leaf, add, refresh } from "ionicons/icons"
import { Helmet } from "react-helmet"

import { useHome } from "../../hooks/useHome"

import { Chart, UserProgress } from "../../components/."

import "./Home.css"
import { RECYCLING_GOAL } from "../../utils/constants"

const Home: React.FC = () => {
  const {
    currentUser,
    records,
    width,
    recycledTotal,
    convertedRecords,
    loading,
    loadFriends,
    friends,
  } = useHome()

  return (
    <IonPage>
      <Helmet>
        <title>EcoCycle - Home</title>
        <meta name="description" content="The Recycling App." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ecocycle.web.app/home" />
        <meta property="og:title" content="EcoCycle - Home" />
        <meta property="og:description" content="The Recycling App." />
        <meta
          property="og:image"
          content="https://ecocycle.web.app/assets/icon/icon.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ecocycle.web.app/home" />
        <meta name="twitter:title" content="EcoCycle - Home" />
        <meta name="twitter:description" content="The Recycling App." />
        <meta
          name="twitter:image"
          content="https://ecocycle.web.app/assets/icon/icon.png"
        />
      </Helmet>
      <IonContent>
        <IonCard className="home_header" mode="ios">
          <IonMenuButton color="dark" mode="md" />
          {/* <IonText color="dark" style={{ flex: 1 }}> */}
          <div className="column" style={{ width: "calc(100% - 138.375px)" }}>
            <span
              style={{
                fontSize: 16,
                color: "var(--ion-color-dark)",
                fontWeight: "bold",
                marginBottom: 2,
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}>
              Welcome back, {currentUser?.displayName}
            </span>
            <span
              style={{
                fontSize: 14,
                color: "var(--ion-color-dark)",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}>
              Planning on recycling more?
            </span>
          </div>
          {/* </IonText> */}
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

        <IonCard
          style={{ padding: 21, marginBottom: 16 }}
          className="home_card"
          mode="ios"
          routerLink="/history"
          routerDirection="forward">
          <div
            className="row"
            style={{
              marginBottom: 12,
              alignSelf: "stretch",
              alignItems: "center",
            }}>
            <IonIcon icon={leaf} size="large" color="dark" />
            <div className="column" style={{ flex: 1, alignItems: "flex-end" }}>
              <div className="row" style={{ alignItems: "center" }}>
                <IonText
                  color={recycledTotal >= RECYCLING_GOAL ? "primary" : "dark"}>
                  <span>{recycledTotal}</span>
                </IonText>
                <IonText color="primary">
                  <span>/{RECYCLING_GOAL}</span>
                </IonText>
              </div>
              <IonText color="dark">
                <span>Items recycled this week</span>
              </IonText>
            </div>
          </div>
          <IonProgressBar
            value={recycledTotal / RECYCLING_GOAL}
            buffer={recycledTotal / RECYCLING_GOAL}
            style={{ borderRadius: 8 }}></IonProgressBar>
        </IonCard>
        {convertedRecords ? (
          <IonCard
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingTop: 12,
              marginBottom: 16,
            }}
            className="home_card"
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
            <Chart data={convertedRecords} />
          </IonCard>
        ) : (
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
            mode="ios">
            <IonText color="disabled">
              <span
                style={{
                  fontSize: 18,
                  marginInline: 12,
                  fontWeight: "bold",
                }}>
                Not Enough Data
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
        )}
        <IonCard
          style={{ paddingBlock: 16, paddingInline: 12 }}
          className="home_card"
          mode="ios">
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
        <IonCard
          style={{ paddingBlock: 12, paddingInline: 12 }}
          className="home_card"
          mode="ios">
          <IonText color="primary">
            <span
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}>
              Most Recycled Items
            </span>
          </IonText>
          <div className="column" style={{ marginTop: 12 }}>
            {[0, 0, 0].map((_item, index) => (
              <div
                className="row"
                key={index}
                style={{ filter: "blur(3px)", alignItems: "center" }}>
                <IonSkeletonText
                  animated
                  style={{ width: 42, height: 42, borderRadius: 21 }}
                  slot="start"
                />
                <div className="column" style={{ flex: 1, marginInline: 10 }}>
                  <IonSkeletonText animated style={{ alignSelf: "stretch" }} />
                  <IonSkeletonText
                    animated
                    style={{ alignSelf: "stretch", marginTop: 4 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 213,
            }}>
            <IonText color="dark">
              <span
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}>
                Coming Soon
              </span>
            </IonText>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default Home
