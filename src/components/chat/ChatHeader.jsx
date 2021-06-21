import React, { useEffect, useState } from "react";
import DealPopup from "./DealPopup";
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

export default function ChatHeader(props) {
  console.log(props);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);
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

  const url =
    "http://localhost:8080/apis/v1/conversations/messages?%20realEstateId=2&buyerId=2&sellerId=3";

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })

      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return "Loading...";
  if (error) return "Error!";

  function handleAccept(id) {
    //let query = { id: id };
    let url =
      "http://localhost:8080/apis/apis/deals/update?%20dealId=" +
      id +
      "&%20status=true";
    fetch(url, {
      method: "PUT",
    }).then();
    //window.location.reload();
  }

  return localStorage.getItem("username") === "Iron" ? (
    <div>
      {props.title}
      <div>
        {data.deals.length > 0 ? (
          <>
            <div>Deal :{data.deals[0].offeredPrice}</div>
            <div>
              {data.deals[0].status ? "accepted" : "waiting for accepted"}
            </div>
            {data.deals[0].status ? (
              <div>
                <p>Make an appointment</p>
                <div>
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
                          onChange={({ target: { value } }) =>
                            changeYear(value)
                          }
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
                    dateFormat="dd/MM/yyyy hh:mm aa"
                    selected={startDate}
                    placeholderText="Click to select a date"
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 15)}
                    showTimeSelect
                    minTime={setHours(setMinutes(new Date(), 0), 7)}
                    maxTime={setHours(setMinutes(new Date(), 30), 23)}
                    filterDate={filterDay}
                    excludeDates={[new Date(), subDays(new Date(), 1)]}
                    excludeTimes={[setHours(setMinutes(new Date(), 30), 14)]}
                  />
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </>
        ) : (
          <button
            onClick={() => {
              setButtonPopup(true);
            }}
          >
            Create a deal
          </button>
        )}
      </div>
      <DealPopup trigger={buttonPopup} setTrigger={setButtonPopup}></DealPopup>
    </div>
  ) : (
    <div>
      {props.title}
      {data.deals.length > 0 ? (
        <>
          <div>Deal :{data.deals[0].offeredPrice}</div>
          {data.deals[0].status ? (
            <div>You have accepted the deal</div>
          ) : (
            <button onClick={handleAccept(data.deals[0].id)}>Accept</button>
          )}
        </>
      ) : (
        <div>no deal</div>
      )}
    </div>
  );
}
