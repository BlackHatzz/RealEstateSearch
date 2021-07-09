import React, { Component } from "react";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   geocodeByPlaceId,
//   getLatLng,
// } from "react-places-autocomplete";
import "./manage-post.css";
import PostAddIcon from "@material-ui/icons/PostAdd";
import HistoryIcon from "@material-ui/icons/History";
import { GrTransaction } from "react-icons/gr";
import SellerNavbar from "./SellerNavBar";
import "../global/shared.css";
import { fb } from "../../services/firebase";
import Constants from "../global/Constants";
import ManagePost from "./ManagePost";

class SellerDashboard extends Component {
  state = {
    selectedItem: 1,
    items: [
      {
        key: 1,
        title: "Quản lý bài viết",
        icon: (
          <PostAddIcon
            id={"seller-dashboard-icon1"}
            className="seller-dashboard-el icon"
          />
        ),
      },
      {
        key: 2,
        title: "Lịch sử giao dịch",
        icon: (
          <HistoryIcon
            id={"seller-dashboard-icon2"}
            className="seller-dashboard-el icon"
          />
        ),
      },
    ],
  };

  handleSelectTab = (key) => {
    const list = document.getElementsByClassName("alone-selected");
    const list2 = document.getElementsByClassName("box");
    for (var i = 0; i < list.length; i++) {
      list[i].style.backgroundColor = "white";
    }
    for (var i = 0; i < list2.length; i++) {
      list2[i].style.backgroundColor = "white";
    }

    const list3 = document.getElementsByClassName("seller-dashboard-el");
    for (var i = 0; i < list3.length; i++) {
      list3[i].style.color = "black";
    }

    this.state.selectedItem = key;

    this.handleStyleForSelectedItem();

    // document.getElementById(
    //   "alone-selected" + key.toString()
    // ).style.backgroundColor = "black";
    // document.getElementById("box" + key.toString()).style.backgroundColor =
    //   "black";
    // document.getElementById(
    //   "seller-dashboard-title" + key.toString()
    // ).style.color = "white";
    // document.getElementById(
    //   "seller-dashboard-icon" + key.toString()
    // ).style.color = "white";
  };

  handleStyleForSelectedItem = () => {
    const key = this.state.selectedItem;

    document.getElementById(
      "alone-selected" + key.toString()
    ).style.backgroundColor = "black";

    document.getElementById("box" + key.toString()).style.backgroundColor =
      "black";

    document.getElementById(
      "seller-dashboard-title" + key.toString()
    ).style.color = "white";

    document.getElementById(
      "seller-dashboard-icon" + key.toString()
    ).style.color = "white";
  };

  componentDidMount() {
      this.handleStyleForSelectedItem();
  }

  render() {
    return (
      <React.Fragment>
        <div className="seller-wrapper">
          <div className="left-container">
            <div className="logo-container">
              <div className="logo-box"></div>
            </div>

            {this.state.items.map((item) => (
              <div
                key={item.key}
                onClick={() => this.handleSelectTab(item.key)}
                className="item"
              >
                <div className="alone-selected-container">
                  <div
                    id={"alone-selected" + item.key.toString()}
                    className="alone-selected"
                  ></div>
                </div>
                <div id={"box" + item.key.toString()} className="box">
                  {item.icon}
                  <span
                    id={"seller-dashboard-title" + item.key.toString()}
                    className="seller-dashboard-el"
                  >
                    {item.title}
                  </span>
                </div>
              </div>
            ))}

            {/* <div onClick={this.handleSelectTab} className="item">
              <div className="alone-selected-container">
                <div className="alone-selected"></div>
              </div>
              <div className="box">
                <PostAddIcon className="seller-dashboard-el icon" />
                <span className="seller-dashboard-el">Manage Post</span>
              </div>
            </div>

            <div className="item">
              <div className="alone-selected-container">
                <div className="alone-selected"></div>
              </div>
              <div className="box">
                <HistoryIcon className="seller-dashboard-el icon" />
                <span className="seller-dashboard-el">Trasaction History</span>
              </div>
            </div> */}
          </div>

          <div className="right-container">
            <SellerNavbar />
            <div className="divide"></div>

            <div className="content-container">
              <ManagePost />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SellerDashboard;
