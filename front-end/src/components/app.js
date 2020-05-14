import React, { Component } from "react";
import axios from "axios";


export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="page-title">
          <h1>Welcome to your Tool Tracker!</h1>
        </div>
        <div className="body-text">
          <p>I built this tool tracking application after working construction and seeing how many tools were lost or misplaced.  This adds up to massive losses for the company over time.  The test login I created is Email: “test@gmail.com” and Password: “1234”.</p>
        </div>
      </div>
    );
  }
}
