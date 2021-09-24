import React, { useEffect, useState, useContext } from "react";
import Upcoming from "./Upcoming";
import "./schedule.css";
import "./schedule-mobile.css";

import Passed from "./Passed";
import { Context } from "../../ChatContext";
import { fb } from "../../services";

const Schedule = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div style={{ background: "#f0f0f0", height: "100%", overflowY: "hidden" }}>
      <div className="schedule-body">
        <div className="schedule-list">
          <div className="schedule-list-menu">
            <button
              onClick={() => {
                setCurrentTab(0);
              }}
              className={
                currentTab === 0 ? "schedule-button-active" : "schedule-button"
              }
            >
              <p>Đang chờ</p>
            </button>
            <button
              onClick={() => {
                setCurrentTab(1);
              }}
              className={
                currentTab === 1 ? "schedule-button-active" : "schedule-button"
              }
            >
              <p>Đã kết thúc</p>
            </button>
          </div>

          {currentTab === 0 && <Upcoming />}
          {currentTab === 1 && <Passed />}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
