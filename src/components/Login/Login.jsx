import { fb } from "../../services";
import { useState, useEffect, useContext } from "react";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import { FormField } from "../FormField";
import { validationSchema, defaultValues } from "./formikConfig";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { Context } from "../../ChatContext";
import "./login.css";
// import { useStateValue } from "../../StateProvider";
// import { actionTypes } from "../../reducer";

export const Login = () => {
  // const [{}, dispatch] = useStateValue();
  const [serverError, setServerError] = useState("");
  let history = useHistory();
  const { triggerNewUser } = useContext(Context);

  useEffect(() => {
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          var user = authResult.user;
          var credential = authResult.credential;
          var isNewUser = authResult.additionalUserInfo.isNewUser;
          var providerId = authResult.additionalUserInfo.providerId;
          var operationType = authResult.operationType;

          if (isNewUser) {
            console.log("new user");
            history.push("/new-profile");
            triggerNewUser(true);
            // fb.firestore
            //   .collection("users")
            //   .doc(user.uid)
            //   .set({
            //     uuid: user.uid,
            //     userName: user.phoneNumber,
            //     phoneNumber: user.phoneNumber,
            //     photoURL: user.photoURL + "",
            //     role: "customer",
            //   });

            // fb.auth.currentUser.updateProfile({
            //   displayName: user.phoneNumber,
            //   photoURL: "",
            // });

            // createUser(user);
          }

          return true;
        },
      },
      signInOptions: [
        {
          provider: fb.phoneProvider,
          recaptchaParameters: {
            type: "image",
            size: "compact",
            badge: "bottomleft",
          },
          defaultCountry: "VN",
        },
      ],

      // signInSuccessUrl: "https://youtube.com",
      // Terms of service url.
      // tosUrl: '<your-tos-url>',
      // Privacy policy url.
      // privacyPolicyUrl: '<your-privacy-policy-url>'
    };
    var ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(fb.auth);
    ui.start("#firebaseui-auth-container", uiConfig);
    return () => {
      console.log("use effect run finished");
    };
  }, []);

  async function createUser(user) {
    const res = await fetch(
      "https://api-realestate.top/apis/v1/accounts/create",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.uid,
          phone: user.phoneNumber,
          username: "user" + user.phoneNumber,
          status: "active",
          roleId: 4,
        }),
      }
    );

    res
      .json()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  const login = ({ email, password }, { setSubmitting }) => {
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (!res.user) {
          setServerError(
            "???? x???y ra l???i trong l??c ????ng nh???p, xin vui l??ng th??? l???i sau"
          );
        }
        // dispatch({
        //   type: actionTypes.SET_USER,
        //   user: res.user,
        // });
      })
      .catch((err) => {
        if (err.code === "auth/wrong-password") {
          setServerError("Sai m???t kh???u");
        } else if (err.code === "auth/user-not-found") {
          setServerError("Email ch??a ????ng k?? t??i kho???n");
        } else {
          setServerError("???? x???y ra l???i :(");
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="auth-form-container">
      <div className="login-logo">
        <img src="https://i.ibb.co/cXDw5FW/logo.png" alt="" />
      </div>
      <div id="firebaseui-auth-container" />
      {/* <div className="auth-form">
        <h1 className="title">????ng Nh???p</h1>
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
                placeholder="Nh???p email c???a b???n..."
              />
              <h2 className="label">M???t Kh???u</h2>
              <FormField
                name="password"
                type="password"
                placeholder="Nh???p m???t kh???u c???a b???n..."
              />

              <div className="auth-link-container">
                B???n ch??a c?? t??i kho???n?{" "}
                <span
                  className="auth-link"
                  onClick={() => history.push("signup")}
                >
                  ????ng k?? ngay!
                </span>
              </div>

              <button
                className="login-btn"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                ????ng Nh???p
              </button>
            </Form>
          )}
        </Formik>

        {!!serverError && <div className="error">{serverError}</div>}
      </div> */}
    </div>
  );
};
