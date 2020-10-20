import React, { Component } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAuthentication = (event) => {
    console.log("searching");
    event.preventDefault();
    fetch("http://localhost:9000/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
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
      <Container className="loginContainer" fluid="sm">
        <Row>
          <Label className="loginText">Login</Label>
        </Row>
        <Row>
          <a href="http://localhost:9000/login">
            <Button color="danger">Sign In</Button>
          </a>
        </Row>
        <Row>
          <div>
            Don't have an account? Click <Link to="/signup">here</Link>
          </div>
        </Row>
      </Container>
    );
  }
}

export default login;
