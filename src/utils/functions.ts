import { DateTime } from "luxon"
import { Timestamp } from "firebase/firestore"
import { RECORD } from "./interfaces"

export const convertTimestampToString = (
  timestamp: Timestamp,
  format: string
) => DateTime.fromJSDate(timestamp.toDate()).toFormat(format)

export const orderRecordArray = (recordsArr: RECORD[]) => {
  try {
    const records: { items: number; date: Timestamp }[] = [
      {
        items: 0,
        date: getConvertedTimestampFromDate(Timestamp.now().toDate()),
      },
    ]
    if (recordsArr.length !== 0) {
      let indexDate = getConvertedTimestampFromDate(
        recordsArr[0].submittedOn.toDate()
      )
      let index = 0
      recordsArr.forEach((item) => {
        if (item.submittedOn.seconds > indexDate.seconds + 86400) {
          index++
          indexDate = getConvertedTimestampFromDate(item.submittedOn.toDate())
        }
        records[index] = {
          items: item.items + (records[index] ? records[index].items : 0),
          date: getConvertedTimestampFromDate(item.submittedOn.toDate()),
        }
      })
      return records
    }
  } catch (error) {
    console.error(error)
  }
}

export const getConvertedTimestampFromDate = (date: Date) =>
  Timestamp.fromDate(DateTime.fromJSDate(date).startOf("day").toJSDate())

export const calcDiff = (date: Timestamp, now: Timestamp) => {
  let differenceInMins = (now.toMillis() - date.toMillis()) / 60000
  let smallerThan60 = differenceInMins < 60
  let smallerThan1440 = differenceInMins < 1440

  if (differenceInMins <= 1) return "Just in!"

  if (smallerThan60) return differenceInMins.toFixed(0) + " mins ago"

  if (differenceInMins < 120 && differenceInMins > 60) return "An hour ago"

  if (smallerThan1440) return (differenceInMins / 60).toFixed(0) + " hours ago"

  if (differenceInMins < 2880 && differenceInMins > 1440) return "A day ago"

  return (differenceInMins / 1440).toFixed(0) + " days ago"
}
