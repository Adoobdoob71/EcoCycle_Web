import { Timestamp, DocumentSnapshot, SnapshotOptions } from "@firebase/firestore";
import { USER } from "./interfaces";

class User {
  displayName: string;
  email: string;
  photoURL: string;
  joinedOn: Timestamp;
  uid: string;
  constructor(displayName: string, email: string, photoURL: string, joinedOn: Timestamp, uid: string){
    this.displayName = displayName;
    this.email = email;
    this.photoURL = photoURL;
    this.joinedOn = joinedOn;
    this.uid = uid;
  }
}

export {
  User,

}