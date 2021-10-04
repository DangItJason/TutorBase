import React, { useEffect, useState } from "react";
import TutorCard from "../tutorCard/TutorCard";
import {useDispatch, useSelector} from "react-redux";
import {selectAvailableTutors, selectClientFlowData} from "../../store/ClientFlowData/selectors";
import {actions} from '../../store/ClientFlowData/slice';
import { Tutor } from "../../services/api.types";
import { api } from "../../services/api";
import { Spinner } from 'reactstrap';
import styled from "styled-components";

/* Step three of the appointment scheduler is for
   the user to pick their tutor */
export function Step3() {
    let clientFlowData = useSelector(selectClientFlowData);
    let tutors = useSelector(selectAvailableTutors);
    let dispatch = useDispatch();

    useEffect(() => {
        // Get a tutor by ID from the API
        const getTutor = async (id: String) => {
            return (await api.GetTutorById(id)).data[0];
        }

        // Get all tutors given their IDs
        const getAllTutors = (ids: Array<string>) => {
            let tutor_array: Array<Tutor> = []
            tutors = []; // Reset aval tutors array

            ids.forEach(async id => {
                let tutor = await getTutor(id);
                tutor_array = Object.assign([], tutor_array);
                tutor_array.push(tutor);
                tutor_array.push(...tutors)
                dispatch(actions.setAvailableTutors(tutor_array));
            })
        }

        getAllTutors(clientFlowData.availableTutorIds);
    }, [clientFlowData.availableTutorIds])

    const decideRender = () => {
        if (tutors.length !== 0) {
            return tutors.map((tutor, i) => (
                <TutorCard tutor={tutor} key={i} checked={clientFlowData.selectedTutor._id === tutor._id} />
            ));
        } else {
            return <p>No Tutors Found!</p>;
        }
    }

    // Loading return
    if (clientFlowData.isLoading)
        return <Spinner color="primary" />

    // Content return
    return (
        <Container>
            <h3 className="hr mt-1">Select a Tutor</h3>
            <Cards>
                {decideRender()}
            </Cards>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Cards = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
