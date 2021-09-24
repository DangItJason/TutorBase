import { Container, Row } from "reactstrap";
import "./meeting-history.css";

export const MeetingHistory = () => {
    return (
        <Container fluid>
            <Row className="title">
                <div className="header-text">Meeting History</div>
            </Row>

        <hr></hr>
      </Container>
    );
}

export default MeetingHistory;