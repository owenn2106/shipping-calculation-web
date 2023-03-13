import { db } from "services/firebase";
import {
  collection,
  doc,
  updateDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { eventChannel } from "redux-saga";
import _ from "lodash";

export function setInvoicesListener() {
  return eventChannel((emmiter) => {
    const collRef = collection(db, "invoices");
    const unsub = onSnapshot(collRef, (snapshot) => {
      const data = [];

      snapshot.forEach((doc) => {
        data.push({
          ...doc.data(),
          id: doc.id,
          ref: doc.ref,
        });
      });

      emmiter(data);
    });

    return () => unsub();
  });
}

export async function addInvoice(data) {
  return setDoc(doc(db, "invoices", data.id), data.data)
    .then(() => {
      return { data: true, error: null };
    })
    .catch((err) => {
      return { data: null, error: err };
    });
}

export async function updateInvoice(data) {
  return updateDoc(data.ref, _.omit(data, ["ref"]))
    .then(() => {
      return { data: true, error: null };
    })
    .catch((err) => {
      return { data: null, error: err };
    });
}
