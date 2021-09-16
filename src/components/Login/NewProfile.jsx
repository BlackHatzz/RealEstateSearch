import { Form, Formik, Field } from "formik";
import { useState } from "react";
import { ProfileFormField } from "./ProfileFormField";
import { validationSchema, defaultValues } from "./formikConfig";
import { fb } from "../../services";
import "./newProfile.css";
import { useHistory } from "react-router-dom";

const NewProfile = () => {
  const user = fb.auth.currentUser;
  let history = useHistory();

  const [avatar, setAvatar] = useState(null);

  const updateProfile = ({ avatar, displayName, email }, { setSubmitting }) => {
    if (avatar) {
      const uploadTask = fb.storage
        .ref(`images/${user.uid}/${avatar.name}`)
        .put(avatar);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log("error upload avatar", error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            fb.firestore
              .collection("users")
              .doc(user.uid + "")
              .set({
                uuid: user.uid,
                displayName: displayName,
                email: email,
                phoneNumber: user.phoneNumber,
                photoURL: downloadURL + "",
                role: "customer",
              })
              .then(() => {
                fetch("https://api-realestate.top/apis/v1/accounts/create", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: user.uid,
                    phone: user.phoneNumber,
                    fullname: displayName,
                    email: email,
                    status: "active",
                    avatar: downloadURL,
                    roleId: 4,
                  }),
                })
                  .then((response) => {
                    if (response.ok) {
                      fb.auth.currentUser
                        .updateProfile({
                          displayName: displayName,
                          photoURL: downloadURL + "",
                          email: email,
                        })
                        .catch((error) => {
                          console.log("error update firebase account", error);
                        });
                    }
                  })
                  .catch((error) => {
                    console.log("error update profile to database", error);
                  });
              })
              .catch((error) => {
                console.log("error update profile to firestore", error);
              })
              .finally(() => {
                setSubmitting(false);
                history.push("/role");
              });
          });
        }
      );
    } else {
      fb.firestore
        .collection("users")
        .doc(user.uid + "")
        .set({
          uuid: user.uid,
          displayName: displayName,
          email: email,
          phoneNumber: user?.phoneNumber,
          photoURL: "",
          role: "customer",
        })
        .then(() => {
          fetch("https://api-realestate.top/apis/v1/accounts/create", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: user.uid,
              phone: user?.phoneNumber,

              fullname: displayName,
              email: email,
              status: "active",
              avatar: "",
              roleId: 4,
            }),
          })
            .then((response) => {
              if (response.ok) {
                fb.auth.currentUser
                  .updateProfile({
                    displayName: displayName,

                    email: email,
                  })
                  .catch((error) => {
                    console.log("error update firebase account", error);
                  });
              }
            })
            .catch((error) => {
              console.log("error update profile to database", error);
            });
        })
        .catch((error) => {
          console.log("error update profile to firestore", error);
        })
        .finally(() => {
          setSubmitting(false);
          history.push("/role");
        });
    }
  };

  return (
    <div className="new-profile-main">
      <div className="new-profile-form-wrapper">
        <div className="new-profile-logo">
          <img src="https://i.ibb.co/cXDw5FW/logo.png" alt="" />
        </div>
        <p className="new-profile-form-title">
          Vui lòng cập nhật thông tin cá nhân
        </p>
        <Formik
          onSubmit={updateProfile}
          validateOnMount={true}
          initialValues={defaultValues}
          validationSchema={validationSchema}
        >
          {({ isValid, isSubmitting, setFieldValue }) => (
            <Form>
              <h2 className="profile-label">Tên hiển thị</h2>
              <ProfileFormField
                name="displayName"
                type="text"
                placeholder="Tên hiển thị có độ dài 6-30 ký tự..."
                maxlength="30"
                size="26"
              />
              <h2 className="profile-label">Email</h2>
              <ProfileFormField
                name="email"
                type="email"
                placeholder="Nhập email của bạn ..."
                size="25"
              />
              <h2 className="profile-label">Chọn ảnh đại diện</h2>

              <div className="profile-avatar-preview">
                {!!avatar ? (
                  <img src={URL.createObjectURL(avatar)} alt="" />
                ) : (
                  <img src={user.photoURL} alt="" />
                )}
              </div>
              <input
                name="avatar"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setFieldValue("avatar", event.target.files[0]);
                  setAvatar(event.target.files[0]);
                }}
              />

              <button
                className="update-profile-btn"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Cập nhật
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewProfile;
