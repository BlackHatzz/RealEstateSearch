import React, { useState } from "react";
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
function Appointment() {
  const currentDate = new Date();
  const [startDate, setStartDate] = useState(addDays(new Date(), 1));
  const years = range(1990, getYear(new Date()) + 3, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filterDay = (date) => {
    const day = getDay(date);
    return day !== 0;
  };
  const handleAppointmentSubmit = (event) => {
    console.log("adasdsa" + startDate.toISOString());
    event.preventDefault();
    fetch("http://localhost:8080/apis/v1/appointments/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: 1,
        createAt: currentDate.toISOString(),
        id: 0,
        scheduleDate: startDate.toISOString(),
        staffId: "ddddddddd",
        status: "upcoming",
      }),
    });
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
          dateFormat="dd/MM/yyyy - hh:ss aa"
          timeFormat="HH:mm"
          selected={startDate}
          placeholderText="Click to select a date"
          onChange={(date) => setStartDate(date)}
          minDate={new Date()}
          maxDate={addDays(new Date(), 15)}
          showTimeSelect
          minTime={setHours(setMinutes(new Date(), 0), 6)}
          maxTime={setHours(setMinutes(new Date(), 30), 22)}
          filterDate={filterDay}
          excludeDates={[new Date(), subDays(new Date(), 1)]}
          excludeTimes={[setHours(setMinutes(new Date(), 30), 14)]}
          timeIntervals={120}
        />
        <button type="submit">Tạo</button>
      </form>
    </div>
  );
}

export default Appointment;
