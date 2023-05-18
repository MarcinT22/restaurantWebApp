import React, { useEffect, useState } from "react";
import ContentTitle from "../../../components/ContentTitle";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPlusThick } from "@mdi/js";
import FoodItem from "../../../components/food/FoodItem";
import { fetchData } from "../../../db/utils";

interface Food {
  id: string;
  name: string;
  category: string;
  price: number;
  imagePath: string;
}

const FoodList: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);

  const fetchFood = async () => {
    const foodData = await fetchData<Food>("food");
    setFoods(foodData);
  };

  useEffect(() => {
    fetchFood();
  }, []);

  return (
    <>
      <div className="dashboard__head">
        <ContentTitle title="Food list" />
        <div className="dashboard__actions">
          <Link to="" className="button">
            Add new <Icon path={mdiPlusThick} className="button__icon" />
          </Link>
        </div>
      </div>
      {foods.map((food) => (
        <FoodItem
          name={food.name}
          category="Pizza"
          price={food.price}
          imagePath={food.imagePath}
          key={food.id}
        />
      ))}
    </>
  );
};

export default FoodList;
