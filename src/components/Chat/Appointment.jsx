import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import {
  getMonth,
  getYear,
  subDays,
  addDays,
  setHours,
  setMinutes,
  getDay,
} from "date-fns";
import range from "lodash/range";
import moment from "moment";

function Appointment({ setTrigger, conversation }) {
  const currentDate = new Date();
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [weekdays, setWeekdays] = useState([7, 7, 7, 7, 7, 7, 7]); //0->6:sun->sat
  const [schedule, setSchedule] = useState([]);
  const years = range(getYear(new Date()), getYear(new Date()) + 2, 1);
  const months = [
    "Tháng một",
    "Tháng hai",
    "Tháng ba",
    "Tháng tư",
    "Tháng năm",
    "Tháng sáu",
    "Tháng bảy",
    "Tháng tám",
    "Tháng chín",
    "Tháng mười",
    "Tháng mười một",
    "Tháng mười hai",
  ];
  const defaultWeekday = [0, 1, 2, 3, 4, 5, 6];
  const periods = [
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
  ];

  useEffect(() => {
    if (conversation) {
      fetch(
        `http://realestatebackend-env.eba-9zjfbgxp.ap-southeast-1.elasticbeanstalk.com/apis/v1/schedules/all?sellerId=${conversation.data.sellerId}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          const active = data.filter((e) => e.status === "Not booked yet");
          const freeDays = active.map((e) => e.weekDay.id - 1);
          const busyDays = defaultWeekday.filter((e) => !freeDays.includes(e));
          const filterDays = [...busyDays, ...[7, 7, 7, 7, 7, 7, 7]];
          setWeekdays(filterDays);
          const sun = active
            .filter((e) => e.weekDay.id === 1)
            .map((e) => periods[e.timeFrame.id - 1]);
          const mon = active
            .filter((e) => e.weekDay.id === 2)
            .map((e) => periods[e.timeFrame.id - 1]);
          const tue = active
            .filter((e) => e.weekDay.id === 3)
            .map((e) => periods[e.timeFrame.id - 1]);
          const wed = active
            .filter((e) => e.weekDay.id === 4)
            .map((e) => periods[e.timeFrame.id - 1]);
          const thu = active
            .filter((e) => e.weekDay.id === 5)
            .map((e) => periods[e.timeFrame.id - 1]);
          const fri = active
            .filter((e) => e.weekDay.id === 6)
            .map((e) => periods[e.timeFrame.id - 1]);
          const sat = active
            .filter((e) => e.weekDay.id === 7)
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
        });
      return () => {
        // cleanup
      };
    }
  }, [conversation]);

  const filterDay = (date) => {
    const day = getDay(date);

    return (
      day !== weekdays[0] &&
      day !== weekdays[1] &&
      day !== weekdays[2] &&
      day !== weekdays[3] &&
      day !== weekdays[4] &&
      day !== weekdays[5] &&
      day !== weekdays[6]
    );
  };
  const handleAppointmentSubmit = (event) => {
    event.preventDefault();
    console.log(startDate);
    console.log(startTime);
    const d = moment(startDate).format("L");
    const date = moment(d + " " + startTime).toISOString();
    console.log(date);
    // fetch(
    //   "http://realestatebackend-env.eba-9zjfbgxp.ap-southeast-1.elasticbeanstalk.com/apis/v1/appointments/create",
    //   {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       conversationId: conId.slice(3),
    //       createAt: currentDate.toISOString(),
    //       id: 0,
    //       scheduleDate: startDate.toISOString(),
    //       staffId: "SaLjk0fE9xTr2qu3JLj6bFgNUPq1",
    //       status: "upcoming",
    //     }),
    //   }
    // ).then(() => {
    //   props.setTrigger((value) => !value);
    // });
  };
  return (
    <div className="appointment">
      <form onSubmit={handleAppointmentSubmit} className="bookForm">
        <DatePicker
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {"<"}
              </button>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {">"}
              </button>
            </div>
          )}
          // excludeDates={[new Date(), subDays(new Date(), 1)]}
          required={true}
          dateFormat="dd/MM/yyyy"
          placeholderText="Nhấn để chọn ngày"
          selected={startDate}
          minDate={addDays(new Date(), 1)}
          maxDate={addDays(new Date(), 15)}
          filterDate={filterDay}
          onChange={(date) => {
            setStartDate(date);
            setStartTime("");
          }}
        />

        {!!startDate && (
          <select
            required={true}
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
          >
            <option value="" disabled selected>
              Chọn khung giờ
            </option>
            {!!schedule &&
              schedule[startDate.getDay()].map((e) => (
                <option value={e}>{e}</option>
              ))}
          </select>
        )}

        <div>
          <button type="submit">đặt</button>
          <button
            type="button"
            onClick={() => {
              setTrigger((value) => !value);
            }}
          >
            hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default Appointment;
