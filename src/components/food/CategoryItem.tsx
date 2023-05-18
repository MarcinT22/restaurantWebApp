import React from "react";
import "../../scss/categoryItem.scss";
import { Link } from "react-router-dom";

interface CategoryItemProps {
  imagePath: string;
  name: string;
  linkTo: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  imagePath,
  name,
  linkTo,
}) => {
  return (
    <Link to={linkTo} className="categoryItem">
      <img src={imagePath} alt="" className="categoryItem__img" />
      <h2 className="categoryItem__name">{name}</h2>
    </Link>
  );
};

export default CategoryItem;
