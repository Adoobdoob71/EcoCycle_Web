import React, { CSSProperties, FC } from "react"
import { AreaChart, Area, Tooltip, XAxis } from "recharts"
import { useDimensions } from "../../hooks/useDimensions"
import { convertTimestampToString } from "../../utils/functions"
import { Timestamp } from "@firebase/firestore"

interface Props {
  data: { items: number; date: Timestamp }[] | undefined
  style?: CSSProperties
}

const Chart: FC<Props> = ({ data, style }) => {
  const { width } = useDimensions()
  return (
    <AreaChart
      data={data}
      height={275}
      width={width - 54}
      style={{ alignSelf: "center" }}>
      <defs>
        <linearGradient id="itemsColor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#44ffc1" stopOpacity={0.25} />
          <stop offset="85%" stopColor="#44ffc1" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey={(item) => convertTimestampToString(item.date, "dd/LL")} />
      <Tooltip
        contentStyle={{
          backgroundColor: "var(--ion-color-light)",
          borderColor: "var(--ion-color-primary)",
          borderRadius: 8,
        }}
      />
      <Area
        type="monotone"
        dataKey="items"
        stroke="#44ffc1"
        fillOpacity={1}
        fill="url(#itemsColor)"
      />
    </AreaChart>
  )
}

export default Chart
