import React, { useState, useEffect } from "react";
import { fb } from "../../services";
import "./profile.css";
import "./profile-mobile.css";
import "../global/shared.css";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import { GrContactInfo } from "react-icons/gr";
import { AiFillIdcard } from "react-icons/ai";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import Constants from "../global/Constants";
import Modal from "@material-ui/core/Modal";
import { ProfileFormField } from "../Login/ProfileFormField";
import { validationSchema, defaultValues } from "../Login/formikConfig";
import { Form, Formik, Field } from "formik";

const ProfilePage = () => {
  const user = fb.auth.currentUser;
  const [isEditing, setIsEditing] = useState(false);
  const [modalopen, setModalOpen] = useState(false);
  const [data, setData] = useState();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    fb.firestore
      .collection("users")
      .doc(user.uid + "")
      .onSnapshot((doc) => {
        setData(doc.data());
      });
  }, [user.uid]);

  const updateProfile = ({ avatar, displayName, email }, { setSubmitting }) => {
    if (avatar) {
      console.log("avatar", avatar);
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
                    username: user?.phoneNumber,
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
                setModalOpen(false);
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
          photoURL: data?.photoURL,
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
              username: user?.phoneNumber,
              fullname: displayName,
              email: email,
              status: "active",
              avatar: data?.photoURL,
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
          setModalOpen(false);
        });
    }
  };

  return (
    <>
      {true && (
        <div className="profile-wrapper">
          <div style={{ height: "10px" }}></div>

          <div className="profile-container">
            <div style={{ height: "15px" }}></div>
            <div className="profile-pic-container">
              <img src={data?.photoURL} alt="" />
            </div>
            <div style={{ height: "15px" }}></div>

            <div className="divide"></div>

            <div className="profile-pic-tab-bar-container">
              <div className="item">
                <span className="title">Thông Tin Hồ Sơ</span>
              </div>
            </div>

            <div className="profile-content-container">
              <div className="row">
                <div className="silver-circle">
                  <GrContactInfo className="icon" />
                </div>
                <span className="title">Tên hiển thị</span>
                <div
                  className={
                    isEditing
                      ? "solid-field-container"
                      : "read-only-solid-field-container"
                  }
                >
                  <input
                    value={data?.displayName}
                    type="text"
                    className="solid-field"
                  />
                </div>
              </div>

              <div className="row">
                <div className="silver-circle">
                  <PhoneIcon className="icon" />
                </div>
                <span className="title">Số điện thoại</span>
                <div
                  className={
                    isEditing
                      ? "solid-field-container"
                      : "read-only-solid-field-container"
                  }
                >
                  <input
                    value={data?.phoneNumber}
                    type="text"
                    className="solid-field"
                  />
                </div>
              </div>

              <div className="row">
                <div className="silver-circle">
                  <MailIcon className="icon" />
                </div>
                <span className="title">E-mail</span>
                <div
                  className={
                    isEditing
                      ? "solid-field-container"
                      : "read-only-solid-field-container"
                  }
                >
                  <input
                    value={data?.email}
                    type="text"
                    className="solid-field"
                  />
                </div>
              </div>
            </div>

            <button
              className="update-profile-btn"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Sửa
            </button>

            {true && (
              <Modal
                open={modalopen}
                //   onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <div className="update-info-modal">
                  <h5 id="simple-modal-title">Cập nhật thông tin cá nhân</h5>

                  <Formik
                    onSubmit={updateProfile}
                    validateOnMount={true}
                    initialValues={{
                      email: data?.email,
                      displayName: data?.displayName,
                      avatar: null,
                    }}
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
                          size="26"
                        />
                        <h2 className="profile-label">Ảnh đại diện</h2>
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

                        <div className="transaction-modal-button-group">
                          <button
                            className="update-profile-btn"
                            type="submit"
                            disabled={!isValid || isSubmitting}
                          >
                            Cập nhật
                          </button>
                          <button
                            className="update-profile-btn"
                            onClick={() => {
                              setModalOpen(false);
                            }}
                          >
                            Đóng
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Modal>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
