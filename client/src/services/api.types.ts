export interface SubjectsResponse {
    data: Array<Subject>;
}

export interface Subject {
    courses: Array<string>;
    _id: string;
    id: string;
}

export interface CoursesResponse {
    data: Array<Course>;
}

export interface Course {
    tutors: Array<string>;
    _id: string;
    subject: string;
    name: string;
    id: string;
}

export interface TutorsResponse {
    data: Array<Tutor>;
}

export interface UserResponse {
    data: Array<User>;
}

export interface AppointmentsResponse {
    data: Array<Appointment>;
}
export interface AppointmentsResponseWithData {
    data: Array<IAppointmentEndpoint>;
}
export interface Tutor {
    _id: string;
    times: TutorTimes,
    profile_img: string,
    phone: string,
    price: string,
    interval: string,
    email: string, // User email (ID)
    first_name: string,
    last_name: string,
}

export interface User {
    _id: string,
    profile_img: string;
    phone: string,
    email: string,
    first_name: string,
    last_name: string,
}

export interface Name {
    first_name: string,
    last_name: string
}

export interface Appointment {
    appt_id: string;
    course_id: string,
    start_time: string,
    end_time: string,
    location: string,
    tutor_id: string,
    client_id: string, // User email (ID)
    price: string,
    notes: string,
    confirmed: boolean,
    link?: string,
}

export interface IAppointmentEndpoint {
    appt_id: string;
    course_id: string;
    start_time: string;
    end_time: number;
    location: string;
    tutor_id: string;
    client_id: string; // User email (ID)
    price: number;
    notes: string;
    confirmed: boolean;
    __v?: number;
    _id?: string;
    meetingLink?: string,
}


export interface TutorTimes {
    Sunday: Array<number>,
    Monday: Array<number>,
    Tuesday: Array<number>,
    Wednesday: Array<number>,
    Thursday: Array<number>,
    Friday: Array<number>,
    Saturday: Array<number>,
}

export interface Feedback {
    message: string,
    rating: number,
    clientId: string,
    tutorId: string,
}
