import { db } from "../firebase";
import {
  collection,
  getDocs,
  CollectionReference,
  QuerySnapshot,
  DocumentData,
  query,
  orderBy,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import FoodCategory from "../interfaces/FoodCategory";

export const fetchData = async <T>(
  collectionPath: string,
  orderByField: string = "name"
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
      const item: T & { id: string } = {
        id: doc.id,
        ...doc.data(),
      } as T & { id: string };
      data.push(item);
    });

    return data;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
};

export const fetchDataById = async <T>(
  collectionPath: string,
  id: string
): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionPath, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as T;
    } else {
      console.log("Do not exist");
      return null;
    }
  } catch (error) {
    console.error("Error", error);
  }
  return null;
};

export const deleteData = async (collectionPath: string, id: string) => {
  try {
    await deleteDoc(doc(db, collectionPath, id));
  } catch (error) {
    console.error("error: ", error);
  }
};

export const getFoodCategories = async (): Promise<FoodCategory[]> => {
  try {
    const foodCategoriesData = await fetchData<FoodCategory>("food-categories");

    return foodCategoriesData;
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
};

interface UpdateData {
  [key: string]: any;
}

export const updateData = async <T extends UpdateData>(
  collectionPath: string,
  id: string,
  data: T
) => {
  try {
    const docRef = doc(db, collectionPath, id);
    await setDoc(docRef, data);
  } catch (error) {
    console.log("Error updating data: ", error);
  }
};
