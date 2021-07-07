import { fb } from "../../services";
import { useState } from "react";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import { FormField } from "../FormField";
import { validationSchema, defaultValues } from "./formikConfig";
// import { useStateValue } from "../../StateProvider";
// import { actionTypes } from "../../reducer";

export const Login = () => {
  const history = useHistory();
  // const [{}, dispatch] = useStateValue();
  const [serverError, setServerError] = useState("");

  const login = ({ email, password }, { setSubmitting }) => {
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (!res.user) {
          setServerError(
            "Đã xảy ra lỗi trong lúc đăng nhập, xin vui lòng thử lại sau"
          );
        }
        // dispatch({
        //   type: actionTypes.SET_USER,
        //   user: res.user,
        // });
      })
      .catch((err) => {
        if (err.code === "auth/wrong-password") {
          setServerError("Sai mật khẩu");
        } else if (err.code === "auth/user-not-found") {
          setServerError("Email chưa đăng ký tài khoản");
        } else {
          setServerError("Đã xảy ra lỗi :(");
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <h1 className="title">Đăng Nhập</h1>
        <Formik
          onSubmit={login}
          validateOnMount={true}
          initialValues={defaultValues}
          validationSchema={validationSchema}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <h2 className="label">Email</h2>
              <FormField
                name="email"
                type="email"
                placeholder="Nhập email của bạn..."
              />
              <h2 className="label">Mật Khẩu</h2>
              <FormField
                name="password"
                type="password"
                placeholder="Nhập mật khẩu của bạn..."
              />

              <div className="auth-link-container">
                Bạn chưa có tài khoản?{" "}
                <span
                  className="auth-link"
                  onClick={() => history.push("signup")}
                >
                  Đăng ký ngay!
                </span>
              </div>

              <button
                className="login-btn"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Đăng Nhập
              </button>
            </Form>
          )}
        </Formik>

        {!!serverError && <div className="error">{serverError}</div>}
      </div>
    </div>
  );
};
