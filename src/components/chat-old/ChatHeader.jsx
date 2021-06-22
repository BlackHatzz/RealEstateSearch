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
import Appointment from "./Appointment";

export default function ChatHeader(props) {
  //console.log("header" + props);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    const url =
      "http://localhost:8080/apis/v1/conversations/messages?%20realEstateId=2&buyerId=2&sellerId=3";
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

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
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
            {data.deals[0].status && data.appointments.length === 0 ? (
              <Appointment />
            ) : (
              <div>
                {data.appointments[0] ? (
                  <div>
                    <div>
                      current appointment{" "}
                      {formatDate(data.appointments[0].scheduleDate)}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => {
              setButtonPopup(true);
            }}
          >
            Create a dealaaa
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
          {data.appointments.length > 0 ? (
            <div>
              <p>new appointment:</p>
              <div>{formatDate(data.appointments[0].scheduleDate)}</div>
            </div>
          ) : (
            <div></div>
          )}
        </>
      ) : (
        <div>no deal</div>
      )}
    </div>
  );
}
