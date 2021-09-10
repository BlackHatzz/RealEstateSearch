import React, { useEffect, useState } from "react";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   geocodeByPlaceId,
//   getLatLng,
// } from "react-places-autocomplete";
import "./manage-post.css";
import "./manage-post-mobile.css";
import PostAddIcon from "@material-ui/icons/PostAdd";
import HistoryIcon from "@material-ui/icons/History";
import ScheduleIcon from "@material-ui/icons/Schedule";
import MenuIcon from "@material-ui/icons/Menu";
import { GrTransaction } from "react-icons/gr";
import SellerNavbar from "./SellerNavBar";
import "../global/shared.css";
import { fb } from "../../services/firebase";
import Constants from "../global/Constants";
import ManagePost from "./ManagePost";
import SearchPost from "./SearchPost";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import UpdatePost from "./UpdatePost";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { SellerScheduler } from "./SellerScheduler";
import Schedule from "../Schedule/Schedule";
import { CropDinSharp } from "@material-ui/icons";
import TransactionHistory from "./TransactionHistory";

const SellerDashboard = () => {
  let history = useHistory();
  let location = useLocation();
  var [selectedItem, setSelectedItem] = useState(1);
  var [isShowMenu, setShowMenu] = useState(false);
  const otherRoutes = [
    {
      path: "/seller/manage-post",
      child: (
        <div className="content-container">
          <ManagePost />
        </div>
      ),
    },
    {
      path: "/seller/seller-update-post/:id",
      child: (
        <div className="content-container">
          <UpdatePost />
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
      path: "/seller/search-post",
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
      path: "/seller/transaction-history",
      child: <TransactionHistory />,
    },
    {
      key: 3,
      title: "Thời biểu lịch hẹn",
      icon: (
        <ScheduleIcon
          id={"seller-dashboard-icon3"}
          className="seller-dashboard-el icon"
        />
      ),
      path: "/seller/seller-scheduler",
      child: <SellerScheduler />,
    },
    {
      key: 4,
      title: "Lịch hẹn",
      icon: (
        <ScheduleIcon
          id={"seller-dashboard-icon4"}
          className="seller-dashboard-el icon"
        />
      ),
      path: "/schedule",
      child: <Schedule />,
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
  useEffect(() => {
    console.log(window.location);
    // if(window.location.pathname === "/seller") {
    //   history.push("/seller/search-post");
    //   window.location.reload();
    // }
  }, []);
  // useHistory().push("/search-post");
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
    ).style.backgroundColor = "#0C67CE";
    // box-shadow: 0px 2px 6px 2px rgba(20, 20, 20, 0.5);
    // #0C67CE

    document.getElementById("box" + key.toString()).style.backgroundColor =
      "rgba(199, 251, 255, 0.4)";

    document.getElementById(
      "seller-dashboard-title" + key.toString()
    ).style.color = "#0C67CE";

    document.getElementById(
      "seller-dashboard-icon" + key.toString()
    ).style.color = "#0C67CE";
  };
  let { id } = useParams();
  return (
    <React.Fragment>
      <div className="seller-wrapper">
        <Router>
          <div className={(isShowMenu ? "drawer-bg-menu-mobile" : "")}
          onClick={()=>setShowMenu(!isShowMenu)} />
          <div
            className={
              "left-container " +
              (!isShowMenu ? "left-container-show-menu" : "")
            }
          >
            <div className="logo-container">
              {/* <img src="logo.png" className="logo-box" /> */}
              <div style={{ backgroundImage: "url('https://i.ibb.co/cXDw5FW/logo.png')" }} className="logo-box" ></div>
              <div
                style={{ width: 30, height: 30, marginRight: 10 }}
                onClick={() => {
                  setShowMenu(!isShowMenu);
                }}
              >
                <MenuIcon style={{ width: 30, height: 30 }} />
              </div>
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
                <div
                  id={"box" + item.key.toString()}
                  className="link box"
                  style={{ marginTop: "43px" }}
                >
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
            <SellerNavbar isShowMenu={isShowMenu} setShowMenu={setShowMenu} />
            {/* <div className="content-container"> */}
            {/* <ManagePost /> */}
            {/* <Switch>
              <Route path="/seller/:id" children={<Child />} />
              {(() => {
                if (id == null || id === "") {
                  return <Redirect to="/seller/search-post" />;
                }
              })()}
            </Switch> */}

            <Switch>
              {items.map((item, index) => {
                console.log('bull');
                console.log(index);
                return <Route
                  key={item.key}
                  path={item.path}
                  children={() => item.child}
                />;
              })}
              {otherRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  children={() => route.child}
                />
              ))}
              <Redirect to="/seller/search-post" />

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

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}
