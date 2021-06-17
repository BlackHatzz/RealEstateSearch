import React, { Component } from "react";
import './solid-field.css';

class SolidField extends Component {
  state = {
  };
  render() {
    return (
      <React.Fragment>
        <div className="underscore-field-container">
            <input placeholder={this.props.placeholder} type="text" className="underscore-field" />
        </div>
      </React.Fragment>
    );
  }
}

export default SolidField;
