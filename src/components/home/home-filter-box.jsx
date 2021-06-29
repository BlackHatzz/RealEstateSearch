import React, { Component } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import "../global/shared.css";
import HomeFilterMenuOption from "./home-filter-menu-option";

class HomeFilterBox extends Component {
  state = {
    showMenu: false,
    title: "",
  };

  switchToggle = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  };
  componentDidMount() {
    this.setState({
      title: this.props.filter.title,
    });
  }

  handleUpdateTitle = (itemKey, title) => {
    this.setState({
      title: title,
      showMenu: false,
    });
    this.props.handler(this.props.filter.key, itemKey, title);
  };

  render() {
    return (
      <div>
        {/* <Multiselect options={this.state.options} singleSelect displayValue="name" /> */}
        <div onClick={this.switchToggle} className="home-filter-box">
          <div className="home-filter-title-container">
            <span className="noselect home-filter-title">
              {this.props.filter.filterName}
            </span>
            <br />
            <span className="noselect home-filter-title2">
              {this.state.title}
            </span>
          </div>

          <RiArrowDropDownLine className="home-filter-icon" />
        </div>
        {/* <HomeFilterMenuOption /> */}
        {this.state.showMenu ? (
          <HomeFilterMenuOption
            handler={this.handleUpdateTitle}
            options={this.props.filter.options}
          />
        ) : null}
      </div>
    );
  }
}

export default HomeFilterBox;
