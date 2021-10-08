import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import { actions as tutorDataActions } from "../../../store/TutorData/slice";
import { Appointment } from "../../../services/api.types";
import { api } from "../../../services/api";
import { selectTutorData } from "../../../store/TutorData/selectors";
import ApptCard from "../../../components/apptCard/ApptCard";
import "./meeting-history.css";

export const MeetingHistory = () => {
    let tutorData = useSelector(selectTutorData);
    let [pastAppointments, setPastAppointments] = useState<Array<Appointment>>([]);

    useEffect(() => {
        const getAppointments = async () => {
            return (await api.GetTutorAppointments(tutorData.tutorId)).data;
        }

        getAppointments().then(value => {
            value.filter(appointment => {
                const start = new Date(appointment.start_time);
                return start.getTime() < new Date().getTime();
            });
            setPastAppointments(value);
        })
    }, [tutorData.tutorId]);

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