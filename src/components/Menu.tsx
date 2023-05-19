import React, { useState } from "react";
import "../../src/scss/menu.scss";
import { NavLink, Link } from "react-router-dom";

import Icon from "@mdi/react";
import {
  mdiFoodForkDrink,
  mdiHamburger,
  mdiViewDashboard,
  mdiTableChair,
} from "@mdi/js";

const Menu: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={`${showMenu ? "menu menu--show" : "menu"}`}>
      <button
        className={`${
          showMenu
            ? "menu__hamburger menu__hamburger--transform"
            : "menu__hamburger"
        }`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className="menu__content">
        <Link to="/dashboard/" className="menu__logo">
          RestaurantApp
        </Link>
        <nav className="menu__nav">
          <ul className="menu__list">
            <li className="menu__item">
              <NavLink className="menu__link" to="/dashboard/">
                <Icon className="menu__icon" path={mdiViewDashboard} />{" "}
                Dashboard
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink className="menu__link" to="food-category">
                <Icon className="menu__icon" path={mdiFoodForkDrink} /> Food
                category
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink className="menu__link" to="foods">
                <Icon className="menu__icon" path={mdiHamburger} /> Food list
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink className="menu__link" to="tables">
                <Icon className="menu__icon" path={mdiTableChair} /> Tables
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
