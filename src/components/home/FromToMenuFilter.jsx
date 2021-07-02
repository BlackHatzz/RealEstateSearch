import React, { Component } from "react";
import "./home.css";
import Constants from "../global/Constants";

class FromToMenuFilter extends Component {
  state = {
    options: [
      { key: 1, value: "Chung cư" },
      { key: 2, value: "Nhà phố" },
      { key: 3, value: "Đất" },
    ],
    fromText: null,
    toText: null,
  };

  handleSelectFilterOption = (key, title) => {
    this.props.handler(key, title);
    // this.props.options.map(option)
  };

  handleFromToForm = () => {
    console.log("confirm");
    const fromText = document.getElementById("fromInput").value;
    const toText = document.getElementById("toInput").value;
    console.log(fromText);
    console.log(toText);
    this.props.handler(
      -1,
      fromText.toString() +
        Constants.squareMeter +
        " - " +
        toText.toString() +
        Constants.squareMeter
    );
  };

  render() {
    return (
      // <React.Fragment>
      //   <div className="menu"></div>
      // </React.Fragment>
      // <div class="menu"></div>
      <div className="home-filter-menu-height-auto">
        {/* <input className="home-slider" defaultValue="50" type="range" min="1" max="100"></input> */}
        {/* <Slider /> */}
        {/* <input type="range" min="1" max="100" value="50"></input> */}

        {this.props.options.map((option) => (
          <div key={option.key}>
            <div
              onClick={() =>
                this.handleSelectFilterOption(option.key, option.text)
              }
              className="noselect home-filter-menu-option"
            >
              <div className="noselect home-filter-menu-option-title">
                {option.text}
              </div>
            </div>
            <div className="home-filter-menu-option-divide"></div>
          </div>
        ))}
        <div>
          <div className="noselect home-filter-from-to-option">
            <form className="home-filter-from-to-container">
              <span className="title">Từ</span>
              <div className="home-filter-input-container">
                <input
                  id="fromInput"
                  type="text"
                  placeholder={Constants.squareMeter}
                />
              </div>
              <span className="title">Tới</span>
              <div className="home-filter-input-container">
                <input
                  id="toInput"
                  type="text"
                  placeholder={Constants.squareMeter}
                />
              </div>

              <div
                onClick={this.handleFromToForm}
                type="submit"
                className="confirm"
              >
                Xác nhận
              </div>

              {/* <div className="noselect home-filter-menu-option-title">
                zzzz
              </div> */}
            </form>
          </div>
          {/* <div className="home-filter-menu-option-divide"></div> */}
        </div>
      </div>
    );
  }
}

export default FromToMenuFilter;
