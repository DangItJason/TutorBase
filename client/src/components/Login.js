import React, { Component } from "react";
import { Button, Container, Form, FormGroup, Label, Input } from "reactstrap";
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
    event.preventDefault();
    fetch("http://localhost:9000/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then((data) => {
        //Callback function after states been updated.
        console.log(data.message)
        if (data.message === "success") {
          //Pass properties to next application
          //NOTE: Re-write this. Not safe
          this.props.history.push({
            pathname: "/home", //---Change path as desired.
            email: this.state.email,
          });
        } else if (data.message === "failure") {
          console.log("Incorrect credentials");
        }
      })
      .catch((error) => alert(error.message));
  };

  render() {
    return (
      <Container className="loginContainer" fluid="sm">
        {/* <Form onSubmit={this.handleAuthentication}> */}
          <Label className="loginText">Login</Label>
          {/* <FormGroup row>
            <Input
              type="email"
              name="email"
              className="form-control"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange}
            ></Input>
          </FormGroup>
          <FormGroup row>
            <Input
              type="password"
              name="password"
              className="form-control"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
            ></Input>
          </FormGroup> */}
          <a href="http://localhost:9000/login"><Button color="danger">
            Sign In
          </Button></a>
          
          <div>
            Don't have an accout? Click <Link to="/signup">here</Link>
          </div>
        {/* </Form> */}
      </Container>
    );
  }
}

export default login;
