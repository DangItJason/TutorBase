import React, {useState} from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {Link, useHistory} from "react-router-dom";
import {MdCheck} from "react-icons/md";
import {VscError} from "react-icons/vsc";
import "../../styles/Login.css";
import {ApiBaseAddress} from "../../utils/Environment";
import {values} from "rambda";
import * as isEmail from 'email-validator';

export function SignUpPage() {
    const [signUpData, setSignUpData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone_number: "",
        visible: false,
        passwordValid: false,
        emailValid: false,
        firstNameValid: false,
        lastNameValid: false,
        phoneValid: false,
        loginValid: true,
        emailTaken: false,
    });

    const history = useHistory();

    const HandleChange = (event: any) => {
        let name = event.target.name;
        let value = event.target.value;

        if (name === "first_name")
            IsFirstNameValid(value)
        else if (name === "last_name")
            IsLastNameValid(value)
        else if (name === "email")
            IsEmailValid(value)
    };

    const IsFirstNameValid = (value: any) => {
        let firstValid = false;
        if (value.length > 0)
            firstValid = true

        setSignUpData({
            ...signUpData,
            first_name: value,
            firstNameValid: firstValid,
        })
    }

    const IsLastNameValid = (value: any) => {
        let lastValid = false;
        if (value.length > 0)
            lastValid = true

        setSignUpData({
            ...signUpData,
            last_name: value,
            lastNameValid: lastValid,
        })
    }

    const IsEmailValid = (value: string) => {
        setSignUpData((signUpData: any) => ({
            ...signUpData,
            email: value,
            emailValid: isEmail.validate(value),
            emailTaken: false,
        }));
    }

    const IsPhoneNumberValid = (value: any) => {
        let phoneValid = false;
        if (value.length === 0 || (value.length === 10 && value.match(/^[0-9]+$/) != null))
            phoneValid = true

        setSignUpData({
            ...signUpData,
            phone_number: value,
            phoneValid: phoneValid,
        })
    }

    const CreateUser = async () => {
        let body = {
            "email": signUpData.email,
            "first_name": signUpData.first_name,
            "last_name": signUpData.last_name,
            "phone": signUpData.phone_number,
        }

        const request = await fetch(ApiBaseAddress + "api/users", {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        });

        if (request.ok) {
            history.push("home");
        } else {
            setSignUpData((signUpData) => ({
                ...signUpData,
                emailTaken: true,
                emailValid: false,
            }));
        }
    }
        
    const SubmitEvent = (event: any) => {
        event.preventDefault();
        if (signUpData.firstNameValid && signUpData.lastNameValid) {
            CreateUser();
        } else {
            setSignUpData({
                ...signUpData,
                loginValid: false
            });
        }
    };

    return (
        <div className="flexBox">

            <Container className="signupContainer" fluid="xs" style={{padding: "3%", margin: "10em"}}>
                <Row>
                    <Col xs="1"/>
                    <Col xs="11">
                        <Form onSubmit={event => SubmitEvent(event)}>
                            <Label className="signupText">Sign Up</Label>
                            <FormGroup row>
                                <Container>
                                    <Row>
                                        <Col xs="auto">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="first_name"
                                                placeholder="First Name"
                                                value={signUpData.first_name}
                                                onChange={event => HandleChange(event)}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <div>
                                                {signUpData.firstNameValid ?
                                                    <MdCheck size="30px" color="green"></MdCheck> :
                                                    <VscError size="30px" color="red"></VscError>}
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
                                                placeholder="Last Name"
                                                value={signUpData.last_name}
                                                onChange={event => HandleChange(event)}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <div>
                                                {signUpData.lastNameValid ?
                                                    <MdCheck size="30px" color="green"></MdCheck> :
                                                    <VscError size="30px" color="red"></VscError>}
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
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                placeholder="Email"
                                                value={signUpData.email}
                                                onChange={event => HandleChange(event)}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <div>
                                                {signUpData.emailValid ?
                                                    <MdCheck size="30px" color="green"></MdCheck> :
                                                    <VscError size="30px" color="red"></VscError>}
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
                                                type="number"
                                                className="form-control"
                                                name="phone"
                                                placeholder="Cell Number (optional)"
                                                value={signUpData.phone_number}
                                                onChange={event => HandleChange(event)}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <div>
                                                {signUpData.phoneValid ? (
                                                    <MdCheck size="30px" color="green"></MdCheck>
                                                ) : (
                                                    <VscError size="30px" color="red"></VscError>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </FormGroup>
                            <div>
                                {signUpData.loginValid ? '' : 'Invalid Fields'}
                            </div>
                            <div>
                                {signUpData.emailTaken && 'Email already taken'}
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
