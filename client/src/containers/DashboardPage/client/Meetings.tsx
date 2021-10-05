import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, ListGroup, ListGroupItem } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./meetings.css";
import { MeetingCard } from "../../../components/meetingCard/MeetingCard";
import {actions as clientDataActions} from "../../../store/ClientData/slice";
import { Appointment } from "../../../services/api.types";
import { api } from "../../../services/api";
import { selectClientData } from "../../../store/ClientData/selectors";

export const Meetings = () => {
    let clientData = useSelector(selectClientData);
    let [dropDownOpen, setDropdownOpen] = useState<boolean>(false);
    let [dropDownValue, setDropdownValue] = useState<String>("All");
    let [appointments, setAppointments] = useState<Array<Appointment>>([]);
    let dispatch = useDispatch();

    useEffect(() => {
        const getAppointments = async () => {
            return (await api.GetClientAppointments(clientData.clientId)).data;
        }

        getAppointments().then(value => {
                setAppointments(value);
                dispatch(clientDataActions.setAppointment(value));
            }
        )
    }, [clientData.clientId, dispatch]);

    // const filteredAppts = appointments.filter( (appointment) => {
    //     if (dropDownValue === "Pending") {
    //         return !appointment.confirmed
    //     } else if (dropDownValue === "Upcoming") {
    //         return appointment.confirmed
    //     }
    //     return true
    // });

    // console.log(filteredAppts)
        
    let meetingCards = appointments.map(appointment => (
        <MeetingCard appt={appointment} isTutor={false}/>
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