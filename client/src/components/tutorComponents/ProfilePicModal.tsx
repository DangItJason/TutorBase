import React from "react";
import { api } from "../../services/api";
import {  Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar-edit";
import "../../containers/DashboardPage/ClientSettings.css";
import defaultUser from "../../assets/default_user.png";
import { CompressAndSaveImg } from "../../services/tools";


 export interface IProfilePicModalProps {
    isTutor:boolean,
    firstName:string,
    lastName:string,
    clientImg:string,
    imgModalOpen:boolean,
    croppedImg:string,
    setImgModalOpen: (arg:boolean) => void,
    cancelImgChange: () => void,
    setCroppedImg: (arg:string) =>void,
    setClientImg: (arg:string) =>void,  
    userid:string, 
}

export const ProfilePicModal = (props:IProfilePicModalProps) => {

    const {clientImg,imgModalOpen,croppedImg,userid} = props;
    const {setImgModalOpen,cancelImgChange,setCroppedImg,setClientImg} = props;

    const handleImageSave = async (img: string) => {
        
        if (props.isTutor === true){
            console.log(userid)
            await api.SetTutorProfileImage(img, userid);
        }
        else{

            await api.SetClientProfileImage(img, userid);

        }
        setClientImg(img);
    }

    const saveImgChange = async () => {
        if(croppedImg.toString() !== "") {
            CompressAndSaveImg(croppedImg, props.firstName + props.lastName + "-photo", handleImageSave);
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
                        imageHeight={250}
                        cropColor="#E66064"
                        closeIconColor="#E66064"
                        onCrop={(img) => setCroppedImg(img)}
                        onClose={() => {setCroppedImg("")}}
                        onBeforeFileLoad={() => {}}
                        src={clientImg}
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