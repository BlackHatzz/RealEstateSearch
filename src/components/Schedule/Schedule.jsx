import React, { useEffect, useState } from "react";
import { fb } from "../../services";
import BuyerNavbar from "../global/BuyerNavbar";
import Upcoming from "./Upcoming";
import "./schedule.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Passed from "./Passed";
const routes = [
  {
    path: "/schedule",
    exact: true,
    main: () => <Upcoming />,
  },
  {
    path: "/schedule/passed",
    main: () => <Passed />,
  },
];
const Schedule = () => {
  const uuid = fb.auth.currentUser.uid;
  return (
    <div style={{ background: "#f0f0f0", height: "100vh" }}>
      <BuyerNavbar />
      <div className="schedule-body">
        <div className="schedule-list">
          <div className="schedule-list-menu">
            <CustomMenuLink
              activeOnlyWhenExact={true}
              to="/schedule"
              label="Sắp tới"
              style={{TextDecoder}}
            />
            <CustomMenuLink to="/schedule/passed" label="Đã qua" />
          </div>

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
    </div>
  );
};

export default Schedule;

function CustomMenuLink({ label, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <button className={match ? "schedule-button-active" : "schedule-button"}>
      <Link to={to} className="schedule-list-menu-link" >
        {label}
      </Link>
    </button>
  );
}
