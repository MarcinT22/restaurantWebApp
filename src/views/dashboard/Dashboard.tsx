import React from "react";
import { Outlet } from "react-router-dom";
import "../../scss/dashboard.scss";
import "../../scss/button.scss";
import Menu from "../../components/Menu";

interface Dashboard {
  signOut: () => void;
}

const Dashboard: React.FC<Dashboard> = ({ signOut }) => {
  return (
    <>
      <Menu />
      <div className="dashboard">
        <div className="dashboard__container">
          <div className="dashboard__top">
            <div className="dashboard__title">Dashboard</div>
            <button className="dashboard__logout" onClick={signOut}>
              Log out
            </button>
          </div>

          <div className="dashboard__content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
