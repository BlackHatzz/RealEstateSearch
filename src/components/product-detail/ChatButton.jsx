import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fb } from "../../services";

export const ChatButton = (props) => {
  const currentDate = new Date();

  const handleConversation = () => {
    console.log("click");
    const uuid = fb.auth.currentUser.uid;
    const reqUrl = `http://localhost:8080/apis/v1/conversations/messages?%20realEstateId=${props.product.id}&buyerId=${uuid}&sellerId=${props.product.sellerId}`;
    fetch(reqUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log("id?" + data.id);
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
          });
        console.log("????");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Link
      className="link contact-title-container"
      to={{
        pathname: "/chat-page",
        state: { real: props.product.id, seller: props.product.sellerId },
      }}
      onClick={handleConversation}
    >
      <div className="contact-title-container">&#32; Nhắn tin</div>
    </Link>
  );
};
