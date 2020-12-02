import React, { Component } from "react";
import {
  Button,
  Container,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./Login.css";

class login extends Component {
  state = {
    email: "",
    password: "",
    login: null,
  };

  redirect() {
    window.location.href = 'http://localhost:9000/login';
    // // maybe can add spinner while loading
    // return null;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAuthentication = (event) => {
    console.log("searching");
    event.preventDefault();
    fetch("/login/cas", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((data) => {
        //Callback function after states been updated.
        console.log(data.message);

        if (data.message === "success") {
          console.log("success");
          //Pass properties to next application
          //NOTE: Re-write this. Not safe
          this.props.history.push({
            pathname: "/home", //---Change path as desired.
            email: this.state.email,
          });
        } else if (data.message === "failure") {
          console.log("failure");
          console.log("Incorrect credentials");
        }
      })
      .catch((error) => alert(error.message));
  };

  render() {
    return (
        <div className="loginContainer">
          <Container>
            <Row>
              <Col xs="3"/>
              <Col xs="6">
                <Label className="logoText">
                  TutorBase
                </Label>
              </Col>
              <Col xs="3"/>
            </Row>
            <Row>
              <Col xs="1"/>
              <Col xs="10">A better system to connect students and tutors at RPI.</Col>
              <Col xs="1"/>
            </Row>
            <Row>
              <Col xs="4"/>
              <Col xs="4">
                <Button onClick={this.redirect} color="danger" size="lg" className="signInButton">Sign In</Button>
              </Col>
              <Col xs="4"/>
            </Row>
            <Row>
              <Col xs="3"/>
              <Col xs="9">
                <div className="signUpDiv">
                  Don't have an account? <Link to="/signup">
                  &nbsp;Sign up</Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
    );
  }
}

export default login;
