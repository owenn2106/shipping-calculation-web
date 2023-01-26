import { db } from "services/firebase";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import _ from "lodash";

export async function getLokasi() {
  const docRef = doc(db, "appConstants", "lokasi");

  return getDoc(docRef)
    .then((result) => {
      return { data: result.data().lokasi, error: null };
    })
    .catch((err) => {
      return { data: null, error: err };
    });
}

export async function updateLokasi(data) {
  const docRef = doc(db, "appConstants", "lokasi");

  return updateDoc(docRef, data)
    .then(() => {
      return { data: true, error: null };
    })
    .catch((err) => {
      return { data: null, error: err };
    });
}

export async function getPelayaran() {
  const docRef = doc(db, "appConstants", "pelayaran");

  return getDoc(docRef)
    .then((result) => {
      return { data: result.data().pelayaran, error: null };
    })
    .catch((err) => {
      return { data: null, error: err };
    });
}

export async function updatePelayaran(data) {
  const docRef = doc(db, "appConstants", "pelayaran");

  return updateDoc(docRef, data)
    .then(() => {
      return { data: true, error: null };
    })
    .catch((err) => {
      return { data: null, error: err };
    });
}

export async function getEkspedisi() {
  const collRef = collection(db, "ekspedisi");
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

export async function addEkspedisi(data) {
  return setDoc(doc(db, "ekspedisi", data.id), _.omit(data, "id"))
    .then(() => {
      return { data: true, error: null };
    })
    .catch((err) => {
      return { data: null, error: err };
    });
}

export async function updateEkspedisi(data) {
  return updateDoc(data.ref, _.omit(data, ["id", "ref", "key"]))
    .then(() => {
      return { data: true, error: null };
    })
    .catch((err) => {
      return { data: null, error: err };
    });
}
