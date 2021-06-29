import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../ChatContext";
export const Role = () => {
  const { updateRole } = useContext(Context);
  return (
    <div>
      select role
      <Link
        to={{
          pathname: "/",
        }}
      >
        <div
          onClick={() => {
            updateRole("buyer");
          }}
        >
          Buyer
        </div>
      </Link>
      <Link
        to={{
          pathname: "/sell",
        }}
      >
        <div
          onClick={() => {
            updateRole("seller");
          }}
        >
          Seller
        </div>
      </Link>
    </div>
  );
};
