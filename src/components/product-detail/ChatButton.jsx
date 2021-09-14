import React, { useContext } from "react";
import { Context } from "../../ChatContext";
import { fb } from "../../services";
import firebase from "firebase/app";

export const ChatButton = (props) => {
  const currentDate = new Date();

  const { updateChat, updateOpen, addItem, addViewChat } = useContext(Context);

  const uuid = fb.auth?.currentUser?.uid;
  const handleConversation = () => {
    const buyername = fb.auth.currentUser.displayName;
    const buyerPhone = fb.auth.currentUser.phoneNumber;
    const buyerAvatar = fb.auth.currentUser.photoURL;
    const address =
      props.product.streetName +
      ", " +
      props.product.wardName +
      ", " +
      props.product.disName;

    const reqUrl = `https://api-realestate.top/apis/v1/conversations/messages?%20realEstateId=${props.product.id}&buyerId=${uuid}&sellerId=${props.product.sellerId}`;
    fetch(reqUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        // fb.firestore
        //   .collection("realestates")
        //   .doc(props.product.id + "")
        //   .set({
        //     id: props.product.id,
        //     address: address,
        //     title: props.product.title,
        //     seller: props.product.sellerName,
        //     sellerId: props.product.sellerId,
        //     area: props.product.area,
        //     bed: props.product.numberOfBedroom,
        //     bath: props.product.numberOfBathroom,
        //     price: props.product.price,
        //     chats: [],
        //   });

        fb.firestore
          .collection("realestates")
          .doc(props.product.id + "")
          .update(
            { chats: firebase.firestore.FieldValue.arrayUnion("" + data.id) },
            { merge: true }
          );
        fb.firestore
          .collection("realestates")
          .doc(props.product.id + "")
          .get()
          .then((doc) => {
            if (doc.exists) {
              fb.firestore
                .collection("conversations")
                .doc("" + data.id)
                .set(
                  {
                    lastvisit: currentDate.toUTCString(),
                    title: props.product.title,
                    realId: props.product.id,
                    realImage: props.product.images[0].imgUrl,
                    address: address,
                    seller: props.product.sellerName,
                    sellerId: props.product.sellerId,
                    buyerId: uuid,
                    buyer: buyername,
                    price: props.product.price,
                    area: props.product.area,
                    bed: props.product.numberOfBedroom,
                    bath: props.product.numberOfBathroom,
                    buyerPhone: buyerPhone,
                    buyerAvatar: buyerAvatar,
                    staffId: doc.data().staffId,
                    realIMG: props.product.images[0].imgUrl,
                    lastMessageReadBuyer: true,
                    lastMessageReadStaff: true,
                    status: "active",
                    // deal: "none",
                    // dealId: "",
                    // appointment: "none",
                    // appointmentId: "",
                  },
                  { merge: true }
                )
                .then(() => {
                  fb.firestore
                    .collection("conversations")
                    .doc("" + data.id)
                    .get()
                    .then((doc) => {
                      if (doc.exists) {
                        // let conObject = {
                        //   id: doc.id,
                        //   data: doc.data(),
                        // };

                        // addItem(conObject);
                        addViewChat(doc.id);

                        fb.firestore
                          .collection("conversations")
                          .doc(doc.id)
                          .update({
                            lastMessageReadBuyer: true,
                            lastMessageReadStaff: true,
                          });
                      }
                    });
                });
            }
          });

        // fb.firestore
        //   .collection("conversations")
        //   .doc("" + data.id)
        //   .set(
        //     {
        //       lastvisit: currentDate.toUTCString(),
        //       title: props.product.title,
        //       realId: props.product.id,
        //       realImage: props.product.images[0].imgUrl,
        //       address: address,
        //       seller: props.product.sellerName,
        //       sellerId: props.product.sellerId,
        //       buyerId: uuid,
        //       buyer: buyername,
        //       price: props.product.price,
        //       area: props.product.area,
        //       bed: props.product.numberOfBedroom,
        //       bath: props.product.numberOfBathroom,
        //       buyerPhone: buyerPhone,
        //       buyerAvatar: buyerAvatar,
        //       // deal: "none",
        //       // dealId: "",
        //       // appointment: "none",
        //       // appointmentId: "",
        //     },
        //     { merge: true }
        //   );

        updateOpen();
        updateChat(data.id + "");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {uuid === props?.product?.sellerId ? null : (
        <div className="contact-button">
          <div
            className="link contact-title-container"
            onClick={handleConversation}
          >
            <div className="contact-title-container">&#32; Nhắn tin</div>
          </div>
        </div>
      )}
    </>
  );
};
