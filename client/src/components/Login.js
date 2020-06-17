import React, { Component } from "react";
import { Button, Container, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import "./login.css";

class login extends Component {
  state = {
    name: "",
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

    //Assigns {result: true} or {result: false} to state.login
    fetch("http://localhost:9000/login/login", {
      method: "post",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState(
          {
            login: data,
          },
          () => {
            //Callback function after states been updated.
            if (this.state.login.result === true) {
              console.log("Sucessful login");
              this.props.history.push({
                pathname: "/home",
                name: this.state.name,
                email: this.state.email,
              });
            } else if (this.state.login.result === false) {
              console.log("Incorrect credentials");
            }
          }
        )
      );
  };

  render() {
    return (
      <Container className="loginContainer" fluid="sm">
        <Form>
          <Label className="loginText">Login</Label>
          <FormGroup row>
            <Input type="email" name="email" placeholder="email"></Input>
          </FormGroup>
          <FormGroup row>
            <Input type="email" name="email" placeholder="password"></Input>
          </FormGroup>

          <Button color="danger">Sign In</Button>
          <div>Don't have an accout? Click <Link to='/signup'>here</Link>r</div>
        </Form>
      </Container>
    );
  }
}

export default login;
