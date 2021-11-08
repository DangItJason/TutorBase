import {ApiBaseAddress} from "../utils/Environment";
import axios from "axios";
import {
    Appointment,
    Name,
    AppointmentsResponse,
    CoursesResponse,
    SubjectsResponse,
    AppointmentsResponseWithData,
    TutorsResponse,
    UserResponse,
    Feedback
} from "./api.types";

export class ApiService {
    private usersEndpoint = ApiBaseAddress + "api/users/";
    private appointmentsEndpoint = ApiBaseAddress + "api/appointment/";
    private tutorsEndpoint = ApiBaseAddress + "api/tutors/";
    private coursesEndpoint = ApiBaseAddress + "api/courses/";
    private subjectsEndpoint = ApiBaseAddress + "api/subjects/";
    private feedbackEndpoint = ApiBaseAddress + "api/feedback";

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

    public async GetTutorAppointmentsWithData(id: String) {
        let url = this.appointmentsEndpoint + "tutors/" + id;
        let response = await axios.get(url);
        if(response.status != 200) return null;
        let appt: AppointmentsResponseWithData = {data: []}
        appt.data = await response.data;
        return appt;
    }

    public async CreateAppointment(appointment: Appointment) {
        let url = this.appointmentsEndpoint;
        let body = {
            course_id: appointment.course_id,
            date: appointment.start_time,
            end: appointment.end_time,
            loc: appointment.location,
            tutor_id: appointment.tutor_id,
            client_id: appointment.client_id,
            price: appointment.price,
            notes: appointment.notes
        }

        console.log("== DEBUG == Creating appointment: ", body)

        return await axios.post(url, body);
    }

    public async SubmitFeedback(feedback: Feedback) {
        let url = this.feedbackEndpoint;
        let body = {
            message: feedback.message,
            rating: feedback.rating,
            tutorId: feedback.tutorId,
            clientId: feedback.clientId
        };

        console.log("== DEBUG == Creating feedback: ", body);

        return await axios.post(url, body)
    }

    public async GetFeedbackByTutor(id: string){
        let url = this.feedbackEndpoint + "/" + id;
        let feedback =  await axios.get(url);

        console.log("TUTOR FEEDBACK DATA: ", feedback)

        let rating = 0;
        feedback.data.forEach((feedback: Feedback) => {
            rating += feedback.rating;
        })

        return (rating / feedback.data.count);
    }

    public async SetClientName(name: Name, id: String) {
        let url = this.usersEndpoint + 'user';
        let body = {
            userid: id,
            first_name: name.first_name,
            last_name: name.last_name
        }

        return await axios.put(url, body, {withCredentials: true});
    }

    public async SetMeetingLink(id: String, link: String) {
        let url = this.appointmentsEndpoint + 'link';
        let body = {
            apptid: id,
            link: link
        };
        console.log(link);

        return await axios.put(url, body, {withCredentials: true});
    }

}

export const api = new ApiService();
