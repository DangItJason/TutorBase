import React from "react";
import {Button, Col, Container, Row,} from "reactstrap";
import {Link, useHistory} from "react-router-dom";
import rpi_logo from "./login_images/rpi_logo.png"
import tb_logo from "./login_images/tutorbase_logo.png"
import git_logo from "./login_images/GitHub-Mark-32px.png"
import '../../styles/Login.css';
import {ApiBaseAddress} from "../../utils/Environment";

export function LoginPage() {
    const history = useHistory();
    const CASRedirect = () => {
        window.location.href = ApiBaseAddress + 'api/login';
    }

    const handleAuthentication = (event: any) => {
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
                    // history.push({
                    //     pathname: "/home", //---Change path as desired.
                    //     email: this.state.email,
                    // });
                    history.push("/home")
                } else if (data.message === "failure") {
                    console.log("failure");
                    console.log("Incorrect credentials");
                }
            })
            .catch((error) => alert(error.message));
    };

    return (
        <body className={"loginBody"}>
        <Container style={{maxWidth: "45em", paddingTop: "5em"}}>
            <div className="loginContainer">
                <Row>
                    <Col style={{textAlign: "center", paddingTop: "3em"}}>
                        <img src={tb_logo} style={{maxWidth: "100%"}} alt="Rensselaer"/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{textAlign: "center"}}>
                        A better system to connect students and tutors at RPI.
                    </Col>
                </Row>
                <Row noGutters={true} style={{textAlign: "center", alignContent: 'center'}}>
                    <Col xs="1" />
                    <Col xs="10">
                        <Button 
                            onClick={() => CASRedirect()} 
                            color="danger" 
                            size="lg" 
                            style={{marginTop: '4em'}}>
                                Login
                        </Button>
                    </Col>
                </Row>
                <Row style={{marginTop: "150px"}}>
                    <Col style={{textAlign: "center"}}>
                        An <a href="https://rcos.io/"> RCOS</a> project. &nbsp;
                        <a href="https://github.com/DangItJason/TutorBase">
                            <img style={{maxWidth: "80%", maxHeight: "80%"}}
                                 src={git_logo}
                                 alt="GitHub"/>
                        </a>
                    </Col>
                </Row>
            </div>
            <Row style={{paddingTop: "10%", paddingBottom: "30%"}}>
                <Col style={{textAlign: "center"}}>
                    <a href="https://www.rpi.edu">
                        <img src={rpi_logo} style={{maxWidth: "100%"}} alt="Rensselaer"/>
                    </a>
                </Col>
            </Row>
        </Container>
        </body>
    );
}
