import React, { Component } from "react";
import classNames from "classnames";
import { Container, Row, Col, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, InputGroup, Input, Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faBan, faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Slider from 'react-rangeslider';
import Autocomplete from 'react-autocomplete';
import 'react-rangeslider/lib/index.css';
import "./data.css";

class Settings extends Component {

  render() {
    return (
      <Container fluid className="background">
        <Row className="title">
          <div class="profile-text">Data</div>
        </Row>
        <hr></hr>
        <Row xs="2" className="parent">

        </Row>
        <Row>
            <ListGroup className="top_container">
                <ListGroupItem className="bubble-container">
                    hello world
                </ListGroupItem>
                <ListGroupItem className="bubble-container">
                    hello world
                </ListGroupItem>
                <ListGroupItem className="bubble-container">
                    hello world
                </ListGroupItem>
            </ListGroup>
        </Row>
      </Container>
    );
  }
}

export default Settings;
