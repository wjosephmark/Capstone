import React, { useReducer } from "react";
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

const routes = {
  "/": () => <App />,
  "/tools": () => <Tool />,
  "/sites": () => <Site />,
  "/tool-manager": () => <ToolManager />,
  "/site-manager": () => <SiteManager />,
  "/auth": () => <Auth handleSuccessfulAuth={handleSuccessfulAuth}/>
}

const handleSuccessfulAuth = () => {
  console.log("You mf bad bitch, you did it!!")
  setLoggedInStatus("Logged In Baby!! ;)")
}

function Main() {
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
      </div>
      {useRoutes(routes)}
    </div>
  )
}

ReactDOM.render(<Main />, document.querySelector(".app-wrapper"))
