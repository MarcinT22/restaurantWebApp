import React, { useEffect, useState } from "react";
import ContentTitle from "../../../components/ContentTitle";
import CategoryItem from "../../../components/food/CategoryItem";
import TileElement from "../../../components/TileElement";
import { mdiPlus } from "@mdi/js";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPlusThick } from "@mdi/js";
import { fetchData } from "../../../db/utils";

interface FoodCategories {
  id: string;
  name: string;
  imagePath: string;
}

const FoodCategoryList: React.FC = () => {
  const [foodCategories, setFoodCategories] = useState<FoodCategories[]>([]);
  const fetchFoodCategories = async () => {
    const foodCategoriesData = await fetchData<FoodCategories>(
      "food-categories",
      "name"
    );
    setFoodCategories(foodCategoriesData);
  };

  useEffect(() => {
    fetchFoodCategories();
  }, []);

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
      <div className="dashboard__row">
        {foodCategories.map((category) => (
          <div className="dashboard__col" key={category.id}>
            <CategoryItem
              name={category.name}
              linkTo=""
              imagePath={category.imagePath}
            />
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
