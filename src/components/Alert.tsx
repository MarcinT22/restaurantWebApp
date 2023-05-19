import React from "react";
import "../scss/alert.scss";

interface AlertProps {
  message: string;
  type: string;
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  return <div className={`alert alert--${type}`}>{message}</div>;
};

export default Alert;
