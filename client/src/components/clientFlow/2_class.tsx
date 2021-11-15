import React, {useEffect, useState} from "react";
import {actions} from "../../store/ClientFlowData/slice";
import {useDispatch, useSelector} from "react-redux";
import {selectClientFlowData} from "../../store/ClientFlowData/selectors";
import {api} from "../../services/api";
import {Course} from "../../services/api.types";
import ClientFlowCard from "../clientFlowCard/ClientFlowCard";
import styled from "styled-components";

/* Step two of the appointment scheduler is for
   the user to pick their tutor class */
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
        <Container>
            <h3 className="hr mt-1">Select a Course</h3>
            <Cards>
                {courses.length === 0 ? <div>No courses found!</div> : <></>}
                {courses.map((course, index) => {
                    return <ClientFlowCard
                        onClick={() => {
                            let courseObj = {
                                name: course.name,
                                id: course.id,
                            }

                            dispatch(actions.setSelectedCourse(courseObj))
                            dispatch(actions.setAvailableTutorIds(course.tutors))
                            dispatch(actions.incrementStep())
                        }}

                        color={"#C93642"}
                        title={course.name}
                        checked={clientFlowData.selectedCourse.id === course.id}
                    />
                })}
            </Cards>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Cards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
