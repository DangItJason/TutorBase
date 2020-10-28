import React, { Component } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./meetings.css";

class Meetings extends Component {


    render() {
        return (
            <Container fluid>
            <Row className="title">
                <div class="profile-text">Settings</div>
            </Row>
            <hr></hr>

            </Container>
        )
    }
}

export default Meetings;