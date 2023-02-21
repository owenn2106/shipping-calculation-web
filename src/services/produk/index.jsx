import { db } from "services/firebase";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  setDoc,
  writeBatch,
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
  return setDoc(doc(db, "produk", data.id), data.data)
    .then(() => {
      return { data: true, error: null };
    })
    .catch((err) => {
      return { data: null, error: err };
    });
}

export async function batchAddProduk(data) {
  const batches = [];
  data.forEach((datum, i) => {
    if (i % 500 === 0) {
      batches.push(writeBatch(db));
    }

    const productRef = doc(db, "produk", datum.id);
    const batch = batches[batches.length - 1];
    batch.set(productRef, _.omit(datum, ["id"]));
  });

  return await Promise.all(batches.map((batch) => batch.commit()))
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
