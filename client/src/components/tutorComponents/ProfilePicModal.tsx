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
import "../../containers/DashboardPage/ClientSettings.css";
import defaultUser from "../../assets/default_user.png";
import { CompressAndSaveImg } from "../../services/tools";


 export interface IProfilePicModalProps {
    clientImg:string,
    imgModalOpen:boolean,
    croppedImg:string,
    setImgModalOpen: (arg:boolean) => void,
    cancelImgChange: () => void,
    setCroppedImg: (arg:string) =>void,
    setClientImg: (arg:string) =>void,   
}

export const ProfilePicModal = (props:IProfilePicModalProps) => {
    let clientData = useSelector(selectClientData);
    let dispatch = useDispatch();

    const {clientImg,imgModalOpen,croppedImg} = props;
    const {setImgModalOpen,cancelImgChange,setCroppedImg,setClientImg} = props;

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
    return (
        <>
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
        </>


    );


}