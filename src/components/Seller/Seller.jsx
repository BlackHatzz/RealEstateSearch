import React from "react";
import { fb } from "../../services";

export const Seller = () => {
  const username = fb.auth.currentUser.displayName;
  return <div>{username}</div>;
};
