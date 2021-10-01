interface IProps {
    course: string;
    location: string;
    start: string;
    end: string;
}


export default function ApptCard({course, location, start, end}: IProps) {
    return (
        <div className="card">
            <p>Course: {course}</p>
            <p>Start Time: {start}</p>
            <p>End Time: {end}</p>
            <p>Location: {location}</p>
        </div>
    )
}

