import React, { Component } from "react";
import {
  Button,
  Container,
  Label,
  Row,
  Col,
  Media,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./Login.css";
import rpi_logo from "./login_images/rpi_logo.png"
import tb_logo from "./login_images/tutorbase_logo.png"

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
        <body class="loginBody">
          <Container style={{maxWidth:"45em", paddingTop: "5em"}}>
            <div className="loginContainer">
              <Row>
                <Col style={{textAlign:"center", paddingTop: "3em"}}>
                  <img src={tb_logo} style={{maxWidth: "100%"}} alt="Rensselaer"/>
                </Col>
              </Row>
              <Row>
                <Col style={{textAlign:"center"}}>
                  A better system to connect students and tutors at RPI.
                </Col>
              </Row>
              <Row>
                <Col xs="4"/>
                <Col xs="4">
                  <Button onClick={this.redirect} color="danger" size="lg" className="signInButton">Login</Button>
                </Col>
                <Col xs="4"/>
              </Row>
              <Row>
                <Col style={{textAlign:"center"}}>
                  <div className="signUpDiv">
                    Don't have an account? <Link to="/signup">
                    &nbsp;Sign up</Link>
                  </div>
                </Col>
              </Row>
              <Row style={{marginTop: "150px"}}>
                <Col style={{textAlign:"center"}}>
                  An <a href="https://rcos.io/"> RCOS</a> project. &nbsp;
                  <a href="https://github.com/DangItJason/TutorBase">
                    <img style={{width:"32px", height:"32px"}} src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub"/>
                  </a>
                </Col>
                {/*<Media object src={'/'} alt="GitHub" />*/}
                {/*<img src="login_images/GitHub-Mark-32px.png" alt="GitHub"/>*/}
              </Row>
            </div>
            <Row style={{paddingTop:"10%", paddingBottom:"30%"}}>
              <Col style={{textAlign:"center"}}>
                <a href="https://www.rpi.edu">
                  <img src={rpi_logo} style={{maxWidth: "100%"}} alt="Rensselaer"/>
                </a>
              </Col>
            </Row>
          </Container>
        </body>

    );
  }
}

//style={{background:"#000000"}}

export default login;
