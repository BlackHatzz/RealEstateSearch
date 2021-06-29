import React, { useEffect, useState } from "react";
import SearchResultPage from "./components/search-result/search-result-page";
import HomePage from "./components/home/home-page";
import ProductDetailPage from "./components/product-detail/product-detail-page";
import { Route, Switch, useHistory } from "react-router-dom";
import AssignedPostPage from "./components/staff-assigned-post/assigned-post-page";
import { useAuth, useResolved } from "./hooks";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Chat } from "./components/Chat";
// import ProfilePage from "./components/profile/ProfilePage";
import { ChatLauncher } from "./components/Chat/ChatLauncher";
import ChatContext from "./ChatContext";
import { Role } from "./components/Role/Role";
import { Seller } from "./components/Seller/Seller";
const App = () => {
  const history = useHistory();
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser);
  const [test, setTest] = useState("initialState");
  useEffect(() => {
    if (authResolved) {
      history.push(!!authUser ? "/role" : "/login");
    }
  }, [authResolved, authUser, history]);

  return authResolved ? (
    <ChatContext>
      <div className="app">
        {authUser && <ChatLauncher />}
        <Switch>
          <Route exact path="/role" component={Role} />
          <Route exact path="/sell" component={Seller} />
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          {/* <Route path="/profile-page" component={ProfilePage} /> */}
          <Route path="/signup" component={Signup} />
          <Route
            path="/search-result-page/:searchtext"
            component={SearchResultPage}
          />
          <Route path="/product-detail-page" component={ProductDetailPage} />
          <Route path="/assigned-post-page" component={AssignedPostPage} />
          <Route path="/chat-page" component={Chat} />
        </Switch>
      </div>
    </ChatContext>
  ) : (
    <div>Loading ...</div>
  );
};

export default App;
