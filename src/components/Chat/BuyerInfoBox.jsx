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
      <p>Điện thoại</p>
      <p>{chat?.data?.buyerPhone}</p>
      <p>Thỏa thuận</p>
      {chat?.data?.deal === undefined && <p>chưa có</p>}
      {chat?.data?.deal === "pending" && (
        <p>{chat?.data?.dealPrice} tỷ (đang chờ)</p>
      )}
      {chat?.data?.deal === "accepted" && (
        <p>{chat?.data?.dealPrice} tỷ (đã chấp nhận)</p>
      )}
      {chat?.data?.deal === "refused" && (
        <div>
          <p>{chat?.data?.dealPrice} tỷ (bạn đã từ chối)</p>
          <p>Lý do: {chat?.data?.dealReason}</p>
        </div>
      )}
      <p>Lịch hẹn</p>
      {chat?.data?.appointment === undefined && <p>chưa có</p>}
      {chat?.data?.appointment === "upcoming" && (
        <p>{moment(chat?.data?.appointmentDate).locale("vi").format("LLLL")}</p>
      )}
    </div>
  );
};
