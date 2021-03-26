import React, { Component } from "react";
import { Button, Container, Label, Row } from "reactstrap";
import { Link } from "react-router-dom";
import "../../components/Login.css";
import { actions } from "../../store/loginData";
import { connect } from "react-redux";
import { ApiBaseAddress } from "../../utils/Environment";

class login extends Component {
  redirectToLogin = () => {
    window.location.href = ApiBaseAddress + "api/login";
  };

  // Input handler
  handleChange = (event) => {
    if (event.target.name === "email") {
      this.props.setEmail(event.target.value);
    } else if (event.target.name === "password") {
      this.props.setPassword(event.target.value);
    } else if (event.target.name === "login") {
      this.props.setLogin(event.target.value);
    }
  };

  render() {
    console.log("Logging API Base Address: ", ApiBaseAddress);

    return (
      <Container className="loginContainer" fluid="sm">
        <Row>
          <Label className="loginText">Login</Label>
        </Row>
        <Row>
          <Button onClick={this.redirectToLogin} color="danger">
            Sign In with RPI Email
          </Button>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEmail: (state, event) => dispatch(actions.setEmail(state, event)),
    setPassword: (state, event) => dispatch(actions.setPassword(state, event)),
    setLogin: (state, event) => dispatch(actions.setLogin(state, event)),
  };
};

function mapStateToProps(state) {
  const { loginState } = state;
  return {
    email: loginState.email,
    password: loginState.password,
    login: loginState.login,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(login);
