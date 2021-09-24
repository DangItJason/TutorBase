import {Appointment, Subject, Tutor} from "../../services/api.types";

export interface ClientDataSlice {
    clientId: string;
    appointments: Array<Appointment>;
}
