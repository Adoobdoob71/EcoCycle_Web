import { IonSpinner } from "@ionic/react"

function Fallback() {
  return (
    <div style={{ height: 80, display: "grid", placeItems: "center" }}>
      <IonSpinner color="primary" />
    </div>
  )
}

export default Fallback
