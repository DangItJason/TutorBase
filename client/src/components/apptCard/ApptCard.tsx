import { Container } from "reactstrap";
import "./ApptCard.css";

interface IProps {
    client: string;
    course: string;
    location: string;
    start: string;
    end: string;
}

const formatDate = (str: string) => {
    const date = new Date(str);
    let yr = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + yr;
}

export default function ApptCard({client, course, location, start, end}: IProps) {
    return (
        <div className="card">
            <Container>
                <div className="card-client">{client}</div>
                <div className="card-course">{course}</div>
                <div className="card-time">{formatDate(start)}</div>
                <div className="card-location">{location}</div>
            </Container>
        </div>
    );
}

