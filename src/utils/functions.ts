import { DateTime } from 'luxon'
import { Timestamp } from 'firebase/firestore'
import { RECORD } from './interfaces'

export const convertTimestampToString = (timestamp: Timestamp, format: string) => 
  DateTime.fromJSDate(timestamp.toDate()).toFormat(format)

export const orderRecordArray = (recordsArr: RECORD[]) => {
  try {
    const records: { items: number, date: Timestamp }[] = [{ items: 0, date: getConvertedTimestampFromDate(Timestamp.now().toDate()) }]
    let indexDate = getConvertedTimestampFromDate(recordsArr[0].submittedOn.toDate())
    let index = 0
    recordsArr.forEach(item => {
      if (item.submittedOn.seconds > indexDate.seconds + 86400){
        index++;
        indexDate = getConvertedTimestampFromDate(item.submittedOn.toDate())
      }
      records[index] = { items: item.items + (records[index] ? records[index].items : 0), date: getConvertedTimestampFromDate(item.submittedOn.toDate())  }
    })
    return records
  }catch(error){
    console.error(error)
  }
}

export const getConvertedTimestampFromDate = (date: Date) => Timestamp.fromDate(DateTime.fromJSDate(date).startOf("day").toJSDate())