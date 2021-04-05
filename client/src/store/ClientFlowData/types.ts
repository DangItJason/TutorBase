export interface ClientFlowSlice {
    sidebarToggled: boolean;
    currentStep: number;
    furthestStep: number;
    courseName: string;
    courseId: string;
    tutorName: string;
    tutorId: string;
    tutorPrice: string;
    subjectId: string;
    clientId: string;
    tutorIds: Array<string>;
    apptDate: string;
    apptStartTime: string;
    apptEndTime: string;
    apptNotes: string;
    apptConfirm: boolean;
    apptLoc: string;
    apptSubj: string;
}
