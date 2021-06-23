import React, { Component } from "react";
import "./assigned-post.css";
import AssignedPostItem from "./assigned-post-item";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { AiOutlineConsoleSql } from "react-icons/ai";

class AssignedPostPage extends Component {
  state = {
    items: [],
    isSnackbarShown: true,
    stupid: true,
  };

  componentDidMount() {
    console.log("hehe2");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "page": 0,
        "size": 20,
        "staffId": "ddddddddd"
    }),
    };

    fetch("http://localhost:8080/api/v1/transaction/getRealEstateAssignStaff", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("get assign");
          console.log(result);
          
          this.setState({
            items: result.content,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // this.setState({
          //   isLoaded: true,
          //   error,
          // });
        }
      );
  }

  handleOpenSnackbar = () => {
    this.setState({
      isSnackbarShown: true,
    });
  };

  handleCloseSnackbar = () => {
    this.setState({
      isSnackbarShown: false,
    });
  };

  handleSnackbar = (sellerName, buyerName) => {
    return (
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={this.state.isSnackbarShown}
        onClose={this.handleCloseSnackbar}
        message="Great! You've created a new transaction!"
        key={"top" + "right"}
      >
        <Alert style={{ backgroundColor: "black" }} severity="success">
          <span style={{ color: "white" }}>
            Tuyệt! Bạn đã tạo thành công 1 giao dịch
          </span>
        </Alert>
      </Snackbar>
    );
  };
  switchToggle = () => {
    this.setState({
      isSnackbarShown: !this.state.isSnackbarShown,
    });
  };
  renderSnackbar() {
    if (this.state.isSnackbarShown) {
      return (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={true}
          // onClose={handleClose}
          message="I love snacks"
          key={"top" + "right"}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        {/* <SearchSuggestion /> */}
        {/* <div onClick={this.switchToggle}>switch</div>
        {this.renderSnackbar()}

        {this.state.isSnackbarShown ? (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={true}
            // onClose={handleClose}
            message="I love snacks"
            key={"top" + "right"}
          />
        ) : null} */}

        {/* <z  child={<p>stuooo</p>} /> */}
        {/* search result list */}
        <div style={{ width: "100%" }}>
          <div className="horizontal">
            <div className="staff-product-list">
              {/* {this.state.items.map((item) => (
                    <AssignedPostItem item={item} />
                  ))} */}
                  {this.state.items.map((item) => (
                    <AssignedPostItem
                    key={item.realEstateId}
                    item={item}
                    handleSnackbar={this.handleSnackbar}
                    handleOpenSnackbar={this.handleOpenSnackbar}
                  />
                  ))}
              
              {/* <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem /> */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AssignedPostPage;
