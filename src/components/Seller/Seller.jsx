import React, { useContext } from "react";
import { Context } from "../../ChatContext";
import { fb } from "../../services";

export const Seller = () => {
  const username = fb.auth.currentUser.displayName;
  return <div>{username}</div>;
};
