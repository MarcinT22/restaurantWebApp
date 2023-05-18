import React from "react";

interface ContentTitle {
  title: string;
}

const ContentTitle: React.FC<ContentTitle> = ({ title }) => {
  return <h1 className="dashboard__header">{title}</h1>;
};

export default ContentTitle;
