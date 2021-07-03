import React, { Component } from 'react';
import "./shared.css";
import "./search-suggestion.css";
import Constants from "../global/Constants";
import { RiArrowDropDownLine } from "react-icons/ri";
import FilterItemListMenu from "./FilterItemListMenu";

class FromToFilterMenu extends Component {
    handleSelectItem = (option) => {
        this.props.handler(option);
    };
  
    // renderMenu = () => {
    //   if (this.state.isMenuShown) {
    //     return (
    //       <div className="search-suggestion-filter-menu">
    //         {this.props.options.map((option) => (
    //           <React.Fragment key={option.key}>
    //             <div
    //               key={option.key}
    //               onClick={() => this.handleSelectItem(option)}
    //               className="search-suggestion-filter-menu-item"
    //             >
    //               <span className="title">{option.text}</span>
    //             </div>
    //             <div className="line"></div>
    //           </React.Fragment>
    //         ))}
    //       </div>
    //     );
    //   }
  
    //   return null;
    // };

    handleConfirm = () => {
        const fromAreaText = document.getElementById("sug-from-input").value;
        const toAreaText = document.getElementById("sug-to-input").value;
        console.log("sdakljf");
        console.log(fromAreaText);
        console.log(toAreaText);
        const option = {
            key: 99,
            text: fromAreaText + Constants.squareMeter + " - " + toAreaText + Constants.squareMeter,
        };
        this.props.handler(option);
    }
  
    render() {
      return (
        <React.Fragment>
          <div style={{height: "auto"}} className="search-suggestion-filter-menu">
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
            {/* <p>qweqwe</p> */}
            <div className="search-suggestion-filter-menu-from-to-container">
                <div className="box">
                    <span className="title">Tối thiểu</span>
                    <div className="field-container">
                        <input id="sug-from-input" placeholder={Constants.squareMeter} type="text" className="input" />
                    </div>

                    <span className="title">Tối đa</span>
                    <div className="field-container">
                        <input id="sug-to-input" placeholder={Constants.squareMeter} type="text" className="input" />
                    </div>

                    <div onClick={this.handleConfirm} className="primary-background-color confirm">
                        <span className="title">Xác nhận</span>
                    </div>
                </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
}
 
export default FromToFilterMenu;