import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useRoutes, A } from "hookrouter";
import { createStore, applyMiddleware } from "redux";
import App from "./components/app";


import Tool from "./components/pages/tools";
import ToolManager from "./components/tools/tool-manager";
import Home from "./components/pages/home";
import Site from "./components/pages/sites";
import SiteManager from "./components/site/site-manager"
import SiteForm from "./components/site/site-form"
import Auth from "./components/auth/auth"

import "./style/main.scss";


function Main() {
  const [loggedInStatus, setLoggedInStatus] = useState("Not Logged In")
  
  const routes = () => {
    if(loggedInStatus === "Logged In"){
      return({
      "/": () => <App />,
      "/tools": () => <Tool />,
      "/sites": () => <Site />,
      "/tool-manager": () => <ToolManager />,
      "/site-manager": () => <SiteManager />,
      "/auth": () => <Auth loggedInStatus={loggedInStatus} setLoggedInStatus={setLoggedInStatus}/>
      })
    } else {
      return({
      "/": () => <App />,
      "/tools": () => <Tool />,
      "/sites": () => <Site />,
      "/auth": () => <Auth loggedInStatus={loggedInStatus} setLoggedInStatus={setLoggedInStatus}/>
      })
    }
  }

  const handleSignOut = () => {
    setLoggedInStatus("Not Logged In")
  }

  if(loggedInStatus === "Logged In") {
    return(
      <div>
        <div className="nav-wrapper">
          <div className="nav-link-wrapper">
            <A href="/">Home</A>
          </div>
          <div className="nav-link-wrapper">
            <A href="/tools">Tools</A>
          </div>
          <div className="nav-link-wrapper">
            <A href="/sites">Sites</A>
          </div>
          <div className="nav-link-wrapper">
            <A href="/tool-manager">Tool Manager</A>
          </div>
          <div className="nav-link-wrapper">
            <A href="/site-manager">Site Manager</A>
          </div>
          <div>
            <button className="btn" onClick={() => handleSignOut()}>Sign Out</button>
          </div>
        </div>
        {useRoutes(routes())}
      </div>
    )
  } else {
    return(
      <div>
        <div className="nav-wrapper">
          <div className="nav-link-wrapper">
            <A href="/">Home</A>
          </div>
          <div className="nav-link-wrapper">
            <A href="/tools">Tools</A>
          </div>
          <div className="nav-link-wrapper">
            <A href="/sites">Sites</A>
          </div>
          <div className="nav-link-wrapper">
            <A href="/auth">Login</A>
          </div>
        </div>
        {useRoutes(routes())}
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.querySelector(".app-wrapper"))

