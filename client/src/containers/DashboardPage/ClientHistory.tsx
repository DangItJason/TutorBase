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
import { Appointment } from "../../services/api.types";
import { api } from "../../services/api";
import { selectClientData } from "../../store/ClientData/selectors";

export const ClientHistory = () => {
    let clientData = useSelector(selectClientData);
    let [dropDownOpen, setDropdownOpen] = useState<boolean>(false);
    let [dropDownValue, setDropdownValue] = useState<String>("All");
    let [appointments, setAppointments] = useState<Array<Appointment>>([]);
    let dispatch = useDispatch();

    useEffect(() => {
        const getAppointments = async () => {
            return (await api.GetClientAppointments(clientData.clientId)).data.reverse();
        }

        getAppointments().then(value => {
                setAppointments(value);
                dispatch(clientDataActions.setAppointment(value));
            }
        )
    }, [clientData.clientId, dispatch]);

    let filteredAppointments = appointments;
    if (dropDownValue==="Denied"){
        filteredAppointments = appointments.filter((appointment) => !appointment.confirmed);
    } else if (dropDownValue==="Completed"){
        filteredAppointments = appointments.filter((appointment) => appointment.confirmed);
    }

    let meetingCards = filteredAppointments.map(appointment => (
        <MeetingCard appt={appointment} isTutor={false} includePrevious={true}/>
    ));

    return (
        <Container fluid style={{maxWidth:"100vw"}}>
            <Row className="title" style={{ marginTop: '25px'}}>
            <div className="profile-text">History</div>
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
                            setDropdownValue("Completed");
                            setDropdownOpen(false);
                        }}>Completed</DropdownItem>
                    <DropdownItem
                        onClick={(event) => {
                            setDropdownValue("Denied");
                            setDropdownOpen(false);
                        }}>Denied</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            {meetingCards}
        </Container>
    );
}
