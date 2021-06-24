import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fb } from "../../services";

export const ChatButton = (props) => {
  const currentDate = new Date();
  const handleConversation = () => {
    console.log("click");
    const uuid = fb.auth.currentUser.uid;
    const buyername = fb.auth.currentUser.displayName;
    if (uuid !== "fSUJL0Vjoraru92zOuLbp0Rcff32") {
      const reqUrl = `http://localhost:8080/apis/v1/conversations/messages?%20realEstateId=${props.product.id}&buyerId=${uuid}&sellerId=${props.product.sellerId}`;
      fetch(reqUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          fb.firestore
            .collection("users")
            .doc(uuid)
            .collection("conversations")
            .doc("con" + data.id)
            .set({
              lastvisit: currentDate.toUTCString(),
              title: props.product.title,
              seller: props.product.sellerName,
              sellerId: props.product.sellerId,
              realId: props.product.id,
              buyerId: uuid,
              buyer: buyername,
            });

          fb.firestore
            .collection("users")
            .doc(props.product.sellerId)
            .collection("conversations")
            .doc("con" + data.id)
            .set({
              lastvisit: currentDate.toUTCString(),
              title: props.product.title,
              seller: props.product.sellerName,
              sellerId: props.product.sellerId,
              buyerId: uuid,
              realId: props.product.id,
              buyer: buyername,
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <Link
      className="link contact-title-container"
      to={{
        pathname: "/chat-page",
      }}
      onClick={handleConversation}
    >
      <div className="contact-title-container">&#32; Nhắn tin</div>
    </Link>
  );
};
