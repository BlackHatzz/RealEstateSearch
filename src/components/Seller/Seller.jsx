import React, { useContext } from "react";
import { Context } from "../../ChatContext";
import { fb } from "../../services";
import BuyerNavbar from "../global/BuyerNavbar";
import Schedule from "../Schedule/Schedule";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const Seller = () => {
  const routes = [
    {
      path: "/schedule",
      sidebar: () => <div>Lịch hẹn</div>,
      main: () => <h2>Lịch hẹn</h2>,
    },
    {
      path: "/shoelaces",
      sidebar: () => <div>shoelaces!</div>,
      main: () => <h2>Shoelaces</h2>,
    },
  ];

  return (
    <div style={{ background: "#f0f0f0" }}>
      <BuyerNavbar />
      <div>
        <Router>
          <div style={{ display: "flex" }}>
            <div
              style={{
                padding: "10px",
                width: "10%",
                height: "100vh",
                background: "#f0f0f0",
              }}
            >
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                  <Link to="/schedule">Lịch hẹn</Link>
                </li>
                <li>
                  <Link to="/shoelaces">Shoelaces11</Link>
                </li>
              </ul>
            </div>

            <div style={{ flex: 1, padding: "10px" }}>
              <Switch>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<route.main />}
                  />
                ))}
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    </div>
  );
};
