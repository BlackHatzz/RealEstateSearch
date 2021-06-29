import React from "react";
import { Link } from "react-router-dom";
export const Role = () => {
  return (
    <div>
      select role
      <Link
        to={{
          pathname: "/",
        }}
      >
        <div>Buyer</div>
      </Link>
      <Link
        to={{
          pathname: "/",
        }}
      >
        <div>Seller</div>
      </Link>
    </div>
  );
};
