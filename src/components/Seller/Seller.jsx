import React, { useContext } from "react";
import { Context } from "../../ChatContext";
import { fb } from "../../services";
import BuyerNavbar from "../global/BuyerNavbar";
import Schedule from "../Schedule/Schedule";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import SellerDashboard from "./SellerDashboard";
import SearchPost from "./SearchPost";
import ManagePost from "./ManagePost";
import "./manage-post.css";
import "./seller.css";
export const Seller = () => {
  const routes = [
    {
      path: "/sell",
      exact: true,
      main: () => (
        <div className="content-container">
          <ManagePost />
        </div>
      ),
    },
    {
      path: "/search-post",
      main: () => <SearchPost />,
    },
    // {
    //   path: "/schedule",
    //   main: () => <Schedule />,
    // },
  ];

  return (
    <div style={{ background: "#f0f0f0" }}>
      <BuyerNavbar />

      <div className="seller-wrapper">
        <Router>
          <div className="seller-menu">
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <CustomMenuLink
                  activeOnlyWhenExact={true}
                  to="/sell"
                  label="Đăng bài viết"
                />
              </li>
              <li>
                <CustomMenuLink to="/search-post" label="Search" />
              </li>
            </ul>
          </div>

          <div className="right-container">
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
        </Router>
      </div>
    </div>
  );
};

function CustomMenuLink({ label, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <button
      className={match ? "seller-menu-button-active" : "seller-menu-button"}
    >
      <Link
        to={to}
        className={match ? "seller-menu-link-active" : "seller-menu-link"}
      >
        {label}
      </Link>
    </button>
  );
}
