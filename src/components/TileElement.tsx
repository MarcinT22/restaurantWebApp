import React from "react";
import { Link } from "react-router-dom";
import "../../src/scss/tile.scss";
import Icon from "@mdi/react";

interface TileElementProps {
  icon: string;
  title: string;
  linkTo?: string;
}

const TileElement: React.FC<TileElementProps> = ({ icon, title, linkTo }) => {
  const titleContent = (
    <>
      <Icon className="tile__icon" path={icon} />
      <div className="tile__title">{title}</div>
    </>
  );

  return linkTo ? (
    <Link to={linkTo} className="tile">
      {titleContent}
    </Link>
  ) : (
    <div className="tile">{titleContent}</div>
  );
};

export default TileElement;
