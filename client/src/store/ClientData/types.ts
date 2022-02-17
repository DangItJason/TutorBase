import {Appointment} from "../../services/api.types";

export interface ClientDataSlice {
    clientId: string;
    appointments: Array<Appointment>;
    profile_img: string;
    phone: string;
    email: string;
    first_name: string;
    last_name: string;
    isTutor: boolean;
}
