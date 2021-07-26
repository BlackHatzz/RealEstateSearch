import React, { useEffect, useContext, useState } from "react";
import SearchResultPage from "./components/search-result/search-result-page";
import HomePage from "./components/home/home-page";
import ProductDetailPage from "./components/product-detail/product-detail-page";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import AssignedPostPage from "./components/staff-assigned-post/assigned-post-page";
import { useAuth, useResolved } from "./hooks";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Chat } from "./components/Chat";
import ProfilePage from "./components/profile/ProfilePage";
import { ChatLauncher } from "./components/Chat/ChatLauncher";
import { Context } from "./ChatContext";
import { Role } from "./components/Role/Role";
import { Seller } from "./components/Seller/Seller";
import TransactionHistoryPage from "./components/transaction-history/TransactionHistoryPage";
import ManagePost from "./components/Seller/ManagePost";
import SellerDashboard from "./components/Seller/SellerDashboard";
import Autocomplete from "react-google-autocomplete";

// import { getToken, onMessageListener } from "./services";
import Schedule from "./components/Schedule/Schedule";
import { SellerScheduler } from "./components/Seller/SellerScheduler";
const App = () => {
  const history = useHistory();
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser);
  // const [isTokenFound, setTokenFound] = useState(false);
  // getToken(setTokenFound);
  const { role } = useContext(Context);

  useEffect(() => {
    if (authResolved) {
      // history.push(!!authUser ? "/role" : "/login");
      history.push(!authUser && "/login");
    }
  }, [authResolved, authUser, history]);

  // onMessageListener()
  //   .then((payload) => {
  //     console.log(payload);
  //   })
  //   .catch((err) => console.log("failed: ", err));

  return authResolved ? (
    <div className="app">
      {/* <SellerDashboard /> */}
      {authUser && role && <ChatLauncher />}
      <Switch>
        <Route exact path="/seller-search-post" component={SellerDashboard} />
        <Route exact path="/seller-scheduler" component={SellerScheduler} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/role" component={Role} />
        <Route exact path="/sell" component={Seller} />
        <Route path="/login">
          {!!authUser ? <Redirect to="/role" /> : <Login />}
        </Route>
        <Route path="/schedule" component={Schedule} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route
          path="/transaction-history-page"
          component={TransactionHistoryPage}
        />
        <Route path="/signup" component={Signup} />
        <Route
          path="/search-result-page/:searchtext/:type/:area/:adress/:price"
          // component={SearchResultPage}
          render={(props) => (
            <SearchResultPage
              key={
                // props.match.params.searchtext,
                // props.match.params.type,
                // props.match.params.area,
                props.location.key
              }
              {...props}
            />
          )}
        ></Route>
        <Route
          path="/product-detail-page/:id"
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
