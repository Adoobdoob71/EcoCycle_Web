import { Timestamp } from "firebase/firestore"

interface USER {
  displayName: string
  email: string
  photoURL: string
  joinedOn: Timestamp
  uid: string
}

interface RECORD {
  id?: string
  uid: string
  items: number
  submittedOn: Timestamp
}

interface NEWS {
  source?: { id?: string; name?: string }
  author?: string
  title?: string
  description?: string
  url?: string
  urlToImage?: string
  publishedAt?: string
  content?: string
}

export type { USER, RECORD, NEWS }
