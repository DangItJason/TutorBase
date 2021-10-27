import React, { useEffect, useState } from "react";
import { Container, Row, ListGroup, ListGroupItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./Settings.css";
import defaultUser from "../../../assets/default_user.png";

export const Settings = () => {
    let [firstName, setFirstName] = useState<String>("");
    let [lastName, setLastName] = useState<String>("");
    let [photo, setPhoto] = useState<String>("");

    return (
        <Container className="settings" fluid>
            <Row className="title" style={{ marginTop: '25px'}}>
            <div className="profile-text">Settings</div>
            </Row>

            <hr></hr>

             <Row>
                <ListGroup>
                    <ListGroupItem className="img-item">
                        <img src={defaultUser} width="200px"/>
                        <a href="#" className="modal-link">
                            <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>
                        </a>
                    </ListGroupItem>
                    <ListGroupItem className="name-item">
                        <span className="heading-item">FirstName LastName</span>
                        <a href="#" className="modal-link">
                            <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>
                        </a>
                    </ListGroupItem>
                 </ListGroup>
             </Row>
        </Container>
    );
}