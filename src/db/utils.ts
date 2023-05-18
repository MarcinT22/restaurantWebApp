import { db } from "./firebase";
import {
  collection,
  getDocs,
  CollectionReference,
  QuerySnapshot,
  DocumentData,
  query,
  orderBy,
} from "firebase/firestore";

interface Data {
  id: string;
}

export const fetchData = async <T extends Data>(
  collectionPath: string,
  orderByField: string = "id"
): Promise<T[]> => {
  try {
    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      collectionPath
    );

    const dbQuery = query(collectionRef, orderBy(orderByField));

    const snapshot: QuerySnapshot<DocumentData> = await getDocs(dbQuery);
    const data: T[] = [];

    snapshot.forEach((doc) => {
      const item: T = { id: doc.id, ...doc.data() } as T;
      data.push(item);
    });

    return data;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
};
