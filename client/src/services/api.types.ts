export interface SubjectsResponse {
    data: Array<Subject>;
}

export interface Subject {
    courses: Array<string>;
    _id: string;
    id: string;
}
