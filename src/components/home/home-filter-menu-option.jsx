import React, { Component } from "react";

class HomeFilterMenuOption extends Component {
  state = {
    options: [
      { key: 1, value: "Chung cư" },
      { key: 2, value: "Nhà phố" },
      { key: 3, value: "Đất" },
    ],
  };

  handleSelectFilterOption = (key, title) => {
    this.props.handler(key, title);
    // this.props.options.map(option)
  }

  render() {
    const divide = {
      width: "100%",
      height: "4px",
      backgroundColor: "white",
    };
    return (
      // <React.Fragment>
      //   <div className="menu"></div>
      // </React.Fragment>
      // <div class="menu"></div>
      <div className="home-filter-menu">
        {/* <input className="home-slider" defaultValue="50" type="range" min="1" max="100"></input> */}
        {/* <Slider /> */}
        {/* <input type="range" min="1" max="100" value="50"></input> */}
        
        {this.props.options.map((option) => (
          <div key={option.key}>
            <div onClick={() => this.handleSelectFilterOption(option.key, option.text)} className="noselect home-filter-menu-option">
              <div className="noselect home-filter-menu-option-title">
                {option.text}
              </div>
              
            </div>
            <div className="home-filter-menu-option-divide"></div>
          </div>
        ))}
      </div>
    );
  }
}

export default HomeFilterMenuOption;
