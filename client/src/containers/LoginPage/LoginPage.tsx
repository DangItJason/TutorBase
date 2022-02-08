import React from "react";
import { Button, Col, Row, } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import rpi_logo from "./login_images/rpi_logo.png"
import tb_logo from "./login_images/tutorbase_logo.png"
import git_logo from "./login_images/GitHub-Mark-32px.png"
import '../../styles/Login.css';
import { ApiBaseAddress } from "../../utils/Environment";
import { Helmet } from 'react-helmet';
import styled from "styled-components";

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
                    history.push("/home/schedule")
                } else if (data.message === "failure") {
                    console.log("failure");
                    console.log("Incorrect credentials");
                }
            })
            .catch((error) => alert(error.message));
    };

    return (
        <Container>
            <Helmet>
                <meta charSet="utf-8" />
                <title>TutorBase - Login</title>
            </Helmet>

            <LoginBacking>
                <LoginPrompt>
                    <Row>
                        <Col style={{ textAlign: "center", paddingTop: "3em" }}>
                            <img src={tb_logo} style={{ maxWidth: "100%" }} alt="Rensselaer" />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ textAlign: "center" }}>
                            A better system to connect students and tutors at RPI.
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button
                                onClick={() => CASRedirect()}
                                color="danger"
                                size="lg"
                                style={{margin: '1em'}}>
                                Login
                            </Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{textAlign: 'center'}}>
                            An <a href="https://rcos.io/"> RCOS</a> project. &nbsp;
                            <a href="https://github.com/DangItJason/TutorBase">
                                <img style={{ maxWidth: "80%", maxHeight: "80%" }}
                                     src={git_logo}
                                     alt="GitHub" />
                            </a>
                        </Col>
                    </Row>
                </LoginPrompt>

                <Row>
                    <Col style={{textAlign: "center"}}>
                        <a href="https://www.rpi.edu">
                            <img src={rpi_logo} style={{maxWidth: "100%"}} alt="Rensselaer"/>
                        </a>
                    </Col>
                </Row>
            </LoginBacking>
        </Container>
    );
}

const Container = styled.div`
    padding: 10px;

    height: 100vh;
    width: 100vw;

    background-color: #E66064;

    // display: flex;
    // justify-content: center;
    // align-items: center;

    // DEBUG STYLES //
    // border: red solid 5px;
`;

const LoginBacking = styled.div`
    height: 100%;
    width: 100%;

    background-color: white;
    border-radius: 15px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // DEBUG STYLES //
    // border: red solid 5px;
`;

const LoginPrompt = styled.div`
    margin: 2em;
    max-width: 1000px;
    
    border: solid 2px #6c757d;
    border-radius: 0.28571429rem;
    box-shadow: 5px 5px 5px #ccc;
`;
