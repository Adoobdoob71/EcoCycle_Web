import { createContext } from "react"
import { initializeApp, getApps } from "firebase/app"
import { getAuth, User, Auth } from "firebase/auth"
import { RECORD, USER } from "../utils/interfaces"
import { Timestamp } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA13vOQ9K40Ic4qxD0H5ac_epCrZvDSHf8",
  authDomain: "ecocycle-3ec15.firebaseapp.com",
  databaseURL:
    "https://ecocycle-3ec15-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ecocycle-3ec15",
  storageBucket: "ecocycle-3ec15.appspot.com",
  messagingSenderId: "1051136066970",
  appId: "1:1051136066970:web:c8a4fe2c9624f64d9de623",
  measurementId: "G-MH2VHPPS74",
}

if (getApps().length === 0) initializeApp(firebaseConfig)

const AuthContext = createContext<{
  auth: Auth
  currentUser: User | null
  records: RECORD[]
  recycledTotal: number
  convertedRecords: { items: number; date: Timestamp }[] | undefined
  updateUser: (newUser: User) => void
}>({
  auth: getAuth(),
  currentUser: null,
  records: [],
  recycledTotal: 0,
  convertedRecords: undefined,
  updateUser: () => {},
})

export { AuthContext }
