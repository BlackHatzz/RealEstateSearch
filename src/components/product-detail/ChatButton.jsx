import React, { useEffect, useContext } from "react";
import { Context } from "../../ChatContext";
import { fb } from "../../services";
import firebase from "firebase";

export const ChatButton = (props) => {
  const currentDate = new Date();
  const { chatId, updateChat } = useContext(Context);
  const { updateOpen } = useContext(Context);
  const handleConversation = () => {
    const uuid = fb.auth.currentUser.uid;
    const buyername = fb.auth.currentUser.displayName;

    const reqUrl = `http://realestatebackend-env.eba-9zjfbgxp.ap-southeast-1.elasticbeanstalk.com/apis/v1/conversations/messages?%20realEstateId=${props.product.id}&buyerId=${uuid}&sellerId=${props.product.sellerId}`;
    fetch(reqUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data.deals);
        fb.firestore
          .collection("conversations")
          .doc("" + data.id)
          .set({
            lastvisit: currentDate.toUTCString(),
            title: props.product.title,
            realId: props.product.id,
            seller: props.product.sellerName,
            sellerId: props.product.sellerId,
            buyerId: uuid,
            buyer: buyername,
            price: props.product.price,
            area: props.product.area,
            bed: props.product.numberOfBedroom,
            bath: props.product.numberOfBathroom,
          });

        // fb.firestore
        // .collection("conversations")
        // .doc("" + data.id)
        // .collection("messages")
        // .add({
        //   message: '',
        //   sender: '',
        //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        // });
        updateOpen();
        updateChat(data.id + "");
        console.log("click");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="link contact-title-container" onClick={handleConversation}>
      <div className="contact-title-container">&#32; Nhắn tin</div>
    </div>
  );
};
