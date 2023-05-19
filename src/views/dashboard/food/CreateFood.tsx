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
import { getFoodCategories } from "../../../db/database";

const CreateFood: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0.0);
  const [ingredients, setIngredients] = useState<string>("");
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const [fileName, setFileName] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<string>("");

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(event, setFileName, setThumbnail);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        categoryId: selectedCategoryId,
      });

      if (response) {
        setAlertType("success");
        setAlertMessage("Food item has been added");
        setName("");
        setPrice(0.0);
        setIngredients("");
        setSelectedCategoryId(foodCategories[0].id);
        setThumbnail("");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const getCategories = async () => {
    try {
      const foodCategoriesData = await getFoodCategories();
      setFoodCategories(foodCategoriesData);
      setSelectedCategoryId(foodCategoriesData[0]?.id);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <ContentTitle title="Create food" />
      {alertMessage && <Alert message={alertMessage} type={alertType} />}
      <form className="form" onSubmit={handleSubmit}>
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
            value={selectedCategoryId}
            onChange={(event) => setSelectedCategoryId(event.target.value)}
          >
            {foodCategories.map((category) => (
              <option key={category.id} value={category.id}>
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
        <button type="submit" className="form__button">
          Create
        </button>
      </form>
    </>
  );
};

export default CreateFood;
