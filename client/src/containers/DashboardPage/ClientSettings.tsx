import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../../services/api";
import { Name } from "../../services/api.types";
import { selectClientData } from "../../store/ClientData/selectors";
import { actions as clientDataActions } from "../../store/ClientData/slice";
import { Container, Row, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, InputGroup, Input, ModalFooter, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar-edit";
import "./ClientSettings.css";
import defaultUser from "../../assets/default_user.png";
import { CompressAndSaveImg } from "../../services/tools";

export const ClientSettings = () => {
    let clientData = useSelector(selectClientData);
    let dispatch = useDispatch();

    let [nameModalOpen, setNameModalOpen] = useState<boolean>(false);
    let [imgModalOpen, setImgModalOpen] = useState<boolean>(false);
    
    let [tempName, setTempName] = useState<Name>({
        first_name: "", 
        last_name: ""
    });
    let [clientName, setClientName] = useState<Name>({
        first_name: "",
        last_name: ""
    }); 
    let [croppedImg, setCroppedImg] = useState<string>("");
    let [clientImg, setClientImg] = useState<string>("");

    const saveNameChange = async () => {
        let name: Name = {first_name: tempName.first_name, last_name: tempName.last_name};
        await api.SetClientName(name, clientData.clientId);
        setClientName(name);
        dispatch(clientDataActions.setFirstName(tempName.first_name));
        dispatch(clientDataActions.setLastName(tempName.last_name));
        setNameModalOpen(false);
    }

    const handleImageSave = async (img: string) => {
        await api.SetClientProfileImage(img, clientData.clientId);
        setClientImg(img);
        dispatch(clientDataActions.setProfileImage(img));
    }

    const saveImgChange = async () => {
        if(croppedImg.toString() !== "") {
            CompressAndSaveImg(croppedImg, clientData.first_name + clientData.last_name + "-photo", handleImageSave);
        } else {
            handleImageSave(croppedImg);
        }

        setImgModalOpen(false);
    }

    const cancelNameChange = () => {
        setNameModalOpen(false); 
        setTempName(clientName);
    }

    const cancelImgChange = () => {
        setCroppedImg("");
        setImgModalOpen(false);
    }

    useEffect(() => {
        const getUser = async () => {
            return (await api.GetUserById(clientData.clientId)).data;
        }
        getUser().then(value => {
            setTempName({first_name: value[0].first_name, last_name: value[0].last_name});
            setClientName({first_name: value[0].first_name, last_name: value[0].last_name});
            setClientImg(value[0].profile_img);
            dispatch(clientDataActions.setFirstName(value[0].first_name));
            dispatch(clientDataActions.setLastName(value[0].last_name));
            dispatch(clientDataActions.setProfileImage(value[0].profile_img));
        });
        
    }, [clientData.clientId, dispatch]);

    return (
        <Container className="settings" fluid>
            <Row className="title" style={{ marginTop: '25px'}}>
            <div className="profile-text">Settings</div>
            </Row>

            <hr></hr>

             <Row>
                <ListGroup>

                    <ListGroupItem className="img-item">
                        <img src={clientImg === ""  ? defaultUser : clientImg} width="200px"/>
                        <a href="#" className="modal-link" onClick={() => setImgModalOpen(true)}>
                            <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>
                        </a>
                        <Modal isOpen={imgModalOpen} fade={false} toggle={() => {setImgModalOpen(!imgModalOpen)}} className="img-modal">
                            <ModalHeader toggle={() => {cancelImgChange()}}>Edit Profile Photo</ModalHeader>
                            <ModalBody>
                                Change your profile photo here.
                                <hr/>
                                <Avatar
                                    width={250}
                                    height={250}
                                    cropColor="#E66064"
                                    closeIconColor="#E66064"
                                    onCrop={(img) => setCroppedImg(img)}
                                    onClose={() => {setCroppedImg("")}}
                                    onBeforeFileLoad={() => {}}
                                    src={clientImg === "" ? defaultUser : clientImg}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button className="btn-red" onClick={() => {saveImgChange()}}>Save</Button>
                                <Button color="secondary" onClick={() => {cancelImgChange()}}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </ListGroupItem>

                    <ListGroupItem className="name-item">
                        <span className="heading-item">{clientName.first_name} {clientName.last_name}</span>
                        <a href="#" className="modal-link" onClick={() => {setNameModalOpen(true)}}>
                            <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>
                        </a>
                        <Modal isOpen={nameModalOpen} fade={false} toggle={() => {setNameModalOpen(!nameModalOpen)}} className="name-modal">
                            <ModalHeader toggle={() => {cancelNameChange()}}>Edit Name</ModalHeader>
                            <ModalBody>
                                Change your name here.
                                <hr/>
                                <InputGroup>
                                    First Name:<Input id="first-name" value={tempName.first_name} onChange={(value) => setTempName({first_name: value.target.value, last_name: tempName.last_name})} />
                                </InputGroup>
                                <InputGroup>
                                    Last Name:<Input id="last-name" value={tempName.last_name} onChange={(value) => setTempName({first_name: tempName.first_name, last_name: value.target.value})} />
                                </InputGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="btn-red" onClick={() => {saveNameChange()}}>Save</Button>
                                <Button color="secondary" onClick={() => {cancelNameChange()}}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </ListGroupItem>

                 </ListGroup>
             </Row>
        </Container>
    );
}