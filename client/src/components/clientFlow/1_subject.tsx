import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions as clientFlowActions} from "../../store/ClientFlowData/slice";
import {selectClientFlowData} from "../../store/ClientFlowData/selectors";
import {api} from "../../services/api";
import {Subject} from "../../services/api.types";
import styled from "styled-components";
import ClientFlowCard from "../clientFlowCard/ClientFlowCard";
import { toast } from "react-toastify";
import { SubjectToColor } from "../../services/tools";

/* Step one of the appointment scheduler is for
   the user to pick their tutor subject */
export function Step1() {
    let clientFlowData = useSelector(selectClientFlowData);
    let [subjects, setSubjects] = useState<Array<Subject>>([]);
    let dispatch = useDispatch();

    useEffect(() => {
        // Get all avaliable subjects from API
        const getSubjects = async () => {
            return (await api.GetSubjects()).data;
        }

        getSubjects().then(value => {
                setSubjects(value);
                dispatch(clientFlowActions.setAvailableSubjects(value));
            }
        )
    }, [])

    return (
        <Container>
            <h3 className="hr mt-1">Select a Subject</h3>
            <Cards>
                {subjects.length === 0 ? <div>No subjects found!</div> : <></>}
                {subjects.map((subject, index) => {
                    return <ClientFlowCard
                        onClick={() => {
                            dispatch(clientFlowActions.incrementStep());
                            dispatch(clientFlowActions.setSelectedSubject(subject));
                        }}
                        color={SubjectToColor(subject._id)}
                        title={subject.id}
                        checked={clientFlowData.selectedSubject.id === subject.id}
                    ></ClientFlowCard>
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

