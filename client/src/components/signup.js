import React, { Component } from "react";
import { Button, Container, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./Login.css";
import { MdCheck } from "react-icons/md";
import { VscError } from "react-icons/vsc";

class signup extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    visible: false,
    passwordValid: false,
    emailValid: false,
    firstNameValid: false,
    lastNameValid: false,
    loginValid: true
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "email") {
      this.isEmailValidShow();
    }
    else if (event.target.name === "password") {
      this.isPasswordValidShow();
    }
    else if (event.target.name === "first_name") {
      this.isFirstNameValidShow();
    }
    else if (event.target.name === "last_name") {
      this.isLastNameValidShow();
    }
  };

  isPasswordValidShow = () => {
    if (this.state.password.length < 8) {
      this.setState({
        passwordValid: false
      });
    }
    else {
      this.setState({
        passwordValid: true
      });
    }
  }

  isEmailValidShow = () => {
    if (this.state.email.includes("@") && this.state.email.includes(".")) {
      this.setState({
        emailValid: true
      });
    }
    else {
      this.setState({
        emailValid: false
      });
    }
  }

  isFirstNameValidShow = () => {
    if (this.state.first_name.length > 0) {
      this.setState({
        firstNameValid: true
      });
    }
    else {
      this.setState({
        firstNameValid: false
      });
    }
  }

  isLastNameValidShow = () => {
    if (this.state.first_name.length > 0) {
      this.setState({
        lastNameValid: true
      });
    }
    else {
      this.setState({
        lastNameValid: false
      });
    }
  }

  submitUser() {
    fetch("http://localhost:9000/signup", {
      method: "post",
      body: JSON.stringify(this.state),
      headers: {
        //Make sure your header content type you specify and body type match.
        "Content-Type": "application/json",
      },
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.isPasswordValidShow();
    this.isLastNameValidShow();
    this.isEmailValidShow();
    this.isFirstNameValidShow();
    if (this.state.emailValid && this.state.passwordValid && this.state.firstNameValid && this.state.lastNameValid) {
      this.submitUser();
    }
    else {
      this.setState({
        loginValid: false
      });
    }
  };

  render() {
    const passwordValid = this.state.passwordValid;
    return (
      <div className="flexBox">
       
      <Container className="signupContainer" fluid="xs">
        <Row>
          <Col xs="1"/>
          <Col xs="11">
            <Form onSubmit={this.handleSubmit}>
              <Label className="loginText">Sign Up</Label>
              <FormGroup row>
                <Container>
                  <Row>
                    <Col xs="auto">
                      <Input
                          type="text"
                          className="form-control"
                          name="first_name"
                          placeholder="first name"
                          value={this.state.first_name}
                          onChange={this.handleChange}
                          autoComplete="off"
                      />
                    </Col>
                    <Col xs="auto">
                      <div>
                        {this.state.firstNameValid ? <MdCheck size="30px" color="green"></MdCheck> : <VscError size="30px" color="red"></VscError>}
                      </div>
                    </Col>
                  </Row>
                </Container>
              </FormGroup>
              <FormGroup row>
                <Container>
                  <Row>
                    <Col xs="auto">
                      <Input
                          type="text"
                          className="form-control"
                          name="last_name"
                          placeholder="last name"
                          value={this.state.last_name}
                          onChange={this.handleChange}
                          autoComplete="off"
                      />
                    </Col>
                    <Col xs="auto">
                      <div>
                        {this.state.lastNameValid ? <MdCheck size="30px" color="green"></MdCheck> : <VscError size="30px" color="red"></VscError>}
                      </div>
                    </Col>
                  </Row>

                </Container>
              </FormGroup>
              <FormGroup row>
                <Container fluid>
                  <Row>
                    <Col xs="auto">
                      <Input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="email"
                          autoComplete="off"
                          value={this.state.email}
                          onChange={this.handleChange}
                      />
                    </Col>
                    <Col xs="auto">
                      <div>
                        {this.state.emailValid ? <MdCheck size="30px" color="green"></MdCheck> : <VscError size="30px" color="red"></VscError>}
                      </div>
                    </Col>
                  </Row>
                </Container>
                {/*<Input
              type="email"
              className="form-control"
              name="email"
              placeholder="email"
              autoComplete="off"
              value={this.state.email}
              onChange={this.handleChange}
            ></Input>*/}

                {/*<div>
              {this.state.emailValid ? <MdCheck size="30px" color="green"></MdCheck> : <VscError size="30px" color="red"></VscError>}
            </div>*/}
              </FormGroup>
              <FormGroup row>
                <Container fluid>
                  <Row>
                    <Col xs="auto">
                      <Input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          autoComplete="off"
                      />
                    </Col>
                    <Col xs="auto">
                      <div>
                        {this.state.passwordValid ? <MdCheck size="30px" color="green"></MdCheck> : <VscError size="30px" color="red"></VscError>}
                      </div>
                    </Col>
                  </Row>
                </Container>


              </FormGroup>
              <div>
                {this.state.loginValid ? '' : 'Invalid Fields'}
              </div>
              <Button color="danger" type="submit">
                Create Account
              </Button>
              <div>Already have an account? Click <Link to='/login'>here</Link></div>
            </Form>

          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default signup;


