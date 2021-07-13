import moment from "moment";
import React, { useEffect, useState } from "react";
import { fb } from "../../services";
import "./seller.css";
import Modal from "@material-ui/core/Modal";

export const SellerPost = () => {
  const uuid = fb.auth.currentUser.uid;
  const [realList, setRealList] = useState([]);

  const [reals, setReals] = useState([]);

  async function getPostById(uuid) {
    const res = await fetch(
      `https://api-realestate.top/api/v1/realEstate/getRealEstateBySellerId/${uuid}/0`
    );

    res
      .json()
      .then((res) => {
        let posts = res.content;
        setReals(posts);
        // console.log(posts);
        // let db = fb.firestore;
        // let batch = db.batch();

        // posts.forEach((doc) => {
        //   batch.set(db.collection("realestates").doc(), doc);
        // });

        // batch.commit();
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    // getPostById(uuid);
    const getPostList = fb.firestore
      .collection("realestates")
      .where("sellerId", "==", uuid)
      .onSnapshot((snap) => {
        setRealList(
          snap.docs.map((doc) => ({
            data: doc.data(),
          }))
        );
      });

    return () => {
      getPostList();
    };
  }, [uuid]);

  return (
    <div className="seller-real-list">
      <div className="seller-real-list-container">
        {realList.map((real) => (
          <div key={real.data.id}>
            <PostItem real={real} />
          </div>
        ))}
      </div>
    </div>
  );
};

const PostItem = ({ real }) => {
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  let status = real.data.status;
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSold = (e) => {
    console.log(real.data.id);
    let id = real.data.id + "";
    fb.firestore.collection("realestates").doc(id).set(
      {
        status: "closed",
        finalBuyer: e.data.buyer,
        finalBuyerId: e.data.buyerId,
        finalPrice: e.data.dealPrice,
      },
      { merge: true }
    );

    fb.firestore.collection("conversations").doc(e.id).set({
      status: "sold",
    });

    handleClose();
  };

  useEffect(() => {
    const unsubscribe = fb.firestore
      .collection("conversations")
      .where("realId", "==", real.data.id)
      .onSnapshot((snap) => {
        setConversations(
          snap.docs
            .map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
            .filter((e) => e.data.deal === "accepted")
        );
      });

    return () => {
      unsubscribe();
    };
  }, [real]);

  return (
    <div className="real-post-item">
      <p className="real-post-item-title">
        {real.data?.title} {status === "closed" && "(Đã chốt)"}
      </p>
      <p>Địa chỉ: {real.data.address}</p>
      <p>
        Giá: {real.data.price} tỷ - Diện tích: {real.data.area} m<sup>2</sup> -
        Phòng ngủ: {real.data.bed} - Nhà vệ sinh: {real.data.bath}
      </p>
      <p>Quan tâm: {real.data.chats.length}</p>
      {status === "active" && (
        <div className="real-post-item-buyer-list">
          {conversations.length > 0 && (
            <p className="real-post-item-buyer-list-header">Thỏa thuận</p>
          )}
          {conversations.map((e) => (
            <div className="real-post-item-buyer">
              <div className="real-post-item-buyer-info">
                <p>{e.data.buyer}</p>
                <p className="real-post-item-buyer-deal">
                  Thỏa thuận: {e.data.dealPrice} tỷ
                </p>
                <div className="real-post-item-buyer-book">
                  <p>Lịch hẹn: {moment(e.data.appointmentDate).calendar()}</p>
                  {/* {e.data.appointment === 'upcoming' && <p>()</p>} */}
                </div>
              </div>

              <button
                className="close-sale-button"
                type="button"
                onClick={handleOpen}
              >
                bán
              </button>

              <Modal
                open={open}
                //   onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <div className="modal-confirm">
                  <h2 id="simple-modal-title">Xác nhận bán</h2>
                  <div id="simple-modal-description">
                    <p>Người mua {e.data.buyer}</p>
                    <p className="">Thỏa thuận: {e.data.dealPrice} tỷ</p>
                  </div>
                  <div>
                    <button onClick={() => handleSold(e)}>Xác nhận</button>
                    <button onClick={handleClose}>Hủy</button>
                  </div>
                </div>
              </Modal>
            </div>
          ))}
        </div>
      )}

      {status === "closed" && (
        <div>
          <p>Người mua: {real.data.finalBuyer}</p>
          <p>Thỏa thuận mua: {real.data.finalPrice} tỷ</p>
        </div>
      )}
    </div>
  );
};
