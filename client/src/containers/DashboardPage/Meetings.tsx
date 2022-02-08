import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./meetings.css";
import { MeetingCard } from "../../components/meetingCard/MeetingCard";
import {actions as clientDataActions} from "../../store/ClientData/slice";
import {actions as tutorDataActions} from "../../store/TutorData/slice";
import { Appointment } from "../../services/api.types";
import { api } from "../../services/api";
import { selectClientData } from "../../store/ClientData/selectors";
import { selectTutorData } from "../../store/TutorData/selectors";

export interface IParams {
    mode: string; // tutor or client
}

export const Meetings = (params: IParams) => {
    let clientData = useSelector(selectClientData);
    let tutorData = useSelector(selectTutorData);
    let [dropDownOpen, setDropdownOpen] = useState<boolean>(false);
    let [dropDownValue, setDropdownValue] = useState<String>("All");
    let [appointments, setAppointments] = useState<Array<Appointment>>([]);
    let dispatch = useDispatch();

    useEffect(() => {
        const getAppointments = async () => {
            return params.mode === "Tutor" ? (await api.GetTutorAppointments(tutorData.tutorId)).data : 
            (await api.GetClientAppointments(clientData.clientId)).data;
        }

        getAppointments().then(value => {
                
                setAppointments(value);
                if(params.mode === "Tutor")
                    dispatch(tutorDataActions.setAppointment(value));
                else
                    dispatch(clientDataActions.setAppointment(value));
            }
        )
    }, [clientData.clientId, tutorData.tutorId, dispatch]);


    let filteredAppointments = appointments;
    if (dropDownValue==="Pending"){
        filteredAppointments = appointments.filter((appointment) => !appointment.confirmed);
    } else if (dropDownValue==="Upcoming"){
        filteredAppointments = appointments.filter((appointment) => appointment.confirmed);
    }

    let meetingCards = filteredAppointments.map(appointment => (
        <MeetingCard appt={appointment} isTutor={params.mode==="Tutor"} includePrevious={false}/>
    ));


    return (
        <Container fluid>
            <Row className="title" style={{ marginTop: '25px'}}>
            <div className="profile-text">Meetings</div>
            </Row>

            <hr></hr>

            <Dropdown isOpen={dropDownOpen} toggle={() => {setDropdownOpen(!dropDownOpen)}}>
                <DropdownToggle caret >
                    {dropDownValue}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem 
                        onClick={(event) => {
                            setDropdownValue("All");
                            setDropdownOpen(false);
                        }}>All</DropdownItem>
                    <DropdownItem 
                        onClick={(event) => {
                            setDropdownValue("Pending");
                            setDropdownOpen(false);
                        }}>Pending</DropdownItem>
                    <DropdownItem 
                        onClick={(event) => {
                            setDropdownValue("Upcoming");
                            setDropdownOpen(false);
                        }}>Upcoming</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            {meetingCards}
        </Container>
    );
}