import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../ChatContext";
import "./role.css";
export const Role = () => {
  const { role, updateSellerRole, updateBuyerRole } = useContext(Context);
  let history = useHistory();
  useEffect(() => {
    console.log("role" + role);
    if (role) {
      history.push(role === "buyer" ? "/" : "/seller-search-post");
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
            history.push("/seller-search-post");
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
