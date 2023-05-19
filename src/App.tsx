import React, { useState } from "react";
import "./scss/auth.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/auth/Login";
import Dashboard from "./views/dashboard/Dashboard";
import NotFound from "./views/NotFound";
import Welcome from "./views/dashboard/Welcome";
import FoodCategoryList from "./views/dashboard/food/FoodCategoryList";
import FoodList from "./views/dashboard/food/FoodList";
import Auth from "./components/Auth";
import { auth } from "./firebase";
import CreateFoodCategory from "./views/dashboard/food/CreateFoodCategory";
import CreateFood from "./views/dashboard/food/CreateFood";

const App: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const signIn = () => {
    setIsSignedIn(true);
  };

  const signOut = (): void => {
    auth.signOut();
    setIsSignedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login signIn={signIn} />} />
        <Route
          path="/dashboard/*"
          element={
            <Auth isSignedIn={isSignedIn}>
              <Dashboard signOut={signOut} />
            </Auth>
          }
        >
          <Route index element={<Welcome />} />
          <Route path="food-category" element={<FoodCategoryList />} />
          <Route path="food-category/create" element={<CreateFoodCategory />} />
          <Route path="foods" element={<FoodList />} />
          <Route path="foods/create" element={<CreateFood />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
