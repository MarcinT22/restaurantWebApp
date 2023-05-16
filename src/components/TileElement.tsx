import React from "react";
import { Link } from "react-router-dom";
import "../../src/scss/tile.scss";
import Icon from "@mdi/react";

interface TileElementProps {
  icon: string;
  title: string;
  path: string;
}

const TileElement: React.FC<TileElementProps> = ({ icon, title, path }) => {
  return (
    <Link to={path} className="tile">
      <Icon className="tile__icon" path={icon} />
      <div className="tile__title">{title}</div>
    </Link>
  );
};

export default TileElement;
