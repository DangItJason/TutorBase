import * as React from "react";
import {Button, Container, Label, Row} from "reactstrap";
import {useHistory} from "react-router-dom";
import {ApiBaseAddress} from "../../utils/Environment";

export function LoginPage() {
    const history = useHistory();
    const redirectToCas = () => {
        window.location.href = ApiBaseAddress + "api/login";
    };

    return (
        <Container className="loginContainer" fluid="sm">
            <Row>
                <Label className="loginText">Login</Label>
            </Row>
            <Row>
                <Button color="danger" onClick={() => redirectToCas()}>
                    Sign In with RPI Email
                </Button>
            </Row>
        </Container>
    );
}
