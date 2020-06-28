import React, { Component } from "react";
import "./landing.css";

class header extends Component {
  render() {
    return (
      <div className="header">
        <span className="header-title">Tutor Base</span>
        <br />
        <span className="header-text">Giving students the help they need</span>
      </div>
    );
  }
}

export default header;
