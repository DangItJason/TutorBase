import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../../services/api";
import { User, Name } from "../../../services/api.types";
import { selectClientData } from "../../../store/ClientData/selectors";
import { Container, Row, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, InputGroup, Input, ModalFooter, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./Settings.css";
import defaultUser from "../../../assets/default_user.png";

export const Settings = () => {
    let clientData = useSelector(selectClientData);
    let [nameModalOpen, setNameModalOpen] = useState<boolean>(false);
    let [tempFirstName, setTempFirstName] = useState<string>("");
    let [tempLastName, setTempLastName] = useState<string>("");
    let [clientInfo, setClientInfo] = useState<User>({
        _id: "",
        profile_img: "",
        phone: "",
        email: "",
        first_name: "",
        last_name: "",
    });

    const saveNameChange = async () => {
        let name: Name = {first_name: tempFirstName, last_name: tempLastName};
        if(!(tempFirstName === clientInfo.first_name && tempLastName === clientInfo.last_name))
            await api.SetName(name);
        setNameModalOpen(false);
    }

    const cancelNameChange = () => {
        setNameModalOpen(false); 
        setTempFirstName(clientInfo.first_name); 
        setTempLastName(clientInfo.last_name);
    }

    useEffect(() => {
        const getUser = async () => {
            return (await api.GetUserById(clientData.clientId)).data;
        }
        getUser().then(value => {
            setClientInfo(value[0]); 
            setTempFirstName(value[0].first_name); 
            setTempLastName(value[0].last_name)
        })
    }, [clientData.clientId]);

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
                        {/* <a href="#" className="modal-link">
                            <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>
                        </a> */}
                    </ListGroupItem>
                    <ListGroupItem className="name-item">
                        <span className="heading-item">{clientInfo.first_name} {clientInfo.last_name}</span>
                        <a href="#" className="modal-link" onClick={() => {setNameModalOpen(true)}}>
                            <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>
                        </a>
                        <Modal isOpen={nameModalOpen} fade={false} toggle={() => {setNameModalOpen(!nameModalOpen)}} className="name-modal">
                            <ModalHeader toggle={() => {cancelNameChange()}}>Edit Name</ModalHeader>
                            <ModalBody>
                                Change your name here.
                                <hr/>
                                <InputGroup>
                                    First Name:<Input id="first-name" value={tempFirstName} onChange={(value) => setTempFirstName(value.target.value)} />
                                </InputGroup>
                                <InputGroup>
                                    Last Name:<Input id="last-name" value={tempLastName} onChange={(value) => setTempLastName(value.target.value)} />
                                </InputGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="btn-red" onClick={() => {saveNameChange()}}>Save</Button>{' '}
                                <Button color="secondary" onClick={() => {cancelNameChange()}}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </ListGroupItem>
                 </ListGroup>
             </Row>
        </Container>
    );
}