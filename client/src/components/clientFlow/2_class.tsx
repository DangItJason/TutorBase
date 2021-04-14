import React, {Component, useEffect, useState} from "react";
import {actions} from "../../store/ClientFlowData/slice";
import {useDispatch, useSelector} from "react-redux";
import {selectClientFlowData} from "../../store/ClientFlowData/selectors";
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
        <div className="form-group text-center">
          <h3 className="hr mt-1">Select a Course</h3>
          {courses.map((course, i) => (
            <div className="radio-option" key={i}>
              <label>
                <input
                  className="form-input"
                  type="radio"
                  name="course"
                  value={course.name + "{}[]" + course.id}
                  data-tutors={course.tutors}
                  onChange={(event) => {
                    console.log(event.target.dataset);
                    let courseData = event.target.value.split("{}[]");
                    let courseObj = {
                        name: courseData[0],
                        id: courseData[1],
                    }
                    let tutors = event.target.dataset.tutors ? event.target.dataset.tutors.split(",") : [];
                    console.log(courseObj)
                    dispatch(actions.setSelectedCourse(courseObj))
                    dispatch(actions.setAvailableTutorIds(tutors))
                    dispatch(actions.incrementStep())
                  }}
                  checked={clientFlowData.selectedCourse.id === course.id}
                ></input>
                <p className="form-label">
                  {course.id} - {course.name}
                </p>
              </label>
            </div>
          ))}
        </div>
    );
}
