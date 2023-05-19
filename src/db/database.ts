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
  where,
  collectionGroup,
  getDoc,
} from "firebase/firestore";
import FoodCategory from "../interfaces/FoodCategory";
import { type } from "os";
import Food, { FoodWithCategory } from "../interfaces/Food";

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
      const item: T = { ...doc.data() } as T;
      data.push(item);
    });

    return data;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
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
