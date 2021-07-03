import React, { Component } from "react";
import "./shared.css";
import "./search-suggestion.css";

class FilterItemListMenu extends Component {
  handleSelectItem = (option) => {
      this.props.handler(option);
  };

  renderMenu = () => {
    if (this.state.isMenuShown) {
      return (
        <div className="search-suggestion-filter-menu">
          {this.props.options.map((option) => (
            <React.Fragment key={option.key}>
              <div
                key={option.key}
                onClick={() => this.handleSelectItem(option)}
                className="search-suggestion-filter-menu-item"
              >
                <span className="title">{option.text}</span>
              </div>
              <div className="line"></div>
            </React.Fragment>
          ))}
        </div>
      );
    }

    return null;
  };

  render() {
    return (
      <React.Fragment>
        <div className="search-suggestion-filter-menu">
          {this.props.options.map((option) => (
            <React.Fragment key={option.key}>
              <div
                key={option.key}
                onClick={() => this.handleSelectItem(option)}
                className="search-suggestion-filter-menu-item"
              >
                <span className="title">{option.text}</span>
              </div>
              <div className="line"></div>
            </React.Fragment>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default FilterItemListMenu;
