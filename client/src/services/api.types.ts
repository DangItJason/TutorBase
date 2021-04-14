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

export interface TutorTimes {
    Sunday: Array<number>,
    Monday: Array<number>,
    Tuesday: Array<number>,
    Wednesday: Array<number>,
    Thursday: Array<number>,
    Friday: Array<number>,
    Saturday: Array<number>,
}