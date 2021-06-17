import React, { Component } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import FilterDropBox from "./filter-drop-box";
import './shared.css';

class SearchSuggestion extends Component {
    state = {  }
    render() { 
        return ( 
            <div id="search-suggestion" className="suggestion-container vertical">
          <div className="horizontal">
            {/* search */}
            <div
              style={{ alignItems: "flex-start" }}
              className="search-bar vertical"
            >
              <div
                style={{ width: "95%", marginLeft: "6px" }}
                className="horizontal"
              >
                <AiOutlineSearch />
                <input
                  type="text"
                  className="search-bar"
                  placeholder="Tìm kiếm địa điểm, khu vực"
                  autoComplete="off"
                />
              </div>
            </div>
            {/* filter for searching */}
            <FilterDropBox title="Loại nhà đất" value="Tất cả" />
            <FilterDropBox title="Khu vực" value="Hồ Chí Minh" />
            <FilterDropBox title="Mức giá" value="Tất cả" />
            <FilterDropBox title="Diện tích" value="Tất cả" />

            {/* search button */}
            <input className="search-button" type="button" value="Tìm Kiếm" />
          </div>
        </div>
         );
    }
}
 
export default SearchSuggestion;