import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import Appointment from "./Appointment";
import { FormField } from "../FormField";
import { defaultValues, validationSchema } from "./formikDealConfig";
import { fb } from "../../services";
import { useParams } from "react-router-dom";
import moment from "moment";

const Realestate = (props) => {
  const { conId } = useParams();
  const currentDate = new Date();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [deals, setDeals] = useState([]);

  const [appointments, setAppointments] = useState([]);
  const uuid = fb.auth.currentUser.uid;
  const [isdeal, setIsdeal] = useState(true);

  useEffect(() => {
    fetch(
      `http://localhost:8080/apis/v1/conversations/messages?%20realEstateId=${props.realId}&buyerId=${props.buyerId}&sellerId=${props.sellerId}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data.deals);
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
  }, [trigger, conId]);

  if (loading) return "Loading...";
  if (error) return "error";

  function handleAccept(id) {
    let url =
      "http://localhost:8080/apis/apis/deals/update?%20dealId=" +
      id +
      "&%20status=accepted";
    fetch(url, {
      method: "PUT",
    });
  }

  function handleRefused(id) {
    let url =
      "http://localhost:8080/apis/apis/deals/update?%20dealId=" +
      id +
      "&%20status=refused";
    fetch(url, {
      method: "PUT",
    });
  }
  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  function submitDeal({ deal }, { setSubmitting }) {
    fetch("http://localhost:8080/apis/apis/deals/create", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 0,
        conversationId: conId.slice(3),
        createAt: currentDate.toISOString(),
        offeredPrice: deal,
        status: "waiting",
      }),
    })
      .then(() => {
        setTrigger((value) => !value);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSubmitting(false));
  }
  return (
    <div className="dealAndBook">
      {uuid !== "fSUJL0Vjoraru92zOuLbp0Rcff32" ? (
        <div>
          <div className="deal">
            <div className="daLabel">Thỏa thuận (triệu VND) </div>

            {deals.length > 0 ? (
              <div>
                {deals[0].status === "waiting" && (
                  <div>{deals[0].offeredPrice} - đang chờ phản hồi</div>
                )}
                {deals[0].status === "accepted" && (
                  <div>{deals[0].offeredPrice} - đã được chấp nhận</div>
                )}
                {deals[0].status === "refused" && (
                  <div>
                    {/* <div>{deals[0].offeredPrice} - bị từ chối</div> */}
                    <Formik
                      onSubmit={submitDeal}
                      validateOnMount={true}
                      initialValues={defaultValues}
                      validationSchema={validationSchema}
                    >
                      {({ isValid, isSubmitting }) => (
                        <Form>
                          <FormField name="deal" />
                          <button
                            disabled={isSubmitting || !isValid}
                            type="submit"
                          >
                            tạo
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
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
          <div className="appointment_main">
            <div className="daLabel">Lịch hẹn</div>

            {appointments.length > 0 ? (
              <div>
                {appointments.slice(-1)[0].status === "upcoming" && (
                  <div>
                    {moment(appointments.slice(-1)[0].scheduleDate).format(
                      "DD/MM/YYYY hh:mm a"
                    )}
                  </div>
                )}
                {appointments.slice(-1)[0].status === "passed" && (
                  <div>
                    <Appointment
                      trigger={trigger}
                      setTrigger={setTrigger}
                      isDisabled={isdeal}
                    />
                  </div>
                )}
              </div>
            ) : (
              <Appointment
                trigger={trigger}
                setTrigger={setTrigger}
                isDisabled={isdeal}
              />
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="deal">
            <div className="daLabel">Thỏa thuận (triệu VND) </div>
            {deals.length > 0 ? (
              <div>
                {deals[0].status === "waiting" && (
                  <div>
                    {deals[0].offeredPrice}
                    <button onClick={() => handleAccept(deals[0].id)}>
                      Đồng ý
                    </button>
                    <button onClick={() => handleRefused(deals[0].id)}>
                      Từ chối
                    </button>
                  </div>
                )}
                {deals[0].status === "accepted" && (
                  <div>{deals[0].offeredPrice} - bạn đã chấp nhận</div>
                )}
                {deals[0].status === "refused" && (
                  <div>{deals[0].offeredPrice} - bạn đã từ chối</div>
                )}
              </div>
            ) : (
              <div>Chưa có</div>
            )}
          </div>
          <div className="appointment_main">
            <div className="daLabel">Lịch hẹn</div>

            {appointments.length > 0 ? (
              <div>
                {appointments.slice(-1)[0].status === "upcoming" && (
                  <div>
                    <p>Săp tới</p>
                    {moment(appointments.slice(-1)[0].scheduleDate).format(
                      "DD/MM/YYYY hh:mm a"
                    )}
                  </div>
                )}
                {appointments.slice(-1)[0].status === "passed" && (
                  <div>
                    <p>Đã xảy ra</p>
                    {moment(appointments.slice(-1)[0].scheduleDate).format(
                      "DD/MM/YYYY hh:mm a"
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>Chưa có</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Realestate;
