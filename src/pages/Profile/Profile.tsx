import React, { FC, useContext, useEffect, useState } from "react"
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonCard,
  IonAvatar,
  IonImg,
  IonText,
  IonRefresher,
  IonRefresherContent,
  IonProgressBar,
  IonIcon,
  IonSpinner,
  IonButton,
} from "@ionic/react"
import { leaf } from "ionicons/icons"
import { useDimensions } from "../../hooks/useDimensions"
import { useLoadUser } from "../../hooks/useLoadUser"
import { useParams } from "react-router-dom"
import { Chart } from "../../components/."
import { AuthContext } from "../../context/auth"
import { useFollow } from "../../hooks/useFollow"
import { RECYCLING_GOAL } from "../../utils/constants"

const Profile: FC = () => {
  const { uid } = useParams<{ uid: string }>()
  const {
    userData,
    loading,
    loadUser,
    error,
    records,
    recycledTotal,
    loadProfile,
    convertedRecords,
  } = useLoadUser(uid)

  const { height } = useDimensions()
  const { currentUser } = useContext(AuthContext)
  const { followingStatus, loadingStatus, toggleStatus } = useFollow(
    currentUser?.uid,
    uid
  )

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Profile</IonTitle>
            {uid !== currentUser?.uid && (
              <IonButton
                color={followingStatus ? "tertiary" : "primary"}
                size="small"
                shape="round"
                disabled={loadingStatus}
                onClick={toggleStatus}
                fill="solid"
                style={{ marginInlineEnd: 12 }}
                slot="end">
                {followingStatus ? "Following" : "Follow"}
              </IonButton>
            )}
          </IonToolbar>
        </IonHeader>
        <IonRefresher slot="fixed" onIonRefresh={loadProfile}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {loading ? (
          <div
            style={{
              display: "flex",
              height: height - 56,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <IonSpinner color="primary" />
          </div>
        ) : (
          <div className="column">
            <IonCard
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingInline: 16,
                paddingBlock: 14,
                marginBottom: 12,
              }}
              mode="ios">
              <IonAvatar style={{ width: 64, height: 64, marginInlineEnd: 12 }}>
                <IonImg src={userData?.photoURL} />
              </IonAvatar>
              <div
                className="column"
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  justifyContent: "space-evenly",
                }}>
                <IonText color="dark">
                  <span style={{ fontSize: 16, fontWeight: "bold" }}>
                    {userData?.displayName}
                  </span>
                </IonText>
                <IonText color="medium">
                  <span style={{ fontSize: 14 }}>{userData?.email}</span>
                </IonText>
              </div>
            </IonCard>
            <IonCard style={{ padding: 21, marginBlock: 12 }} mode="ios">
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
                    <span>Items recycled</span>
                  </IonText>
                </div>
              </div>
              <IonProgressBar
                value={recycledTotal / RECYCLING_GOAL}
                buffer={recycledTotal / RECYCLING_GOAL}
                style={{ borderRadius: 8 }}></IonProgressBar>
            </IonCard>

            <IonCard
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingTop: 12,
                marginBlock: 12,
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
              <Chart data={convertedRecords} />
            </IonCard>
          </div>
        )}
      </IonContent>
    </IonPage>
  )
}

export default Profile