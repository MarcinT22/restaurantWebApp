import React, { useEffect, useState } from "react";
import { handleFile } from "../../../utils";

import ContentTitle from "../../../components/ContentTitle";
import Alert from "../../../components/Alert";
import TileElement from "../../../components/TileElement";
import { mdiImage } from "@mdi/js";
import FoodCategory from "../../../interfaces/FoodCategory";
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "../../../firebase";
import {
  fetchDataById,
  getFoodCategories,
  updateData,
} from "../../../db/database";
import { useParams } from "react-router-dom";
import Food from "../../../interfaces/Food";

const FoodForm: React.FC = () => {
  const { id = "" } = useParams<{ id?: string }>();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0.0);
  const [ingredients, setIngredients] = useState<string>("");
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [fileName, setFileName] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<string>("");

  const getItem = async (): Promise<void> => {
    try {
      const item = await fetchDataById<Food>("foods", id);
      if (item) {
        setName(item.name);
        setPrice(item.price);
        setIngredients(item.ingredients ?? "");
        setSelectedCategory(item.category);
        setThumbnail(item.imagePath);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(event, setFileName, setThumbnail);
  };

  const addItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlertMessage("");
    if (!name || !thumbnail) {
      setAlertType("error");
      setAlertMessage("Name and photo are required");
      return;
    }

    try {
      const collectionRef: CollectionReference<DocumentData> = collection(
        db,
        "foods"
      );
      const response = await addDoc(collectionRef, {
        name: name,
        price: price,
        ingredients: ingredients,
        imagePath: thumbnail,
        category: selectedCategory,
      });

      if (response) {
        setAlertType("success");
        setAlertMessage(`${name} has been added`);
        setName("");
        setPrice(0.0);
        setIngredients("");
        setSelectedCategory(foodCategories[0].name);
        setThumbnail("");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const updateItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlertMessage("");
    if (!name || !thumbnail) {
      setAlertType("error");
      setAlertMessage("Name and photo are required");
      return;
    }

    try {
      const newData: Food = {
        name: name,
        price: price,
        ingredients: ingredients,
        imagePath: thumbnail,
        category: selectedCategory,
      };

      await updateData("foods", id, newData);
      setAlertType("success");
      setAlertMessage(`${name} has been edited`);
    } catch (error) {
      console.log("Update food error: ", error);
      setAlertType("error");
      setAlertMessage(`Error updating ${name}`);
    }
  };

  const getCategories = async () => {
    try {
      const foodCategoriesData = await getFoodCategories();
      setFoodCategories(foodCategoriesData);
      setSelectedCategory(foodCategoriesData[0]?.name);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  useEffect(() => {
    getCategories();
    if (id) {
      getItem();
    }
  }, []);

  return (
    <>
      <ContentTitle title="Create food" />

      {alertMessage && <Alert message={alertMessage} type={alertType} />}
      <form className="form" onSubmit={id ? updateItem : addItem}>
        <div className="form__field">
          <label htmlFor="name" className="form__label">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="form__input"
          />
        </div>
        <div className="form__field">
          <label htmlFor="price" className="form__label">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price.toFixed(2)}
            onChange={(event) => setPrice(parseFloat(event.target.value))}
            className="form__input"
          />
        </div>
        <div className="form__field">
          <label htmlFor="ingredients" className="form__label">
            Ingredients
          </label>
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
            className="form__input"
          />
        </div>
        <div className="form__field">
          <label htmlFor="category" className="form__label">
            Category
          </label>
          <select
            className="form__input"
            id="category"
            disabled={foodCategories.length === 0}
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {foodCategories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form__field form__field--file">
          {thumbnail && (
            <div className="form__selectedFile">
              <img src={thumbnail} alt="" className="form__thumbnail" />
              <div className="form__fileName">
                Selected files: <span>{fileName}</span>
              </div>
            </div>
          )}
          <input
            type="file"
            id="file"
            accept="image/*"
            className="form__input form__input--hidden"
            onChange={handleImage}
          />
          <label htmlFor="file" className="form__file">
            <TileElement
              title={fileName ? "Change a photo" : "Choose a photo"}
              icon={mdiImage}
            />
          </label>
        </div>
        {id ? (
          <button type="submit" className="form__button">
            Save
          </button>
        ) : (
          <button type="submit" className="form__button">
            Create
          </button>
        )}
      </form>
    </>
  );
};

export default FoodForm;
