import React, { FC } from "react"
import { RECORD } from "../../utils/interfaces"
import { IonItem, IonCheckbox, IonText, IonIcon, IonCard } from "@ionic/react"
import { location } from "ionicons/icons"
import { DateTime } from "luxon"
import { calcDiff } from "../../utils/functions"
import { Timestamp } from "firebase/firestore"

interface Props extends RECORD {
  checkboxVisible: boolean
}

const RecordItem: FC<Props> = ({
  items,
  submittedOn,
  uid,
  checkboxVisible,
}) => {
  const now = Timestamp.now()
  const timestamp = calcDiff(submittedOn, now)

  return (
    <IonCard
      className="row"
      style={{
        paddingInline: 12,
        paddingBlock: 14,
        alignItems: "center",
      }}
      mode="ios">
      {checkboxVisible && (
        <IonCheckbox
          mode="md"
          style={{ marginInlineEnd: 16, marginInlineStart: 4 }}
        />
      )}
      <div className="column" style={{ flex: 1 }}>
        <IonText color="dark" style={{ marginInlineStart: 0, marginBottom: 4 }}>
          <span style={{ fontSize: 16 }}>{items} Items</span>
        </IonText>
        <div className="row touch_opacity" style={{ alignItems: "center" }}>
          <IonIcon
            icon={location}
            style={{ color: "#3880ff", fontSize: 14, marginInlineEnd: 8 }}
          />
          <IonText>
            <span style={{ fontSize: 14, color: "#3880ff" }}>
              1111 S. Figueroa Street
            </span>
          </IonText>
        </div>
      </div>
      <div className="column" style={{ alignItems: "center" }}>
        <IonText color="medium">
          <span style={{ fontSize: 16 }}>
            {DateTime.fromJSDate(submittedOn.toDate()).toFormat("LLL dd")}
          </span>
        </IonText>
        <IonText color="medium">
          <span style={{ fontSize: 12 }}>{timestamp}</span>
        </IonText>
      </div>
    </IonCard>
  )
}

export default RecordItem
