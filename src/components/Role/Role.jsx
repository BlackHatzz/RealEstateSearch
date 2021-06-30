import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../ChatContext";
export const Role = () => {
  const { role, updateSellerRole, updateBuyerRole } = useContext(Context);
  return (
    <div>
      select role
      <Link
        to={{
          pathname: "/",
        }}
        onClick={updateBuyerRole}
      >
        <div>Buyer</div>
      </Link>
      <Link
        to={{
          pathname: "/sell",
        }}
        onClick={updateSellerRole}
      >
        <div>Seller</div>
      </Link>
    </div>
  );
};
