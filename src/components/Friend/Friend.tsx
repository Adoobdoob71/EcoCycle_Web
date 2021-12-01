import React, { CSSProperties, FC } from "react"
import {
  IonAvatar,
  IonImg,
  IonText,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react"

interface Props {
  style?: CSSProperties
  displayName: string
  email: string
  photoURL: string
  uid: string
}

const Friend: FC<Props> = ({ style, displayName, email, photoURL, uid }) => {
  return (
    <IonItem
      style={{ ...style }}
      routerLink={`/profile/${uid}`}
      routerDirection="forward">
      <IonAvatar style={{ width: 42, height: 42 }} slot="start">
        <IonImg src={photoURL} />
      </IonAvatar>
      <div className="column" style={{ flex: 1, marginInline: 12 }}>
        <IonLabel>{displayName}</IonLabel>
        <IonNote>{email}</IonNote>
      </div>
    </IonItem>
  )
}

export default Friend
