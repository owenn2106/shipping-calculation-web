import { db } from "services/firebase";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  addDoc,
} from "firebase/firestore";
import _ from "lodash";

export async function getProduk() {
  const collRef = collection(db, "produk");
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

export async function addProduk(data) {
  return addDoc(collection(db, "produk"), data)
    .then(() => {
      return { data: true, error: null };
    })
    .catch((err) => {
      return { data: null, error: err };
    });
}

export async function updateProduk(data) {
  return updateDoc(data.ref, _.omit(data, ["ref", "key"]))
    .then(() => {
      return { data: true, error: null };
    })
    .catch((err) => {
      return { data: null, error: err };
    });
}

export async function getJenisProduk() {
  const docRef = doc(db, "appConstants", "jenisProduk");

  return getDoc(docRef)
    .then((result) => {
      return { data: result.data().jenisProduk, error: null };
    })
    .catch((err) => {
      return { data: null, error: err };
    });
}

export async function updateJenisProduk(data) {
  const docRef = doc(db, "appConstants", "jenisProduk");

  return updateDoc(docRef, data)
    .then(() => {
      return { data: true, error: null };
    })
    .catch((err) => {
      return { data: null, error: err };
    });
}
