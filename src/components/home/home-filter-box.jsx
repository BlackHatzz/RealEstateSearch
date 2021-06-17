import React, { Component } from "react";
import { FaLastfmSquare } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import "../global/shared.css";
import HomeFilterMenuOption from "./home-filter-menu-option";

class HomeFilterBox extends Component {
  state = {
    showMenu: false,
  };

  switchToggle = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  };

  showMenu = () => {
    if (this.state.showMenu) {
      return (
        <HomeFilterMenuOption />
      );
    }
  };

  render() {
    return (
      <div>
        {/* <Multiselect options={this.state.options} singleSelect displayValue="name" /> */}
        <div onClick={this.switchToggle} className="home-filter-box">
          <span className="noselect home-filter-title">{this.props.title}</span>
          <RiArrowDropDownLine className="home-filter-icon" />
        </div>

        {this.state.showMenu ? (<HomeFilterMenuOption />) : null}

      </div>
    );
  }
}

export default HomeFilterBox;
