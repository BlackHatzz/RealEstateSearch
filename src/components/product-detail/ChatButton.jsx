import React, { useContext } from "react";
import { Context } from "../../ChatContext";
import { fb } from "../../services";

export const ChatButton = (props) => {
  const currentDate = new Date();
  const { updateChat } = useContext(Context);
  const { updateOpen } = useContext(Context);
  const handleConversation = () => {
    const uuid = fb.auth.currentUser.uid;
    const buyername = fb.auth.currentUser.displayName;
    const address =
      props.product.streetName +
      ", Phường " +
      props.product.wardName +
      ", " +
      props.product.disName;

    const reqUrl = `http://realestatebackend-env.eba-9zjfbgxp.ap-southeast-1.elasticbeanstalk.com/apis/v1/conversations/messages?%20realEstateId=${props.product.id}&buyerId=${uuid}&sellerId=${props.product.sellerId}`;
    fetch(reqUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        fb.firestore
          .collection("conversations")
          .doc("" + data.id)
          .set({
            lastvisit: currentDate.toUTCString(),
            title: props.product.title,
            realId: props.product.id,
            address: address,
            seller: props.product.sellerName,
            sellerId: props.product.sellerId,
            buyerId: uuid,
            buyer: buyername,
            price: props.product.price,
            area: props.product.area,
            bed: props.product.numberOfBedroom,
            bath: props.product.numberOfBathroom,
            deal: "none",
            dealId: "",
            appointment: "none",
            appointmentId: "",
          });

        updateOpen();
        updateChat(data.id + "");
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
