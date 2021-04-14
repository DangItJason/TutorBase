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
