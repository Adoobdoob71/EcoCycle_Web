import { DocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { User } from "./classes";
import { USER } from "./interfaces";

const userConverter = {
  toFirestore: (user: USER) => {
    return {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      joinedOn: user.joinedOn,
      uid: user.uid
    }
  },
  fromFirestore: (snapshot: DocumentSnapshot<USER>, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return data ? new User(data.displayName, data.email, data.photoURL, data.joinedOn, data.uid) : null;
  }
}

export {
  userConverter
}