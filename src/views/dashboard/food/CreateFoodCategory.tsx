import React, { ChangeEvent, FormEvent, useState } from "react";
import ContentTitle from "../../../components/ContentTitle";
import "../../../scss/form.scss";
import { mdiImage } from "@mdi/js";
import TileElement from "../../../components/TileElement";
import { db } from "../../../db/firebase";
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
} from "firebase/firestore";
const CreateFoodCategory: React.FC = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFileName(selectedFile.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        const thumbnailUrl = reader.result as string;
        setThumbnail(thumbnailUrl);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    if (!categoryName || !thumbnail) {
      setMessage("Category name and photo are required");
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
        setMessage("Category has been added");
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
      {message && <div>{message}</div>}
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
          <label htmlFor="file" className="form__file">
            <TileElement
              title={fileName ? "Change a photo" : "Choose a photo"}
              icon={mdiImage}
            />
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            className="form__input form__input--hidden"
            onChange={handleFile}
          />
        </div>
        <button type="submit" className="form__button">
          Create
        </button>
      </form>
    </>
  );
};

export default CreateFoodCategory;
