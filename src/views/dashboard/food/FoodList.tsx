import React, { useEffect, useState } from "react";
import ContentTitle from "../../../components/ContentTitle";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPlusThick, mdiPlus } from "@mdi/js";
import FoodItem from "../../../components/food/FoodItem";

import Food from "../../../interfaces/Food";
import TileElement from "../../../components/TileElement";
import { fetchData } from "../../../db/database";
import Loader from "../../../components/Loader";

const FoodList: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);

  const fetchFood = async (): Promise<void> => {
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
        <ContentTitle title="Offer" />
        <div className="dashboard__actions">
          <Link to="create" className="button">
            Add new <Icon path={mdiPlusThick} className="button__icon" />
          </Link>
        </div>
      </div>
      {!foods.length && <Loader />}
      {foods.map((food, index) => (
        <FoodItem {...food} key={index} />
      ))}
      <TileElement icon={mdiPlus} title="Add new item" linkTo="create" />
    </>
  );
};

export default FoodList;
