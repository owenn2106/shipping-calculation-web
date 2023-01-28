import {
  getDocs,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "services/firebase";
import _ from "lodash";

export async function getSupplier() {
  const collRef = collection(db, "supplier");
  let data = [];

  return getDocs(collRef)
    .then((result) => {
      result.docs.forEach((doc) => {
        data.push({ ...doc.data(), ref: doc.ref, id: doc.id });
      });
      return { data: data, error: null };
    })
    .catch((err) => {
      return { data: null, error: err };
    });
}

export async function addSupplier(data) {
  return setDoc(doc(db, "supplier", data.id), _.omit(data, "id"))
    .then(() => {
      return { data: true, error: null };
    })
    .catch((err) => {
      return { data: null, error: err };
    });
}

export async function updateSupplier(data) {
  return updateDoc(data.ref, _.omit(data, ["id", "ref", "key"]))
    .then(() => {
      return { data: true, error: null };
    })
    .catch((err) => {
      return { data: null, error: err };
    });
}
