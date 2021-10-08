import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import { actions as clientDataActions } from "../../../store/ClientData/slice";
import { Appointment } from "../../../services/api.types";
import { api } from "../../../services/api";
import { selectClientData } from "../../../store/ClientData/selectors";
import ApptCard from "../../../components/apptCard/ApptCard";
import "./meeting-history.css";

export const MeetingHistory = () => {
    let clientData = useSelector(selectClientData);
    let [pastAppointments, setPastAppointments] = useState<Array<Appointment>>([]);
    let dispatch = useDispatch();

    useEffect(() => {
        const getAppointments = async () => {
            return (await api.GetClientAppointments(clientData.clientId)).data;
        }

        getAppointments().then(value => {
            dispatch(clientDataActions.setAppointment(value));
            value = value.filter(appointment => {
                const start = new Date(appointment.start_time);
                return start.getTime() < new Date().getTime();
            });
            setPastAppointments(value);
        })
    }, [clientData.clientId]);

    return (
        <Container fluid>
            <Row className="title">
                <div className="header-text">Meeting History</div>
            </Row>

            <hr></hr>
            
            <Container className="appointments">
                {pastAppointments.map((meeting, i) => (
                    <ApptCard key={i}
                        client={meeting.client_id}
                        course={meeting.course_id}
                        location={meeting.location}
                        start={meeting.start_time}
                        end={meeting.end_time} 
                    />
                ))}
            </Container>
      </Container>
    );
}

export default MeetingHistory;