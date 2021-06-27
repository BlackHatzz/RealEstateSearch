import React, { useEffect } from "react";
import SearchResultPage from "./components/search-result/search-result-page";
import HomePage from "./components/home/home-page";
import ProductDetailPage from "./components/product-detail/product-detail-page";
import { Route, Switch, useHistory } from "react-router-dom";
import AssignedPostPage from "./components/staff-assigned-post/assigned-post-page";
import { useAuth, useResolved } from "./hooks";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Chat } from "./components/Chat";
import ProfilePage from "./components/profile/ProfilePage";
import TransactionHistoryPage from "./components/transaction-history/TransactionHistoryPage";

const App = () => {
  const history = useHistory();
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser);

  //
  // useEffect(() => {
  //   if (authResolved) {
  //     history.push(!!authUser ? "/" : "/login");
  //   }
  // }, [authResolved, authUser, history]);

  return authResolved ? (
    <div className="app">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/transaction-history-page" component={TransactionHistoryPage} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/search-result-page/:searchtext"
          // component={SearchResultPage}
          render={props => <SearchResultPage key={props.match.params.searchtext} {...props} />}
        ></Route>
        <Route
          path="/product-detail-page"
          component={ProductDetailPage}
        ></Route>
        <Route path="/assigned-post-page" component={AssignedPostPage}></Route>
        <Route path="/chat-page" component={Chat} />
      </Switch>
    </div>
  ) : (
    <div>Loading ...</div>
  );
};

export default App;
