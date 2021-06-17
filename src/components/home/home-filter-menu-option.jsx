import React, { Component } from "react";

class HomeFilterMenuOption extends Component {
  state = {
    options: [
      { key: 1, value: "Chung cư" },
      { key: 2, value: "Nhà phố" },
      { key: 3, value: "Đất" },
    ],
  };
  render() {
    const divide = {
      width: "100%",
      height: "4px",
      backgroundColor: "white",
    };
    return (
      <div className="home-filter-menu">
        {this.state.options.map((option) => (
          <div>
            <div key={option.key} className="noselect home-filter-menu-option">
              <div className="noselect home-filter-menu-option-title">
                {option.value}
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
