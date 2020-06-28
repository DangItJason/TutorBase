import React, { Component } from "react";
import "./landing.css";
import { Card } from "reactstrap";

const body = (props) => {
  return (
    <div className={props.className}>
      <div className="small-div">
        <i className={props.className}></i>
      </div>

      <div className="big-div">
        <span className="div-title">{props.title}</span>
        <br />
        <span>{props.description}</span>
      </div>
    </div>
  );
};

export default body;
