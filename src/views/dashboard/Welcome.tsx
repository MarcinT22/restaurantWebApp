import React from "react";
import TileElement from "../../components/TileElement";
import { mdiFoodForkDrink, mdiHamburger, mdiTableChair } from "@mdi/js";
import ContentTitle from "../../components/ContentTitle";
const Welcome: React.FC = () => {
  return (
    <>
      <ContentTitle title="Hello in RestaurantApp!" />
      <div className="dashboard__row">
        <div className="dashboard__col">
          <TileElement
            icon={mdiFoodForkDrink}
            title="Add new food category"
            linkTo="food-category/create"
          />
        </div>
        <div className="dashboard__col">
          <TileElement
            icon={mdiHamburger}
            title="Add new food"
            linkTo="foods/create"
          />
        </div>
        <div className="dashboard__col">
          <TileElement
            icon={mdiTableChair}
            title="Manage tables"
            linkTo="tables"
          />
        </div>
      </div>
    </>
  );
};

export default Welcome;
