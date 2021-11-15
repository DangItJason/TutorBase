import {Appointment} from "../../services/api.types";

export interface TutorDataSlice {
    tutorId: string;
    appointments: Array<Appointment>;
}
