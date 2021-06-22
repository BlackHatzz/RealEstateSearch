import React from "react";
import SearchResultPage from "./components/search-result/search-result-page";
import HomePage from "./components/home/home-page";
import ProductDetailPage from "./components/product-detail/product-detail-page";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AssignedPostPage from "./components/staff-assigned-post/assigned-post-page";

function App() {
  return (
    <>
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
          <Route
            path="/assigned-post-page"
            component={AssignedPostPage}
          ></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
