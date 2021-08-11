import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../ChatContext";
import { fb } from "../../services";
import "./role.css";
export const Role = () => {
  const { role, updateSellerRole, updateBuyerRole } = useContext(Context);
  let history = useHistory();
  const user = fb.auth.currentUser;
  useEffect(() => {
    // user.updateProfile({
    //   displayName: "Lê Đình Cảm",
    //   photoURL:
    //     "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR807cHsETx7njAkAoa7O10cCy-e11rlRmEAINbO-_W-zyGgRqI",
    // });
    // console.log("role" + role);
    if (role) {
      history.push(role === "buyer" ? "/" : "/seller");
    }
  }, [history, role]);
  return (
    <div className="role">
      <h2>Bạn muốn</h2>

      <div className="role-selection">
        <div
          className="role-button"
          onClick={() => {
            updateBuyerRole();
            history.push("/");
          }}
        >
          <img
            src="https://www.zillowstatic.com/s3/homepage/static/Buy_a_home.png"
            alt=""
          />
          <p>Mua nhà</p>
        </div>
        <div
          className="role-button"
          onClick={() => {
            updateSellerRole();
            history.push("/seller");
          }}
        >
          <img
            src="https://www.zillowstatic.com/s3/homepage/static/Sell_a_home.png"
            alt=""
          />
          <p>Bán nhà</p>
        </div>
      </div>
    </div>
  );
};
