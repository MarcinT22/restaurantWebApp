import React, { useEffect, useState } from "react";
import ContentTitle from "../../../components/ContentTitle";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPlusThick, mdiPlus } from "@mdi/js";
import FoodItem from "../../../components/food/FoodItem";

import Food from "../../../interfaces/Food";
import TileElement from "../../../components/TileElement";
import { fetchData } from "../../../db/database";

const FoodList: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);

  const fetchFood = async () => {
    try {
      const foodData = await fetchData<Food>("foods");

      setFoods(foodData);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  return (
    <>
      <div className="dashboard__head">
        <ContentTitle title="Food list" />
        <div className="dashboard__actions">
          <Link to="create" className="button">
            Add new <Icon path={mdiPlusThick} className="button__icon" />
          </Link>
        </div>
      </div>
      {foods.map((food, index) => (
        <FoodItem
          id={food.id}
          name={food.name}
          price={food.price}
          categoryId={food.categoryId}
          imagePath={food.imagePath}
          key={index}
        />
      ))}
      <TileElement icon={mdiPlus} title="Add new item" linkTo="create" />
    </>
  );
};

export default FoodList;
