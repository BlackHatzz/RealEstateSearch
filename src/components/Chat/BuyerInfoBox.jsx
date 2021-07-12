import React, { useState, useEffect } from "react";
import { fb } from "../../services";
import moment from "moment";
import "moment/locale/vi";

export const BuyerInfoBox = ({ selectedChat }) => {
  const [chat, setChat] = useState();

  useEffect(() => {
    let unsubscribe = () => {};
    if (selectedChat) {
      console.log(selectedChat.id);
      unsubscribe = fb.firestore
        .collection("conversations")
        .doc(selectedChat.id)
        .onSnapshot((snap) => {
          setChat({
            id: snap.id,
            data: snap.data(),
          });
        });
    }
    return () => {
      unsubscribe();
    };
  }, [selectedChat]);

  return (
    <div className="seller-chat-box-body-right">
      <p className="info-title">Điện thoại</p>
      <p className="info-text">{chat?.data?.buyerPhone}</p>
      <p className="info-title">Thỏa thuận</p>
      {chat?.data?.deal === undefined && <p className="info-text">chưa có</p>}
      {chat?.data?.deal === "pending" && (
        <p className="info-text">{chat?.data?.dealPrice} tỷ (đang chờ)</p>
      )}
      {chat?.data?.deal === "accepted" && (
        <p className="info-text">{chat?.data?.dealPrice} tỷ (đã chấp nhận)</p>
      )}
      {chat?.data?.deal === "refused" && (
        <div>
          <p className="info-text">
            {chat?.data?.dealPrice} tỷ (bạn đã từ chối)
          </p>
          <p className="info-text">Lý do: {chat?.data?.dealReason}</p>
        </div>
      )}
      <p className="info-title">Lịch hẹn</p>
      {chat?.data?.appointment === undefined && (
        <p className="info-text">chưa có</p>
      )}
      {chat?.data?.appointment === "upcoming" && (
        <div>
          <p className="info-text">
            {moment(chat?.data?.appointmentDate).locale("vi").format("LLL")}
          </p>
          <p className="info-text">
            {moment(chat?.data?.appointmentDate).fromNow()}
          </p>
        </div>
      )}
    </div>
  );
};
