import { fb } from "../../services";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormField } from "../FormField";
import { defaultValues, validationSchema } from "./formikConfig";

export const Signup = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState("");

  const signup = ({ email, userName, password }, { setSubmitting }) => {
    fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (res?.user?.uid) {
          // fetch("/api/createUser", {
          //   method: "POST",
          //   body: JSON.stringify({
          //     userName,
          //     userId: res.user.uid,
          //   }),
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          // })
          //   .then(() => {
          // res.user.updateProfile({
          //   displayName: userName,
          // });
          fb.auth.currentUser.updateProfile({
            displayName: userName,
          });
          fb.firestore
            .collection("users")
            .doc(res.user.uid)
            .set({ userName, avatar: "" });
          // fb.firestore
          //   .collection("users")
          //   .doc(res.user.uid)
          //   .collection("conversations")
          //   .doc("chatdummy")
          //   .collection("messages")
          //   .doc("messagedummy")
          //   .set({
          //     message: "dummy",
          //   });
          // })
        } else {
          setServerError(
            "We're having trouble signing you up. Please try again."
          );
        }
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setServerError("An account with this email already exists");
        } else {
          setServerError(
            "We're having trouble signing you up. Please try again."
          );
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <h1 className="title">Đăng Ký</h1>
        <Formik
          onSubmit={signup}
          validateOnMount={true}
          initialValues={defaultValues}
          validationSchema={validationSchema}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <h2 className="label">Tên tài khoản</h2>
              <FormField name="userName" placeholder="Nhập tên tài khoản..." />
              <h2 className="label" >Email</h2>
              <FormField name="email" type="email" placeholder="Nhập email..." />
              <h2 className="label">Mật khẩu</h2>
              <FormField name="password" type="password" placeholder="Nhập mật khẩu..." />
              <h2 className="label">Xác nhận mật khẩu</h2>
              <FormField
                type="password"
                name="verifyPassword"
                placeholder="Nhập lại mật khẩu..."
              />

              <div className="auth-link-container">
                Bạn đã có tài khoản?{" "}
                <span
                  className="auth-link"
                  onClick={() => history.push("login")}
                >
                  Đăng nhập ngay!
                </span>
              </div>

              <button disabled={isSubmitting || !isValid} type="submit">
                Đăng Ký
              </button>
            </Form>
          )}
        </Formik>

        {!!serverError && <div className="error">{serverError}</div>}
      </div>
    </div>
  );
};
