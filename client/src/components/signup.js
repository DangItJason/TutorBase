import React, { Component } from "react";
import { Button, Container, Form, FormGroup, Label, Input } from "reactstrap";

import { Link } from "react-router-dom";
import "./login.css";

class signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    visible: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  isPasswordValid = (event) => {
    //Return: if password is valid, true. password is not valid, false.

    if (this.state.password.length < 8) {
      this.setState({
        visible: true,
      });
      return false;
    }

    return true;
  };
  //Submit user data to DB -> Open up home page
  submitUser() {
    fetch("http://localhost:9000/signup/signup", {
      method: "post",
      body: JSON.stringify(this.state),
      headers: {
        //Make sure your header content type you specify and body type match.
        "Content-Type": "application/json",
      },
    }).then(this.props.history.push("/home"));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isPasswordValid()) {
      this.submitUser();
    }
    //Broken
    // else {
    //     this.state.visible ? <div>Hello world</div> : <div>Hidden</div>
    // }
  };

  render() {
    return (
      <Container className="loginContainer" fluid="sm">
        <Form>
          <Label className="loginText">Sign Up</Label>
          <FormGroup row>
            <Input type="text" name="first_name" placeholder="first name"></Input>
          </FormGroup>
          <FormGroup row>
            <Input type="text" name="last_name" placeholder="last name"></Input>
          </FormGroup>
          <FormGroup row>
            <Input type="email" name="email" placeholder="email"></Input>
          </FormGroup>
          <FormGroup row>
            <Input type="password" name="password" placeholder="password"></Input>
          </FormGroup>

          <Button color="danger">Create Account</Button>
        </Form>
      </Container>
    );
  }
}

export default signup;
