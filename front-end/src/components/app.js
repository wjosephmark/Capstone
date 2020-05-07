import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import NavigationContainer from "./navigation/navigation-container";
import Tool from "./pages/tools";
import ToolManager from "./tools/tool-manager";
import Home from "./pages/home";
import Site from "./pages/sites";
import SiteManager from "./site/site-manager"

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          
          <NavigationContainer />

          <Switch>
            
            <Route exact path="/" component={Home} />

            <Route exact path="/tools" component={Tool} />
            <Route exact path="/tool-manager" component={ToolManager} />

            <Route exact path="/sites" component={Site} />
            <Route exact path="/site-manager" component={SiteManager} />

          </Switch>

        </div>
      </Router>
    );
  }
}
