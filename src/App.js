import "./App.css";
import React from "react";
import SearchResultPage from "./components/search-result/search-result-page";
import HomePage from "./components/home/home-page";
import ProductDetailPage from "./components/product-detail/product-detail-page";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AssignedPostPage from "./components/staff-assigned-post/assigned-post-page";
import Chat from "./components/chat/Chat";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route
            path="/search-result-page/:searchtext"
            component={SearchResultPage}
          ></Route>
          <Route
            path="/product-detail-page"
            component={ProductDetailPage}
          ></Route>
          <Route path="/chat-page" component={Chat}></Route>
        </Switch>
      </Router>
      {/* <Example /> */}
      {/* <HomePage /> */}
      {/* <SearchResultPage /> */}
      {/* <ProductDetailPage /> */}
      {/* <AssignedPostPage /> */}
    </React.Fragment>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
