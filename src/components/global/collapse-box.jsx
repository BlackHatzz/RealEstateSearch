import React, { Component } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./shared.css";

class CollapseBox extends Component {
  state = {
    isFullMode: false,
    transform: "rotate(0deg)",
  };

  switchMode = () => {
    if (!this.state.isFullMode) {
      this.setState({
        isFullMode: true,
        transform: "rotate(180deg)",
      });
    } else {
      this.setState({
        isFullMode: false,
        transform: "rotate(0deg)",
      });
    }
  };

  render() {
    return (
      <div onClick={this.switchMode} className="noselect collapse-box">
        <div className="horizontal">
          <RiArrowDropDownLine
            style={{
              transform: this.state.transform,
              color: "rgb(100, 100, 100)",
              width: "35px",
              height: "35px",
              margin: "auto",
              position: "relative",
              top: "-8px",
            }}
          />
        </div>
      </div>
    );
  }
}

export default CollapseBox;
