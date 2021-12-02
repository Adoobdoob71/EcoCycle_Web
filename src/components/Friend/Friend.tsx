import React, { CSSProperties, FC } from "react"
import {
  IonAvatar,
  IonImg,
  IonText,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react"
import { Timestamp } from "firebase/firestore"
import { DateTime } from "luxon"

interface Props {
  style?: CSSProperties
  displayName: string
  email: string
  photoURL: string
  uid: string
  joinedOn: Timestamp
}

const Friend: FC<Props> = ({
  style,
  displayName,
  email,
  photoURL,
  uid,
  joinedOn,
}) => {
  const joinedOnString = DateTime.fromJSDate(joinedOn.toDate()).toFormat(
    "yyyy/LL/dd"
  )

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
        <IonNote>Joined on {joinedOnString}</IonNote>
      </div>
    </IonItem>
  )
}

export default Friend
