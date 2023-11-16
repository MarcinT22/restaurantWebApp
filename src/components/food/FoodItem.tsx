import React from "react";
import "../../scss/foodItem.scss";
import "../../scss/actionButton.scss";
import Food from "../../interfaces/Food";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiDelete, mdiPencil } from "@mdi/js";

const FoodItem: React.FC<Food> = ({ id, name, category, price, imagePath }) => {
  return (
    <div className="foodItem">
      <img src={imagePath} alt="" className="foodItem__img" />

      <div className="foodItem__content">
        <h2 className="foodItem__name">{name}</h2>
        <div className="foodItem__category">{category}</div>

        <div className="foodItem__price">{price.toFixed(2)} PLN</div>
      </div>

      <div className="foodItem__actions">
        <Link to={`edit/${id}`} className="actionButton actionButton--edit">
          Edytuj
          <Icon path={mdiPencil} className="actionButton__icon" />
        </Link>
        <button className="actionButton actionButton--remove">
          Usuń
          <Icon path={mdiDelete} className="actionButton__icon" />
        </button>
      </div>
    </div>
  );
};

export default FoodItem;
