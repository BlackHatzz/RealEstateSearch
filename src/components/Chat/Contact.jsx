import React, { useState, useEffect } from "react";

export const Contact = ({ id, data}) => {
  var [selectedItem, setSelectedItem] = useState(false);
  // selectedItem = false;
  return (
    <div
      className={"contact_item"}
      onClick={() => {
        console.log(data);
        setSelectedItem(true);
        //+ (selectedItem ? "selected-contact-item" : "")
        // console.log(selectedContactItem(conversations, conversation));
      }}
      tabIndex="0"
    >
      {/* <div className="presentation-pic-container">
        <img src="https://file4.batdongsan.com.vn/crop/350x232/2021/06/13/20210613112547-abeb_wm.jpg" alt="" />
      </div> */}
      <div id={id} className={"right-content-container"}>
      {/* <h4>Bất Động Sản: Vinhome</h4>
        <span>Seller: Hello</span> */}
        <h4>{data.title}</h4>
        <p>{data.seller}</p>
      </div>
    </div>
  );
};
