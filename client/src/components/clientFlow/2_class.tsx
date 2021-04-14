import React, {Component, useEffect, useState} from "react";
import {actions} from "../../store/ClientFlowData/slice";
import {connect} from "react-redux";
import {useDispatch, useSelector} from "react-redux";
import {selectClientFlowData} from "../../store/ClientFlowData/selectors";
import {actions as clientFlowActions} from '../../store/ClientFlowData/slice';
import {api} from "../../services/api";
import { Course } from "../../services/api.types";

export function Step2() {
    let clientFlowData = useSelector(selectClientFlowData);
    let [courses, setCourses] = useState<Array<Course>>([]);
    let dispatch = useDispatch();

    let subjectId = clientFlowData.selectedSubject.id;

    useEffect(() => {
        const getCourses = async () => {
            return (await api.GetCourses(subjectId)).data;
        }

        getCourses().then(value => {
                setCourses(value);
            }
        )
    }, [dispatch, subjectId])

    return (
        <div>TEST</div>
        // <div className="form-group text-center">
        //     <h3 className="hr mt-1">Select a Course</h3>
        //     {clientFlowData.availableSubjects.map((subject, i) => (
        //         <div className="radio-option" key={i}>
        //             <label>
        //                 <input
        //                     className="form-input"
        //                     type="radio"
        //                     name="course"
        //                     value={course.name + "{}[]" + course.id}
        //                     data-tutors={course.tutors}
        //                     onChange={(event) => {
        //                         // console.log(event.target.dataset);
        //                         // console.log(event.target.value);
        //                         let course = event.target.value.split("{}[]");
        //                         this.props.setCourse([
        //                             course[0],
        //                             course[1],
        //                             event.target.dataset.tutors.split(","),
        //                         ]);
        //                         this.props.incrementStep();
        //                     }}
        //                     checked={this.props.flowData.courseName === course.id}
        //                 ></input>
        //                 <p className="form-label">
        //                     {course.id} - {course.name}
        //                 </p>
        //             </label>
        //         </div>
        //     ))}
        // </div>
    );
}
