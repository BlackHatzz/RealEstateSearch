import "./App.css";
import React, { useEffect } from "react";
import SearchResultPage from "./components/search-result/search-result-page";
import HomePage from "./components/home/home-page";
import ProductDetailPage from "./components/product-detail/product-detail-page";
import { Route, Switch, useHistory } from "react-router-dom";
import AssignedPostPage from "./components/staff-assigned-post/assigned-post-page";
// import { ChatProvider } from "context";
import { useAuth, useResolved } from "./hooks";
import { Login } from "components";
import { Signup } from "components";
import { ChatProvider } from "context";
import Chat from "components/chat-old/Chat";
function App() {
  const history = useHistory();
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser);

  // useEffect(() => {
  //   if (authResolved) {
  //     history.push(!!authUser ? "/" : "/login");
  //   }
  // }, [authResolved, authUser, history]);

  return authResolved ? (
    <ChatProvider authUser={authUser}>
      <div className="app">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route
            path="/search-result-page/:searchtext"
            component={SearchResultPage}
          />
          <Route path="/product-detail-page" component={ProductDetailPage} />
          <Route path="/chat-page" component={Chat} />
        </Switch>
      </div>
    </ChatProvider>
  ) : (
    // {/* <Example /> */}
    // {/* <HomePage /> */}
    // {/* <SearchResultPage /> */}
    // {/* <ProductDetailPage /> */}
    // {/* <AssignedPostPage /> */}

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
    <>Loading...</>
  );
}

export default App;
