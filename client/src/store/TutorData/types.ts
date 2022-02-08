import {Course, Appointment} from "../../services/api.types";

export interface TutorDataSlice {
    tutorId: string;
    courses: Array<Course>;
    appointments: Array<Appointment>;
}
