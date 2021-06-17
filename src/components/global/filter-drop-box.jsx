import React, { Component } from "react";
import "./shared.css";
import "./search-suggestion.css";
import { RiArrowDropDownLine } from "react-icons/ri";

class FilterDropBox extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="filter-drop-box horizontal">
          <div style={{ alignItems: "flex-start" }} className="vertical">
            <div className="filter-drop-box-label horizontal">
              {this.props.title}
              <RiArrowDropDownLine style={{ width: "20px", height: "20px" }} />
            </div>
            <div className="filter-drop-box-value">{this.props.value}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FilterDropBox;
