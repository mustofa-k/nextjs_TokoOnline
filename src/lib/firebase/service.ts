import { collection, getDocs, getDoc, doc, getFirestore, query, where, addDoc } from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

export async function RetrieveData(colectionName: string) {
  const snapshot = await getDocs(collection(firestore, colectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

// export async function RetrieveDataById(colectionName: string, id: string) {
//   const snapshot = await getDocs(collection(firestore, colectionName, id));
//   const data = snapshot.data();
//   return data;
// }
export async function RetrieveDataById(collectionName: string, id: string) {
  const docRef = doc(firestore, collectionName, id);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  } else {
    return null;
  }
}

export async function RetrieveDataByField(collectionName: string, field: string, value: string) {
  const q = query(collection(firestore, collectionName), where(field, "==", value));
  const snapshot = await getDocs(q);

  // Ambil data
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function AddData(collectionName: string, data: any, callback: Function) {
  await addDoc(collection(firestore, "users"), data)
    .then(() => {
      callback(true); // Berhasil register
    })
    .catch((err) => {
      callback(false); // Jika ada error saat simpan data
      console.error(err);
    });
}
