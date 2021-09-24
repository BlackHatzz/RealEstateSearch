import moment from "moment";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../ChatContext";
import { fb } from "../../services";
import { upperFirstLetter } from "../../utils/upperFirstLetter";

const Passed = () => {
  const { role } = useContext(Context);
  const uuid = fb.auth.currentUser?.uid;
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    if (uuid) {
      const unsubscribe = fb.firestore
        .collection("users")
        .doc(uuid)
        .collection("appointments")
        .where(role + "Id", "==", uuid)
        .where("status", "==", "passed")
        .orderBy("date", "desc")
        .onSnapshot((snapshot) => {
          setAppointments(
            snapshot.docs
              .filter((e) => moment().isAfter(moment(e.data().date).format()))
              .map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
          );
        });

      return () => {
        unsubscribe();
      };
    }
  }, [uuid]);

  return (
    <>
      {appointments.length ? (
        <div className="schedule-list-container">
          {appointments.map((appointment) => (
            <div className="schedule-list-item" key={appointment.id}>
              <div className="schedule-list-item-header">
                <div className="schedule-list-item-date">
                  {upperFirstLetter(
                    moment(appointment.data.date).locale("vi").format("dddd")
                  ) +
                    " " +
                    moment(appointment.data.date).locale("vi").format("LL")}
                </div>
                <p className="schedule-list-item-fromnow">
                  {moment(appointment.data.date).fromNow()}
                </p>
              </div>

              <div className="schedule-list-item-body">
                <div className="schedule-time">
                  {"Lúc " + moment(appointment.data.date).format("LT")}
                </div>
                <div className="schedule-detail">
                  <h4> {appointment.data.title}</h4>
                  <p>Địa điểm: {appointment.data.address}</p>
                  {role !== "buyer" && (
                    <p>Người hẹn : {appointment.data.buyer}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="schedule-empty">Chưa có lịch hẹn đã qua </div>
      )}
    </>
  );
};

export default Passed;
