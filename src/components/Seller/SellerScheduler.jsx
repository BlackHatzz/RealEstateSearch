import React, { useEffect, useState } from "react";
import { fb } from "../../services";

export const SellerScheduler = () => {
  const uuid = fb.auth.currentUser.uid;
  const [schedule, setSchedule] = useState([]);
  const [trigger, setTrigger] = useState(false);

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
    "20:00-22:00",
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
        const active = data.filter((e) => e.status === "Not booked yet");
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
  return (
    <div className="set-schedule-form">
      <h3>Khung giờ rảnh lặp lại hàng tuần</h3>
      {defaultWeekdays.map((e, index) => (
        <div id={index} className="set-schedule-form-item">
          <p className="set-schedule-form-item-day">{e}</p>
          <p>Khung giờ</p>
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
                }}
              >
                {period}
              </div>
            ))}
          </div>
        </div>
      ))}
      <br />

      <button>Lưu</button>
    </div>
  );
};
