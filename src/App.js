import React, { useEffect } from "react";
import SearchResultPage from "./components/search-result/search-result-page";
import HomePage from "./components/home/home-page";
import ProductDetailPage from "./components/product-detail/product-detail-page";
import { Route, Switch, useHistory } from "react-router-dom";
import AssignedPostPage from "./components/staff-assigned-post/assigned-post-page";
import { useAuth, useResolved } from "./hooks";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

const App = () => {
  const history = useHistory();
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser);

  useEffect(() => {
    if (false) {
      history.push(!!authUser ? "/" : "/login");
    }
  }, [authResolved, authUser, history]);
  return true ? (
    <div className="app">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/search-result-page/:searchtext"
          component={SearchResultPage}
        ></Route>
        <Route
          path="/product-detail-page"
          component={ProductDetailPage}
        ></Route>
        <Route path="/assigned-post-page" component={AssignedPostPage}></Route>
        {/* <Route path="/chat-page" component={Chat} /> */}
      </Switch>
    </div>
  ) : (
    <div>Loading ...</div>
  );
};

export default App;
