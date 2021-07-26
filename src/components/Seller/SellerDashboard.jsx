import React, { useEffect, useState } from "react";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   geocodeByPlaceId,
//   getLatLng,
// } from "react-places-autocomplete";
import "./manage-post.css";
import PostAddIcon from "@material-ui/icons/PostAdd";
import HistoryIcon from "@material-ui/icons/History";
import { GrTransaction } from "react-icons/gr";
import SellerNavbar from "./SellerNavBar";
import "../global/shared.css";
import { fb } from "../../services/firebase";
import Constants from "../global/Constants";
import ManagePost from "./ManagePost";
import SearchPost from "./SearchPost";
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { SellerScheduler } from "./SellerScheduler";

const SellerDashboard = () => {
  var [selectedItem, setSelectedItem] = useState(1);
  const otherRoutes = [
    {
      path: "/manage-post",
      child: (
        <div className="content-container">
          <ManagePost />
        </div>
      ),
    },
  ];
  var [items, setItems] = useState([
    {
      key: 1,
      title: "Quản lý bài viết",
      icon: (
        <PostAddIcon
          id={"seller-dashboard-icon1"}
          className="seller-dashboard-el icon"
        />
      ),
      path: "/seller-search-post",
      child: <SearchPost />,
      //   path: "/manage-post",
      //   child: <div className="content-container"><ManagePost /></div>,
    },
    {
      key: 2,
      title: "Lịch sử giao dịch",
      icon: (
        <HistoryIcon
          id={"seller-dashboard-icon2"}
          className="seller-dashboard-el icon"
        />
      ),
      path: "/transaction-history",
      child: <p>historyewew</p>,
    },
    {
      key: 3,
      title: "Tạo thời khóa biểu",
      icon: (
        <HistoryIcon
          id={"seller-dashboard-icon3"}
          className="seller-dashboard-el icon"
        />
      ),
      path: "/seller-scheduler",
      child: <SellerScheduler />,
    },
    // {
    //   key: 3,
    //   title: "Search",
    //   icon: (
    //     <HistoryIcon
    //       id={"seller-dashboard-icon3"}
    //       className="seller-dashboard-el icon"
    //     />
    //   ),
    //   path: "/search-post",
    //   child: <SearchPost />,
    // },
  ]);

  useEffect(() => {
    handleStyleForSelectedItem();
  }, []);
  //   useHistory().push("/search-post");
  const handleSelectTab = (key) => {
    const list = document.getElementsByClassName("alone-selected");
    const list2 = document.getElementsByClassName("box");
    for (var i = 0; i < list.length; i++) {
      list[i].style.backgroundColor = "white";
    }
    for (var i = 0; i < list2.length; i++) {
      list2[i].style.backgroundColor = "white";
    }

    const list3 = document.getElementsByClassName("seller-dashboard-el");
    for (var i = 0; i < list3.length; i++) {
      list3[i].style.color = "black";
    }

    selectedItem = key;

    handleStyleForSelectedItem();
  };

  const handleStyleForSelectedItem = () => {
    const key = selectedItem;

    document.getElementById(
      "alone-selected" + key.toString()
    ).style.backgroundColor = "black";

    document.getElementById("box" + key.toString()).style.backgroundColor =
      "black";

    document.getElementById(
      "seller-dashboard-title" + key.toString()
    ).style.color = "white";

    document.getElementById(
      "seller-dashboard-icon" + key.toString()
    ).style.color = "white";
  };

  return (
    <React.Fragment>
      <div className="seller-wrapper">
        <Router>
          <div className="left-container">
            <div className="logo-container">
              <div className="logo-box"></div>
            </div>

            {items.map((item) => (
              <Link
                key={item.key}
                onClick={() => handleSelectTab(item.key)}
                className="link item"
                to={item.path}
              >
                <div className="alone-selected-container">
                  <div
                    id={"alone-selected" + item.key.toString()}
                    className="alone-selected"
                  ></div>
                </div>
                <div id={"box" + item.key.toString()} className="link box">
                  {item.icon}
                  <span
                    id={"seller-dashboard-title" + item.key.toString()}
                    className="seller-dashboard-el"
                  >
                    {item.title}
                  </span>
                </div>
              </Link>
            ))}

            {/* <div onClick={this.handleSelectTab} className="item">
            <div className="alone-selected-container">
              <div className="alone-selected"></div>
            </div>
            <div className="box">
              <PostAddIcon className="seller-dashboard-el icon" />
              <span className="seller-dashboard-el">Manage Post</span>
            </div>
          </div>

          <div className="item">
            <div className="alone-selected-container">
              <div className="alone-selected"></div>
            </div>
            <div className="box">
              <HistoryIcon className="seller-dashboard-el icon" />
              <span className="seller-dashboard-el">Trasaction History</span>
            </div>
          </div> */}
          </div>

          <div className="right-container">
            <SellerNavbar />
            <div className="divide"></div>

            {/* <div className="content-container"> */}
            {/* <ManagePost /> */}

            <Switch>
              {items.map((item) => (
                <Route
                  key={item.key}
                  path={item.path}
                  children={() => item.child}
                />
              ))}

              {/* <Route
                  key={2}
                  path={"/transaction-history"}
                  children={() => <p>history</p>}
                /> */}

              {otherRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  children={() => route.child}
                />
              ))}
            </Switch>
            {/* </div> */}
          </div>
        </Router>
      </div>
    </React.Fragment>
  );
};

