import {ApiBaseAddress} from "../utils/Environment";
import axios from "axios";
import {Appointment, AppointmentsResponse, CoursesResponse, SubjectsResponse, TutorsResponse, UserResponse} from "./api.types";

export class ApiService {
    private usersEndpoint = ApiBaseAddress + "api/users/";
    private appointmentsEndpoint = ApiBaseAddress + "api/appointment/";
    private tutorsEndpoint = ApiBaseAddress + "api/tutors/";
    private coursesEndpoint = ApiBaseAddress + "api/courses/";
    private subjectsEndpoint = ApiBaseAddress + "api/subjects/";

    public async GetSubjects() {
        console.log("Fetching subjects");
        let response = await axios.get(this.subjectsEndpoint);
        let subjects: SubjectsResponse = {data: []}
        subjects.data = response.data;
        console.log("Subjects", subjects.data);
        return subjects;
    }

    public async GetCourses(subject: String) {
        console.log("Fetching courses");
        let url = this.coursesEndpoint + 'subject/' + subject;
        let response = await axios.get(url);
        let courses: CoursesResponse = {data: []}
        courses.data = response.data;
        console.log("Courses", courses.data);
        return courses;
    }

    public async GetTutorById(id: String) {
        console.log("Fetching Tutor");
        let url = this.tutorsEndpoint + 'tutor/' + id;
        let response = await axios.get(url);
        let tutor: TutorsResponse = {data: []}
        tutor.data = response.data;
        console.log("Tutor", tutor.data);
        return tutor;
    }

    public async GetUserById(id: String) {
        console.log("Fetching User");
        let url = this.usersEndpoint + 'user?userid=' + id;
        let response = await axios.get(url);
        let user: UserResponse = {data: []}
        user.data = response.data;
        return user;
    }

    public async GetTutorAppointments(id: String) {
        let url = this.appointmentsEndpoint + "tutors/" + id;
        let appt: AppointmentsResponse = {data: []}
        let response = await axios.get(url);
        if(response.status !== 200) return appt;
        appt.data = response.data;
        return appt;
    }

    public async GetClientAppointments(id: String) {
        let url = this.appointmentsEndpoint + "clients/" + id;
        let appt: AppointmentsResponse = {data: []}
        let response = await axios.get(url);
        if(response.status !== 200) return appt;
        appt.data = response.data;
        return appt;
    }

    public async CreateAppointment(appointment: Appointment) {
        //TODO: Create appointment
        let url = this.appointmentsEndpoint;
        let body = {
            course_id: appointment.course_id,
            startTime: appointment.start_time,
            endTime: appointment.end_time,
            location: appointment.location,
            tutor_id: appointment.tutor_id,
            client_id: appointment.client_id,
            price: appointment.price,
            notes: appointment.notes
        }

        return await axios.post(url, body);
    }
}

export const api = new ApiService();
