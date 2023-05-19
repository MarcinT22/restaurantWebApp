import React, { useEffect, useState } from "react";
import ContentTitle from "../../../components/ContentTitle";
import CategoryItem from "../../../components/food/CategoryItem";
import TileElement from "../../../components/TileElement";
import { mdiPlus, mdiDelete } from "@mdi/js";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPlusThick } from "@mdi/js";

import FoodCategory from "../../../interfaces/FoodCategory";
import "../../../scss/actions.scss";
import Alert from "../../../components/Alert";
import { deleteData, getFoodCategories } from "../../../db/database";

const FoodCategoryList: React.FC = () => {
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<string>("");

  const removeItem = async (id: string) => {
    try {
      deleteData("food-categories", id);
      setAlertType("success");
      setAlertMessage("Category has been deleted");
    } catch (error) {}
  };

  const getCategories = async () => {
    try {
      const foodCategoriesData = await getFoodCategories();
      setFoodCategories(foodCategoriesData);
    } catch (error) {
      console.error("error: ", error);
    }
  };
  useEffect(() => {
    getCategories();
  }, [foodCategories]);

  return (
    <>
      <div className="dashboard__head">
        <ContentTitle title="Food category" />

        <div className="dashboard__actions">
          <Link to="create" className="button">
            Add new <Icon path={mdiPlusThick} className="button__icon" />
          </Link>
        </div>
      </div>
      {alertMessage && <Alert message={alertMessage} type={alertType} />}
      <div className="dashboard__row">
        {foodCategories.map((category, index) => (
          <div className="dashboard__col" key={index}>
            <CategoryItem
              id={category.id}
              name={category.name}
              imagePath={category.imagePath}
            />

            <div className="actions">
              <button
                className="actions__button actions__button--delete"
                title="Delete"
                onClick={() => removeItem(category.id)}
              >
                <Icon path={mdiDelete} className="actions__icon" />
              </button>
            </div>
          </div>
        ))}

        <div className="dashboard__col">
          <TileElement icon={mdiPlus} title="Add new item" linkTo="create" />
        </div>
      </div>
    </>
  );
};

export default FoodCategoryList;
