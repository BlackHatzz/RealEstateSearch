import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { getMonth, getYear, addDays, getDay } from "date-fns";
import range from "lodash/range";
import moment from "moment";
import { fb } from "../../services";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import "react-datepicker/dist/react-datepicker.css";
function Appointment({ setTrigger, conversation, setBookStatus }) {
  const username = fb.auth.currentUser.displayName;
  const uuid = fb.auth.currentUser.uid;
  const currentDate = new Date();
  const [bookId, setBookId] = useState();
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [weekdays, setWeekdays] = useState([7, 7, 7, 7, 7, 7, 7]); //0->6:sun->sat
  const [schedule, setSchedule] = useState([]);
  const [myRef, setMyRef] = useState(false);
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
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00",
    "20:00 - 22:00",
  ];
  const [dateformat, setDateformat] = useState("dd/MM/yyyy hh:mm aa");
  useEffect(() => {
    setBookId(uuidv4());
    if (conversation) {
      fetch(
        `https://api-realestate.top/apis/v1/schedules/all?sellerId=${conversation.data.sellerId}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          const active = data;
          console.log(active);
          const freeDays = active.map((e) => e.weekDay.id);
          const busyDays = defaultWeekday.filter((e) => !freeDays.includes(e));
          const filterDays = [...busyDays, ...[7, 7, 7, 7, 7, 7, 7]];
          setWeekdays(filterDays);
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
          console.log(schedule);
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

    const d = moment(startDate).format("L");

    const date = moment(d + " " + startTime, "DD/MM/YYYY hh:mm").toISOString();

    fb.firestore
      .collection("conversations")
      .doc(conversation.id)
      .collection("messages")
      .doc(bookId)
      .set({
        type: "appointment",
        appointment: date,
        sender: username,
        status: "upcoming",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        fb.firestore
          .collection("conversations")
          .doc(conversation.id)
          .set(
            {
              appointment: "upcoming",
              appointmentId: bookId,
              appointmentDate: date,
              lastMessage: "lịch hẹn",
              lastvisit: firebase.firestore.FieldValue.serverTimestamp(),
              lastMessageReadStaff: false,
            },
            { merge: true }
          )
          .then(() => {
            setBookStatus("upcoming");
          });
        // fb.firestore.collection("conversations").doc(conversation.id).update({
        //   lastMessage: "lịch hẹn",
        //   lastvisit: firebase.firestore.FieldValue.serverTimestamp(),
        // });

        fb.firestore
          .collection("users")
          .doc(uuid)
          .collection("appointments")
          .doc(bookId)
          .set(
            {
              buyerId: uuid,
              sellerId: conversation.data.sellerId,
              realId: conversation.data.realId,
              status: "upcoming",
              id: bookId,
              date: date,
              address: conversation.data.address,
              seller: conversation.data.seller,
              buyer: conversation.data.buyer,
              dealprice: conversation.data.price,
              title: conversation.data.title,
              staffId: conversation.data.staffId,
            },
            { merge: true }
          );

        fb.firestore
          .collection("users")
          .doc(conversation.data.sellerId)
          .collection("appointments")
          .doc(bookId)
          .set(
            {
              buyerId: uuid,
              sellerId: conversation.data.sellerId,
              realId: conversation.data.realId,
              status: "upcoming",
              id: bookId,
              date: date,
              address: conversation.data.address,
              seller: conversation.data.seller,
              buyer: conversation.data.buyer,
              dealprice: conversation.data.price,
              title: conversation.data.title,
              staffId: conversation.data.staffId,
            },
            { merge: true }
          );

        fb.firestore
          .collection("users")
          .doc(conversation.data.staffId)
          .collection("appointments")
          .doc(bookId)
          .set(
            {
              buyerId: uuid,
              sellerId: conversation.data.sellerId,
              realId: conversation.data.realId,
              status: "upcoming",
              id: bookId,
              date: date,
              address: conversation.data.address,
              seller: conversation.data.seller,
              buyer: conversation.data.buyer,
              dealprice: conversation.data.price,
              title: conversation.data.title,
              staffId: conversation.data.staffId,
            },
            { merge: true }
          );

        setTrigger((value) => !value);
      })
      .then(() => {
        // fetch("https://api-realestate.top/apis/v1/appointments/create", {
        //   method: "POST",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     conversationId: conversation.id,
        //     createAt: currentDate.toISOString(),
        //     id: 0,
        //     scheduleDate: startDate.toISOString(),
        //     staffId: "SaLjk0fE9xTr2qu3JLj6bFgNUPq1",
        //     status: "upcoming",
        //   }),
        // }).then((response) => {
        //   console.log(response);
        // });
      });
  };

  const CustomTimeInput = ({ date, onChange }) => (
    <div className="time-form">
      {!!startDate &&
        !!schedule &&
        schedule[startDate.getDay()].map((time) => (
          <div className="time-select-item">
            <input
              value={time.slice(0, 5)}
              name="time"
              type="radio"
              onChange={(e) => {
                onChange(e.target.value);
                setStartTime(e.target.value);
                setDateformat("dd/MM/yyyy hh:mm aa");
              }}
              checked={startTime === time.slice(0, 5)}
            />
            {time}
          </div>
        ))}
    </div>
  );

  const closeCalendar = () => {
    myRef.setOpen(false);
  };

  return (
    <div className="appointment">
      <form onSubmit={handleAppointmentSubmit} className="bookForm">
        <p>Đặt lịch hẹn</p>
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
          dateFormat={dateformat}
          placeholderText="Nhấn để chọn ngày"
          selected={startDate}
          minDate={addDays(new Date(), 1)}
          maxDate={addDays(new Date(), 15)}
          filterDate={filterDay}
          onChange={(date) => {
            setStartDate(date);
            setStartTime("");
            setDateformat("dd/MM/yyyy");
          }}
          shouldCloseOnSelect={false}
          showTimeInput
          customTimeInput={<CustomTimeInput />}
          ref={(r) => {
            setMyRef(r);
          }}
        >
          {startTime !== "" && <button onClick={closeCalendar}>Đồng ý</button>}
        </DatePicker>

        <div className="deal-form-button">
          {startTime !== "" && (
            <button type="submit" disabled={startTime === "" ? true : false}>
              Đặt
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setTrigger((value) => !value);
            }}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default Appointment;
