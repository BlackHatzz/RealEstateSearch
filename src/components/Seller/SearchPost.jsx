import React, { useEffect } from "react";
import "./search-post.css";
import "../global/shared.css";
import SearchIcon from '@material-ui/icons/Search';

const SearchPost = () => {
  useEffect(() => {}, []);

  return (
    <React.Fragment>
        <div className="seller-search-post-wrapper">
        <div style={{height: "50px"}}></div>
      <div className="plastic-white seller-search-post-search-bar-container">
          <SearchIcon className="icon" />
          <input placeholder="Tìm kiếm tên, địa điểm bất động sản..." type="text" />
      </div>

      <div className="confirm-green noselect seller-search-post-create-post">
          <span>Create Post</span>
      </div>

      <div className="seller-search-list-search-container">
          <div className="box">
              <div className="seller-search-image-container"></div>
              <div className="content-product-container">
            {/* title of product */}
            <span className="product-title">
              {/* {this.props.item.title} */}
              PHÚ ĐÔNG PREMIER KÝ HĐ TRỰC TIẾP CDT CÒN CĂN ĐỘC QUYỀN TẦNG ĐẸP,
              GIÁ TỐT
            </span>

            {/* price and area */}
            <div className="price-box">
              <span className="price">Giá trị ~ triệu/m²</span>
              <span className="price">&#8226;</span>
              <span className="area">Diện tích  m²</span>
            </div>

            {/* address */}
            <span className="address">Đường </span>

            {/* description */}
            <div className="description">
              {/* {this.props.item.description} */}
              Căn hộ 3PN chỉ từ 2,5̉ TỶ Gần ngay Phố Cổ ̉ Đầy đủ ̣Nội Thất liền
              tường - Trả góp 65% GTCH trong 20 năm, LS 0% trong 24 tháng. -
              NHẬN NHÀ chỉ cần 800Tr (30%) đóng trong 12 tháng - TẶNG gói nội
              thất cao cấp trị giá tới 6% GTCH. - CHIẾT KHẤU 400Triệu - Khi
              Thanh Toán Sớm .
            </div>

            <div className="other-info">
              <div className="uptime">Ngày đăng: </div>
              <div className="owner">Người đăng: </div>
              {/* <div className="product-phone-contact horizontal">
                <BsFillChatDotsFill />
                <div style={{ width: "12px" }}></div>
                <span>&#32;Trò chuyện</span>
              </div> */}
            </div>
          </div>
          </div>
      </div>
        </div>
      
    </React.Fragment>
  );
};

export default SearchPost;
