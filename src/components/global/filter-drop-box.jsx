import React, { Component } from "react";
import "./shared.css";
import "./search-suggestion.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import FilterItemListMenu from "./FilterItemListMenu";
import FromToFilterMenu from "./FromToFilterMenu";

class FilterDropBox extends Component {
  state = {
    items: [
      { key: 1, title: "item 1" },
      { key: 2, title: "item 1" },
      { key: 3, title: "item 1" },
    ],
    isMenuShown: false,
    filter: {},
  };

  componentDidMount() {
    this.setState({
      filter: this.props.filter,
    });
  }

  handleSelectItem = (option) => {
    this.setState({
      isMenuShown: !this.state.isMenuShown,
    });
    this.state.filter.title = option.text;
    this.props.handler(this.props.filterKey, this.props.filter.typeKey, option);
  };

  // renderMenu = () => {
  //   if (this.state.isMenuShown) {
  //     return (
  //       <div className="search-suggestion-filter-menu">
  //         {this.state.filter.options.map((option) => (
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

  switchMenuStatus = () => {
    console.log("qweqwewq");
    this.setState({
      isMenuShown: !this.state.isMenuShown,
    });
  };

  renderMenu = () => {
    if (this.state.isMenuShown) {
      if (this.props.filter.typeKey == 0) {
        return (
          <FilterItemListMenu
            handler={this.handleSelectItem}
            options={this.props.filter.options}
          />
        );
      } else if (this.props.filter.typeKey == 1) {
        return (
          <FromToFilterMenu
            handler={this.handleSelectItem}
            options={this.props.filter.options}
            sign={this.props.filter.sign}
          />
        );
      }
    }

    return null;
  };

  render() {
    return (
      <React.Fragment>
        <div
          // onClick={this.switchMenuStatus}
          className="noselect filter-drop-box"
        >
          <div onClick={this.switchMenuStatus} className="filter-drop-box-label"
          >
            <span>
              {this.state.filter.filterName}
            </span>
            <RiArrowDropDownLine style={{ width: "30px", height: "25px" }} />
          </div>
          <div className="filter-drop-box-value">
            {this.state.filter.title}
          </div>
          <div className="search-suggestion-filter-menu-container"
          >
            {/* {this.state.isMenuShown ? (
                <FilterItemListMenu
                  handler={this.handleSelectItem}
                  options={this.props.filter.options}
                />
              ) : null} */}
            {this.renderMenu()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FilterDropBox;
