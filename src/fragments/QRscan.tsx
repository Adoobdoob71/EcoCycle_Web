import React, { FC } from "react"
import QrReader from "react-qr-reader"
import { useIonToast } from "@ionic/react"

const QRscan: FC = () => {
  const [present, dismiss] = useIonToast()

  const onScan = (data: string | null) => {
    if (data)
      present({
        message: data,
        mode: "ios",
      })
    else console.error(data)
  }

  const onError = (err: any) => {
    console.error(err)
  }

  return <QrReader onScan={onScan} onError={onError} />
}

export default QRscan
