import React from "react";
import "../../scss/foodItem.scss";

interface FoodItem {
  name: string;
  category: string;
  price: number;
  imagePath: string;
}

const FoodItem: React.FC<FoodItem> = ({ name, category, price, imagePath }) => {
  return (
    <div className="foodItem">
      <img src={imagePath} alt="" className="foodItem__img" />

      <div className="foodItem__content">
        <h2 className="foodItem__name">{name}</h2>
        <div className="foodItem__category">{category}</div>

        <div className="foodItem__price">{price.toFixed(2)} PLN</div>
      </div>
    </div>
  );
};

export default FoodItem;