export default SellerDashboard;

// class SellerDashboard extends Component {
//   state = {
//     selectedItem: 1,
//     mainPath: "/seller",
//     items: [
//       {
//         key: 1,
//         title: "Quản lý bài viết",
//         icon: (
//           <PostAddIcon
//             id={"seller-dashboard-icon1"}
//             className="seller-dashboard-el icon"
//           />
//         ),
//         path: "/manage-post",
//       },
//       {
//         key: 2,
//         title: "Lịch sử giao dịch",
//         icon: (
//           <HistoryIcon
//             id={"seller-dashboard-icon2"}
//             className="seller-dashboard-el icon"
//           />
//         ),
//         path: "/transaction-history",
//       },
//     ],
//   };

//   handleSelectTab = (key) => {
//     const list = document.getElementsByClassName("alone-selected");
//     const list2 = document.getElementsByClassName("box");
//     for (var i = 0; i < list.length; i++) {
//       list[i].style.backgroundColor = "white";
//     }
//     for (var i = 0; i < list2.length; i++) {
//       list2[i].style.backgroundColor = "white";
//     }

//     const list3 = document.getElementsByClassName("seller-dashboard-el");
//     for (var i = 0; i < list3.length; i++) {
//       list3[i].style.color = "black";
//     }

//     this.state.selectedItem = key;

//     this.handleStyleForSelectedItem();

//     // this.props.history.push(
//     //     "/search-result-page/" +
//     //       this.state.searchText +
//     //       "/" +
//     //       this.state.type.selectedKey +
//     //       "/" +
//     //       this.state.fromAreaText + "-" + this.state.toAreaText +
//     //       // this.state.area.selectedKey +
//     //       "/" +
//     //       this.state.address.selectedKey +
//     //       "/" +
//     //       this.state.price.selectedKey
//     //   );

//     // document.getElementById(
//     //   "alone-selected" + key.toString()
//     // ).style.backgroundColor = "black";
//     // document.getElementById("box" + key.toString()).style.backgroundColor =
//     //   "black";
//     // document.getElementById(
//     //   "seller-dashboard-title" + key.toString()
//     // ).style.color = "white";
//     // document.getElementById(
//     //   "seller-dashboard-icon" + key.toString()
//     // ).style.color = "white";
//   };

//   handleStyleForSelectedItem = () => {
//     const key = this.state.selectedItem;

//     document.getElementById(
//       "alone-selected" + key.toString()
//     ).style.backgroundColor = "black";

//     document.getElementById("box" + key.toString()).style.backgroundColor =
//       "black";

//     document.getElementById(
//       "seller-dashboard-title" + key.toString()
//     ).style.color = "white";

//     document.getElementById(
//       "seller-dashboard-icon" + key.toString()
//     ).style.color = "white";
//   };

//   componentDidMount() {
//     this.handleStyleForSelectedItem();
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <div className="seller-wrapper">
//           <Router>
//             <div className="left-container">
//               <div className="logo-container">
//                 <div className="logo-box"></div>
//               </div>

//               {this.state.items.map((item) => (
//                 <Link
//                   key={item.key}
//                   onClick={() => this.handleSelectTab(item.key)}
//                   className="link item"
//                   to={item.path}
//                 >
//                   <div className="alone-selected-container">
//                     <div
//                       id={"alone-selected" + item.key.toString()}
//                       className="alone-selected"
//                     ></div>
//                   </div>
//                   <div id={"box" + item.key.toString()} className="link box">
//                     {item.icon}
//                       <span
//                         id={"seller-dashboard-title" + item.key.toString()}
//                         className="seller-dashboard-el"
//                       >
//                         {item.title}
//                       </span>
//                   </div>
//                 </Link>
//               ))}

//               {/* <div onClick={this.handleSelectTab} className="item">
//               <div className="alone-selected-container">
//                 <div className="alone-selected"></div>
//               </div>
//               <div className="box">
//                 <PostAddIcon className="seller-dashboard-el icon" />
//                 <span className="seller-dashboard-el">Manage Post</span>
//               </div>
//             </div>

//             <div className="item">
//               <div className="alone-selected-container">
//                 <div className="alone-selected"></div>
//               </div>
//               <div className="box">
//                 <HistoryIcon className="seller-dashboard-el icon" />
//                 <span className="seller-dashboard-el">Trasaction History</span>
//               </div>
//             </div> */}
//             </div>

//             <div className="right-container">
//               <SellerNavbar />
//               <div className="divide"></div>

//               <div className="content-container">
//                 {/* <ManagePost /> */}

//                 <Switch>
//                   <Route
//                     key={1}
//                     path={"/manage-post"}
//                     children={() => <ManagePost />}
//                   />
//                   <Route
//                     key={2}
//                     path={"/transaction-history"}
//                     children={() => <p>history</p>}
//                   />
//                 </Switch>
//               </div>
//             </div>
//           </Router>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default SellerDashboard;
