import React from "react";
import axios from "axios";
import {withRouter} from "react-router"
import { NavLink } from "react-router-dom";

const NavigationComponent = (props) => {
    return(
        <div className="nav-wrapper">
            <div className="nav-link-wrapper">
                <NavLink exact to="/" activeClassName="nav-link-active">
                    Home
                </NavLink>
            </div>
            <div className="nav-link-wrapper">
                <NavLink exact to="/tools" activeClassName="nav-link-active">
                    Tools
                </NavLink>
            </div>
            <div className="nav-link-wrapper">
                <NavLink exact to="/sites" activeClassName="nav-link-active">
                    Sites
                </NavLink>
            </div>
        </div>
    )
}

export default withRouter(NavigationComponent)