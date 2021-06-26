import React, { Component } from "react";
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
          <div className="home-filter-title-container">
          <span className="noselect home-filter-title">{this.props.filterName}</span>
          <br />
          <span className="noselect home-filter-title2">{this.props.title}</span>
          </div>
          
          <RiArrowDropDownLine className="home-filter-icon" />
        </div>
        {/* <HomeFilterMenuOption /> */}
        {this.state.showMenu ? (<HomeFilterMenuOption options={this.props.options} />) : null}

      </div>
    );
  }
}

export default HomeFilterBox;
