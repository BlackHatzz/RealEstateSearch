import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import Appointment from "./Appointment";
import { FormField } from "../FormField";
import { defaultValues, validationSchema } from "./formikDealConfig";

const Realestate = () => {
  const currentDate = new Date();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [deals, setDeals] = useState([]);
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    fetch(
      "http://localhost:8080/apis/v1/conversations/messages?%20realEstateId=1&buyerId=aaaaaaaaa&sellerId=ccccccccc"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setDeals(data.deals);
        setAppointments(data.appointments);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [trigger]);

  if (loading) return "Loading...";
  if (error) return "error";
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

  function submitDeal({ deal }, { setSubmitting }) {
    fetch("http://localhost:8080/apis/apis/deals/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: 1,
        createAt: currentDate.toISOString(),
        id: 0,
        offeredPrice: deal,
        status: "waiting",
      }),
    }).then(() => {
      setTrigger((value) => !value);
    });
  }
  return (
    <div className="dealAndBook">
      <div className="deal">
        <p>Thỏa thuận (triệu VND) </p>
        {deals.length > 0 ? (
          <div>
            {deals[0].status === "waiting" && (
              <div>{deals[0].offeredPrice} - đang chờ phản hồi</div>
            )}
            {deals[0].status === "accepted" && (
              <div>{deals[0].offeredPrice} - đã được chấp nhận</div>
            )}
            {deals[0].status === "refuse" && (
              <div>{deals[0].offeredPrice} - bị từ chối</div>
            )}
          </div>
        ) : (
          <Formik
            onSubmit={submitDeal}
            validateOnMount={true}
            initialValues={defaultValues}
            validationSchema={validationSchema}
          >
            {({ isValid, isSubmitting }) => (
              <Form>
                <FormField name="deal" />
                <button disabled={isSubmitting || !isValid} type="submit">
                  tạo
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
      <div>
        <p>lịch hẹn</p>
        {appointments.length > 0 ? (
          <div>
            {appointments[0].status === "upcoming" ? (
              <div>{appointments[0].scheduleDate}</div>
            ) : (
              <Appointment trigger={trigger} setTrigger={setTrigger} />
            )}
          </div>
        ) : (
          <Appointment trigger={trigger} setTrigger={setTrigger} />
        )}
      </div>
    </div>
  );
};

export default Realestate;
