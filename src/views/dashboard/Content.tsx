import React from "react";
import "../../scss/dashboard.scss";
import TileElement from "../../components/TileElement";
import { mdiFoodForkDrink, mdiHamburger, mdiTableChair } from "@mdi/js";
const Content: React.FC = () => {
  return (
    <div>
      <h1 className="dashboard__header">Hello in RestaurantApp!</h1>
      <div className="dashboard__row">
        <TileElement
          icon={mdiFoodForkDrink}
          title="Add new food category"
          path="/add-food-category"
        />
        <TileElement
          icon={mdiHamburger}
          title="Add new food"
          path="/add-food"
        />
        <TileElement
          icon={mdiTableChair}
          title="Manage tables"
          path="/manage-tables"
        />
      </div>
    </div>
  );
};

export default Content;
