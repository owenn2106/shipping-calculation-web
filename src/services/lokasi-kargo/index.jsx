import { db } from "services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

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
