import React, { Component } from 'react'


class SuggestionFilterBox extends Component {
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
        this.state.filter.title = option.text;
        this.props.handler(this.props.filterKey, option);
      }
    
      renderMenu = () => {
        if (this.state.isMenuShown) {
          return (
              <div className="search-suggestion-filter-menu">
                {this.state.filter.options.map((option) => (
                  <React.Fragment key={option.key}>
                    <div key={option.key} onClick={() => this.handleSelectItem(option)} className="search-suggestion-filter-menu-item">
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
    
      switchMenuStatus = () => {
        this.setState({
          isMenuShown: !this.state.isMenuShown,
        })
      }
    render() { 
        return ( <React.Fragment>
            <div onClick={this.switchMenuStatus} className="filter-drop-box horizontal">
          <div style={{ alignItems: "flex-start" }} className="vertical">
            <div className="filter-drop-box-label horizontal">
              {this.state.filter.filterName}
              <RiArrowDropDownLine style={{ width: "20px", height: "20px" }} />
            </div>
            <div className="filter-drop-box-value">{this.state.filter.title}</div>
            <div className="search-suggestion-filter-menu-container">
            {this.renderMenu()}
            </div>
          </div>
        </div>
        </React.Fragment> );
    }
}
 
export default SuggestionFilterBox;