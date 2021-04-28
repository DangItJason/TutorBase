import {Subject, Tutor} from "../../services/api.types";

export interface ClientFlowSlice {
    sidebarToggled: boolean; // TODO: Move to some other slice
    clientId: string; // TODO: Move to some authentication slice

    currentStep: number;
    furthestStep: number;

    selectedCourse: Course;
    selectedTutor: Tutor;
    selectedSubject: Subject;

    availableTutors: Array<Tutor>;
    availableTutorIds: Array<string>;
    availableSubjects: Array<Subject>;

    appointmentDate: string;
    appointmentStartTime: string;
    appointmentEndTime: string;
    appointmentNotes: string;
    appointmentConfirmed: boolean;
    appointmentLocation: string;
    appointmentSubjectId: string;

    isLoading: boolean;
}

export interface Course {
    name: string;
    id: string;
}

// export interface Tutor {
//     name: string;
//     id: string;
// }
