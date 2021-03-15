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
import { MdCheck } from "react-icons/md";
import { VscError } from "react-icons/vsc";
import { actions } from "../store/signUpData";
import { connect } from "react-redux";
import { ApiBaseAddress } from "../utils/Environment";

class signup extends Component {
  handleChange = (event) => {
    if (event.target.name === "email") {
      this.props.setEmail(event.target.value);
      this.props.setEmailValid();
    } else if (event.target.name === "password") {
      this.props.setPassword(event.target.value);
      this.props.setPasswordValid();
    } else if (event.target.name === "first_name") {
      this.props.setFirstName(event.target.value);
      this.props.setFirstNameValid();
    } else if (event.target.name === "last_name") {
      this.props.setLastName(event.target.value);
      this.props.setLastNameValid();
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.setPasswordValid();
    this.props.setLastNameValid();
    this.props.setEmailValid();
    this.props.setFirstNameValid();
    if (
      this.props.auth.emailValid &&
      this.props.auth.passwordValid &&
      this.props.auth.firstNameValid &&
      this.props.auth.lastNameValid
    ) {
      this.submitUser();
    } else {
      this.props.setLoginValid(false);
    }
  };

  submitUser() {
    let body = {
      email: this.props.auth.email,
      password: this.props.auth.password,
      first_name: this.props.auth.first_name,
      last_name: this.props.auth.last_name,
    };

    if (process.env.NODE_ENV === "development")
      console.log(
        "DEBUG: Attempting to create user with CAS with body => ",
        body
      );

    fetch(ApiBaseAddress + "signup", {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        //Make sure your header content type you specify and body type match.
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (process.env.NODE_ENV === "development")
          console.log("DEBUG: Logging signup response =>", res);

        // After account creation, redirect to login!
        window.location.href = ApiBaseAddress + "login";
      })
      .catch((reason) => {
        if (process.env.NODE_ENV === "development")
          console.log("DEBUG: Error authenticating with CAS => ", reason);
      });
  }

  render() {
    const passwordValid = this.props.auth.passwordValid;
    return (
      <Container className="loginContainer" fluid="sm">
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
                    value={this.props.auth.first_name}
                    onChange={this.handleChange}
                    autoComplete="off"
                  ></Input>
                </Col>
                <Col xs="auto">
                  <div>
                    {this.props.auth.firstNameValid ? (
                      <MdCheck size="30px" color="green"></MdCheck>
                    ) : (
                      <VscError size="30px" color="red"></VscError>
                    )}
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
                    value={this.props.auth.last_name}
                    onChange={this.handleChange}
                    autoComplete="off"
                  ></Input>
                </Col>
                <Col xs="auto">
                  <div>
                    {this.props.auth.lastNameValid ? (
                      <MdCheck size="30px" color="green"></MdCheck>
                    ) : (
                      <VscError size="30px" color="red"></VscError>
                    )}
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
                    value={this.props.auth.email}
                    onChange={this.handleChange}
                  ></Input>
                </Col>
                <Col xs="auto">
                  <div>
                    {this.props.auth.emailValid ? (
                      <MdCheck size="30px" color="green"></MdCheck>
                    ) : (
                      <VscError size="30px" color="red"></VscError>
                    )}
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
                    value={this.props.auth.password}
                    onChange={this.handleChange}
                    autoComplete="off"
                  ></Input>
                </Col>
                <Col xs="auto">
                  <div>
                    {this.props.auth.passwordValid ? (
                      <MdCheck size="30px" color="green"></MdCheck>
                    ) : (
                      <VscError size="30px" color="red"></VscError>
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          </FormGroup>
          <div>{this.props.auth.loginValid ? "" : "Invalid Fields"}</div>
          <Button color="danger" type="submit">
            Create Account
          </Button>
          <div>
            Already have an account? Click <Link to="/login">here</Link>
          </div>
        </Form>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { signUp } = state;
  return { auth: signUp };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLastName: (state, action) =>
      dispatch(actions.setLastName(state, action)),
    setFirstName: (state, action) =>
      dispatch(actions.setFirstName(state, action)),
    setEmail: (state, action) => dispatch(actions.setEmail(state, action)),
    setPassword: (state, action) =>
      dispatch(actions.setPassword(state, action)),
    setLoginValid: (state) => dispatch(actions.setLoginValid(state)),
    setLastNameValid: (state) => dispatch(actions.setLastNameValid(state)),
    setFirstNameValid: (state) => dispatch(actions.setFirstNameValid(state)),
    setEmailValid: (state) => dispatch(actions.setEmailValid(state)),
    setPasswordValid: (state) => dispatch(actions.setPasswordValid(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(signup);
