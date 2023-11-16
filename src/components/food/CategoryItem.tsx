import React from "react";
import "../../scss/categoryItem.scss";
import { Link } from "react-router-dom";
import FoodCategory from "../../interfaces/FoodCategory";

const CategoryItem: React.FC<FoodCategory> = ({ imagePath, name }) => {
  return (
    <Link to="/" className="categoryItem">
      <img src={imagePath} alt="" className="categoryItem__img" />
      <h2 className="categoryItem__name">{name}</h2>
    </Link>
  );
};

export default CategoryItem;
