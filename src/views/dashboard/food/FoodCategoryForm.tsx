import React, { useState } from "react";
import ContentTitle from "../../../components/ContentTitle";
import "../../../scss/form.scss";
import { mdiImage } from "@mdi/js";
import TileElement from "../../../components/TileElement";
import { db } from "../../../firebase";
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
} from "firebase/firestore";
import { handleFile } from "../../../utils";
import Alert from "../../../components/Alert";
const FoodCategoryForm: React.FC = () => {
  const [categoryName, setCategoryName] = useState<string>("");
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
    if (!categoryName || !thumbnail) {
      setAlertType("error");
      setAlertMessage("Category name and photo are required");
      return;
    }
    try {
      const collectionRef: CollectionReference<DocumentData> = collection(
        db,
        "food-categories"
      );
      const response = await addDoc(collectionRef, {
        name: categoryName,
        imagePath: thumbnail,
      });

      if (response) {
        setAlertType("success");
        setAlertMessage(`Category ${categoryName} has been added`);
        setCategoryName("");
        setThumbnail("");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <ContentTitle title="Create food category" />
      {alertMessage && <Alert message={alertMessage} type={alertType} />}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__field">
          <label htmlFor="name" className="form__label">
            Category name
          </label>
          <input
            type="text"
            id="name"
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
            className="form__input"
          />
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

export default FoodCategoryForm;
