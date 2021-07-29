import React, { useEffect, useState } from "react";
import { fb } from "../../services";

export const SellerScheduler = () => {
  const uuid = fb.auth.currentUser.uid;
  const [schedule, setSchedule] = useState([]);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [error, setError] = useState("");

  const defaultWeekdays = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];
  const periods = [
    "08:00-10:00",
    "10:00-12:00",
    "12:00-14:00",
    "14:00-16:00",
    "16:00-18:00",
    "18:00-20:00",
  ];
  useEffect(() => {
    fetch(`https://api-realestate.top/apis/v1/schedules/all?sellerId=${uuid}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data);
        const active = data.filter((e) => e);
        const sun = active
          .filter((e) => e.weekDay.id === 0)
          .map((e) => periods[e.timeFrame.id - 1]);
        const mon = active
          .filter((e) => e.weekDay.id === 1)
          .map((e) => periods[e.timeFrame.id - 1]);
        const tue = active
          .filter((e) => e.weekDay.id === 2)
          .map((e) => periods[e.timeFrame.id - 1]);
        const wed = active
          .filter((e) => e.weekDay.id === 3)
          .map((e) => periods[e.timeFrame.id - 1]);
        const thu = active
          .filter((e) => e.weekDay.id === 4)
          .map((e) => periods[e.timeFrame.id - 1]);
        const fri = active
          .filter((e) => e.weekDay.id === 5)
          .map((e) => periods[e.timeFrame.id - 1]);
        const sat = active
          .filter((e) => e.weekDay.id === 6)
          .map((e) => periods[e.timeFrame.id - 1]);
        const scheduleTable = [];
        scheduleTable.push(sun);
        scheduleTable.push(mon);
        scheduleTable.push(tue);
        scheduleTable.push(wed);
        scheduleTable.push(thu);
        scheduleTable.push(fri);
        scheduleTable.push(sat);
        setSchedule(scheduleTable);

        console.log(scheduleTable);
      });
    return () => {};
  }, [uuid]);

  const handleSubmit = () => {
    let arr = [];
    for (let i = 0; i < schedule.length; i++) {
      if (schedule[i].length > 0) {
        for (let j = 0; j < schedule[i].length; j++) {
          let timeframeId = periods.indexOf(schedule[i][j]) + 1;

          let bodyItem = {
            sellerId: uuid,
            timeFrame: { id: timeframeId },
            weekDay: { id: i },
          };
          arr.push(bodyItem);
        }
      }
    }

    console.log(JSON.stringify(arr));

    fetch("https://api-realestate.top/apis/v1/schedules/create/all", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arr),
    }).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        console.log("create schedule success");
        setButtonDisable(true);
      } else {
        setError("Error");
        console.log(error);
      }
    });
  };
  return (
    <div className="set-schedule-form">
      <h3>Khung giờ rảnh lặp lại hàng tuần</h3>

      <div className="set-schedule-form-note">
        <div className="set-schedule-form-note-bluebox"></div>
        <p>Thời gian rảnh</p>
      </div>
      <br />
      {defaultWeekdays.map((e, index) => (
        <div id={index} className="set-schedule-form-item">
          <p className="set-schedule-form-item-day">{e}</p>

          <div className="periods">
            {periods.map((period, i) => (
              <div
                key={i}
                className={
                  schedule.length > 0 && schedule[index].includes(period)
                    ? "period-item-active"
                    : "period-item"
                }
                onClick={() => {
                  schedule[index].includes(period)
                    ? schedule[index].splice(schedule[index].indexOf(period), 1)
                    : schedule[index].push(period);
                  setSchedule(schedule);
                  setTrigger((e) => !e);
                  setButtonDisable(false);
                }}
              >
                {period}
              </div>
            ))}
          </div>
        </div>
      ))}
      <br />

      <button
        className="save-button"
        onClick={() => handleSubmit()}
        disabled={buttonDisable}
      >
        Lưu
      </button>
    </div>
  );
};
