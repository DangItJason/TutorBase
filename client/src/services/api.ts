import {ApiBaseAddress} from "../utils/Environment";
import axios from "axios";
import {SubjectsResponse} from "./api.types";

export class ApiService {
    private usersEndpoint = ApiBaseAddress + "api/users/";
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
}

export const api = new ApiService();
