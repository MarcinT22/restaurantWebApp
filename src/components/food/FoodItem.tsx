import React from "react";
import "../../scss/foodItem.scss";
import Food from "../../interfaces/Food";

const FoodItem: React.FC<Food> = ({
  id,
  name,
  categoryId,
  price,
  imagePath,
}) => {
  return (
    <div className="foodItem">
      <img src={imagePath} alt="" className="foodItem__img" />

      <div className="foodItem__content">
        <h2 className="foodItem__name">{name}</h2>
        <div className="foodItem__category">tutaj kategoria {id}</div>

        <div className="foodItem__price">{price.toFixed(2)} PLN</div>
      </div>
    </div>
  );
};

export default FoodItem;
