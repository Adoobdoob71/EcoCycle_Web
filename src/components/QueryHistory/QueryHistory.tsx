import React, { FC } from "react"
import { IonIcon, IonText, IonButton } from "@ionic/react"
import { close, search } from "ionicons/icons"

interface Props {
  text: string | undefined | null
  onDelete: () => void
  onClick: () => void
}

const QueryHistory: FC<Props> = ({ text, onDelete, onClick }) => {
  return (
    <div
      className="row touch_opacity align_center"
      style={{
        paddingInline: 16,
        paddingBlock: 8,
      }}>
      <IonIcon icon={search} style={{ fontSize: 18 }} color="dark" />
      <IonText
        color="dark"
        style={{ fontSize: 16, flex: 1, marginInline: 16 }}
        onClick={onClick}>
        <span>{text}</span>
      </IonText>
      <IonButton
        style={{ zIndex: 100 }}
        onClick={onDelete}
        size="small"
        fill="clear"
        color="dark">
        <IonIcon icon={close} color="disabled" size="small" slot="icon-only" />
      </IonButton>
    </div>
  )
}

export default QueryHistory
