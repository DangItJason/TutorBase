import React, { Component } from "react";
import { Button, Container, Label, Row } from "reactstrap";
import { Link } from "react-router-dom";
import "./Login.css";
import { actions } from "../store/loginData";
import { connect } from "react-redux";

class login extends Component {
  // state = {
  //   email: "",
  //   password: "",
  //   login: null,
  // };

  redirect() {
    window.location.href = 'http://localhost:9000/login';
    // // maybe can add spinner while loading
    // return null;
  }

  redirect() {
    window.location.href = 'http://localhost:9000/login';
    // // maybe can add spinner while loading
    // return null;
  }

  handleChange = (event) => {
    if (event.target.name === "email") {
      this.props.setEmail(event.target.value);
    } else if (event.target.name === "password") {
      this.props.setPassword(event.target.value);
    } else if (event.target.name === "login") {
      this.props.setLogin(event.target.value);
    }
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
      <Container className="loginContainer" fluid="sm">
        <Row>
          <Label className="loginText">Login</Label>
        </Row>
        <Row>
          {/* <a href="http://localhost:9000/login"> */}
          <Button onClick={this.redirect} color="danger">Sign In</Button>
          {/* </a> */}
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

const mapDispatchToProps = dispatch => {
  return {
    setEmail: (state, event) => dispatch(actions.setEmail(state, event)),
    setPassword: (state, event) => dispatch(actions.setPassword(state, event)),
    setLogin: (state, event) => dispatch(actions.setLogin(state, event)),
  }
}

function mapStateToProps(state){
  const { loginState } = state;
  return {    
      email: loginState.email, 
      password: loginState.password,
      login: loginState.login,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(login);
