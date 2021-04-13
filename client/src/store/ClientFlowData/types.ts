export interface ClientFlowSlice {
    sidebarToggled: boolean; // TODO: Move to some other slice
    clientId: string; // TODO: Move to some authentication slice

    currentStep: number;
    furthestStep: number;

    selectedCourse: Course;
    selectedTutor: Tutor;

    availableTutorIds: Array<string>;
    availableSubjectIds: Array<string>;

    appointmentDate: string;
    appointmentStartTime: string;
    appointmentEndTime: string;
    appointmentNotes: string;
    appointmentConfirmed: boolean;
    appointmentLocation: string;
    appointmentSubjectId: string;
}

export interface Course {
    name: string;
    id: string;
}

export interface Tutor {
    name: string;
    id: string;
}
