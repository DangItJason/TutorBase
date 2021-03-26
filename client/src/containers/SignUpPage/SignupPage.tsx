import * as React from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label, Row,} from "reactstrap";
import {useState} from "react";

export function SignupPage() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const onSubmit = (values: any) => {
        console.log(values)
    }

    return (
        <Container className="loginContainer" fluid="sm">
            <Form onSubmit={onSubmit}>
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
                                    value={firstName}
                                    onChange={event => setFirstName(event.target.value)}
                                    autoComplete="off"
                                />
                            </Col>
                            {/*<Col xs="auto">*/}
                            {/*    <div>*/}
                            {/*        {this.props.auth.firstNameValid ? (*/}
                            {/*            <MdCheck size="30px" color="green"></MdCheck>*/}
                            {/*        ) : (*/}
                            {/*            <VscError size="30px" color="red"></VscError>*/}
                            {/*        )}*/}
                            {/*    </div>*/}
                            {/*</Col>*/}
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
                                    value={lastName}
                                    onChange={event => setLastName(event.target.value)}
                                    autoComplete="off"
                                />
                            </Col>
                            {/*<Col xs="auto">*/}
                            {/*    <div>*/}
                            {/*        {this.props.auth.lastNameValid ? (*/}
                            {/*            <MdCheck size="30px" color="green"></MdCheck>*/}
                            {/*        ) : (*/}
                            {/*            <VscError size="30px" color="red"></VscError>*/}
                            {/*        )}*/}
                            {/*    </div>*/}
                            {/*</Col>*/}
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
                                    name="phone_number"
                                    placeholder="phone number"
                                    value={phoneNumber}
                                    onChange={event => setPhoneNumber(event.target.value)}
                                    autoComplete="off"
                                />
                            </Col>
                            {/*<Col xs="auto">*/}
                            {/*    <div>*/}
                            {/*        {this.props.auth.lastNameValid ? (*/}
                            {/*            <MdCheck size="30px" color="green"></MdCheck>*/}
                            {/*        ) : (*/}
                            {/*            <VscError size="30px" color="red"></VscError>*/}
                            {/*        )}*/}
                            {/*    </div>*/}
                            {/*</Col>*/}
                        </Row>
                    </Container>
                </FormGroup>
                {/*<div>{this.props.auth.loginValid ? "" : "Invalid Fields"}</div>*/}
                <Button color="danger" type="submit">
                    Create Account
                </Button>
            </Form>
        </Container>
    );
}
