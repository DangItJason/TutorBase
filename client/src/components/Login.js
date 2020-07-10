import React, { Component } from "react";
import { Button, Container, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import "./Login.css";

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

    fetch("http://localhost:9000/login", {
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
        <Form onSubmit={this.handleAuthentication}>
          <Label className="loginText">Login</Label>
          <FormGroup row>
            <Input type="email" name="email" placeholder="email"></Input>
          </FormGroup>
          <FormGroup row>
            <Input type="password" name="email" placeholder="password"></Input>
          </FormGroup>

          <Button color="danger" type="submit">Sign In</Button>
          <div>Don't have an accout? Click <Link to='/signup'>here</Link></div>
        </Form>
      </Container>
    );
  }
}

export default login;
