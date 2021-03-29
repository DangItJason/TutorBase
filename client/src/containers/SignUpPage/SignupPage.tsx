import React, {useState} from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {Link, useHistory} from "react-router-dom";
import {MdCheck} from "react-icons/md";
import {VscError} from "react-icons/vsc";
import "../../styles/Login.css";
import {ApiBaseAddress} from "../../utils/Environment";

export function SignUpPage() {
    const [signUpData, setSignUpData] = useState({
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
    });

    const history = useHistory();

    // TODO: Add a phone number field
    const HandleChange = (event: any) => {
        let name = event.target.name;
        let value = event.target.value;

        if(name === "first_name")
            IsFirstNameValid(value)
        else if (name === "last_name")
            IsLastNameValid(value)
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

    const CreateUser = async () => {
        let body = {
            "email": "test@test.com", // Somehow get returned email
            "first_name": signUpData.first_name,
            "last_name": signUpData.last_name
        }
        await fetch(ApiBaseAddress + "api/users", {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
        history.push("home");
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

            <Container className="signupContainer" fluid="xs">
                <Row>
                    <Col xs="1"/>
                    <Col xs="11">
                        <Form onSubmit={event => SubmitEvent(event)}>
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
                                                placeholder="last name"
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
                            <div>
                                {signUpData.loginValid ? '' : 'Invalid Fields'}
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

