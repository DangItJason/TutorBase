import React, { useEffect, useState } from "react";
import TutorCard from "../tutorCard/TutorCard";
import {useDispatch, useSelector} from "react-redux";
import {selectAvailableTutors, selectClientFlowData} from "../../store/ClientFlowData/selectors";
import {actions} from '../../store/ClientFlowData/slice';
import { Tutor } from "../../services/api.types";
import { api } from "../../services/api";
import { Spinner } from 'reactstrap';

export function Step3() {
    let clientFlowData = useSelector(selectClientFlowData);
    let tutors = useSelector(selectAvailableTutors);
    let dispatch = useDispatch();

    useEffect(() => {
        const getTutor = async (id: String) => {
            return (await api.GetTutorById(id)).data[0];
        }

        const getAllTutors = (ids: Array<string>) => {
            let tutor_array: Array<Tutor> = []
            ids.forEach(async id => {
                let tutor =await getTutor(id);
                console.log("Getted Tutor: ", tutor);
                tutor_array = Object.assign([], tutor_array);
                tutor_array.push(tutor);
                tutor_array.push(...tutors)
                dispatch(actions.setAvailableTutors(tutor_array));
                console.log("Tutor Array: ", tutor_array)
            })
        }

        getAllTutors(clientFlowData.availableTutorIds);
    }, [clientFlowData.availableTutorIds])

    const decideRender = () => {
        console.log('Decide',tutors);
        console.log('Decide',tutors.length);
        if (tutors.length !== 0) {
            return tutors.map((tutor, i) => (
                <div className="radio-option col-md-3 mb-4 ml-3 mr-3" key={i}>
                    <label>
                        <input
                            className="form-input"
                            type="radio"
                            name="tutor"
                            value={tutor.first_name + ' ' + tutor.last_name + "{}[]" + tutor._id}
                            onChange={(event) => {
                                let data = event.target.value.split("{}[]");
                                let tutorObj = {
                                    name: data[0],
                                    id: data[1],
                                }
                                dispatch(actions.setSelectedTutor(tutorObj.id));
                                dispatch(actions.incrementStep());
                            }}
                            checked={clientFlowData.selectedTutor._id === tutor._id}
                        />
                        <div className="form-label">
                            <TutorCard data={tutor}/>
                        </div>
                    </label>
                </div>
            ));
        } else {
            return <p>No Tutors Found!</p>;
        }
    }

    if (clientFlowData.isLoading) {
        return <Spinner color="primary" />
    }

    return (
        <div className="form-group text-center">
            <h3 className="hr mt-1">Select a Tutor</h3>
            <div className="row justify-content-md-center">{decideRender()}</div>
        </div>
    );
}
