import { IonAvatar, IonImg, IonProgressBar, IonText } from "@ionic/react"
import React, { FC } from "react"
import { useHistory } from "react-router-dom"

import "./UserProgress.css"

interface Props {
  full_name: string | null | undefined
  avatar_url: string | null | undefined
  progress?: number
  uid?: string
  style?: React.CSSProperties
}

const UserProgress: FC<Props> = ({
  full_name,
  avatar_url,
  progress,
  uid,
  style,
}) => {
  const history = useHistory()
  const openProfile = () => history.push(`/profile/${uid}`)
  return (
    <div
      className="row touch_opacity"
      style={{ ...style, alignItems: "center" }}
      onClick={openProfile}>
      <IonAvatar style={{ width: 32, height: 32 }}>
        <IonImg src={avatar_url || ""} />
      </IonAvatar>
      <div className="column" style={{ flex: 1, marginInlineStart: 12 }}>
        <IonText color="dark">
          <span style={{ fontSize: 16, fontWeight: "bold" }}>{full_name}</span>
        </IonText>
        <IonProgressBar
          value={progress}
          style={{ borderRadius: 8, marginTop: 6 }}></IonProgressBar>
      </div>
    </div>
  )
}

export default UserProgress
