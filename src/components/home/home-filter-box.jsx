import React, { Component } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import "../global/shared.css";
import FromToMenuFilter from "./FromToMenuFilter";
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
    this.props.handler(
      this.props.filter.key,
      this.props.filter.typeKey,
      itemKey,
      title
    );
  };

  renderFilterMenu = () => {
    switch (this.props.filter.typeKey) {
      case 0:
        console.log("normal");
        return (
          <HomeFilterMenuOption
            handler={this.handleUpdateTitle}
            options={this.props.filter.options}
          />
        );
      case 1:
        console.log("special");
        return (
          <FromToMenuFilter
            handler={this.handleUpdateTitle}
            options={this.props.filter.options}
            sign={this.props.filter.sign}
          />
        );

      default:
        break;
    }
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
            {(() => {
              if(this.state.title.length > 12) {
                return (
                  <span style={{fontSize: "13px", paddingLeft: "0px"}} className="noselect home-filter-title2">
                    {this.state.title}
                  </span>
                ); 
              }
              return (
                <span className="noselect home-filter-title2">
                  {this.state.title}
                </span>
              );
            })()}
          </div>

          <RiArrowDropDownLine className="home-filter-icon" />
        </div>
        {/* <HomeFilterMenuOption /> */}
        {this.state.showMenu ? this.renderFilterMenu() : null}
        {/* {this.state.showMenu ? (
          <HomeFilterMenuOption
            handler={this.handleUpdateTitle}
            options={this.props.filter.options}
          />
        ) : null} */}
      </div>
    );
  }
}

export default HomeFilterBox;
