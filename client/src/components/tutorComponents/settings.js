import React, { Component } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./settings.css";

class Settings extends Component {
  state = {
    profile: "Jason Nguyen",
    price: "55",
  };
  render() {
    return (
      <Container fluid>
        <Row className="title">
          <div class="profile-text">Settings</div>
        </Row>
        <hr></hr>
        <Row xs="2" className="parent">
          <Col xl="6">
            {/* <Row className='heading-text'>
                            {this.state.profile}  
                            <FontAwesomeIcon icon={faEdit} className='font-adj'></FontAwesomeIcon>
                            {this.state.price}/h
                            <FontAwesomeIcon icon={faEdit} className='font-adj'></FontAwesomeIcon>
                        </Row> */}
            <ListGroup className="heading-text">
              <ListGroupItem>
                {this.state.profile}
                <FontAwesomeIcon
                  icon={faEdit}
                  className="font-adj"
                ></FontAwesomeIcon>
                {this.state.price}/h
                <FontAwesomeIcon
                  icon={faEdit}
                  className="font-adj"
                ></FontAwesomeIcon>
              </ListGroupItem>
              <ListGroupItem>
                  Description
                  <FontAwesomeIcon
                  icon={faEdit}
                  className="font-adj"
                ></FontAwesomeIcon>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col xl="6">
            <Row className="heading-text">
              <div>Availability</div>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Settings;
