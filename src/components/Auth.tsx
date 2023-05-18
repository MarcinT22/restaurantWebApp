import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface Auth {
  isSignedIn: boolean;
  children: ReactElement;
}

const Auth: React.FC<Auth> = ({ isSignedIn, children }) => {
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Auth;
