import React, { useEffect, useState } from "react";
import TutorCard from "../tutorCard/TutorCard";
import {useDispatch, useSelector} from "react-redux";
import {selectClientFlowData} from "../../store/ClientFlowData/selectors";
import {actions} from '../../store/ClientFlowData/slice';
import { Tutor } from "../../services/api.types";
import { api } from "../../services/api";
import { Spinner } from 'reactstrap';

export function Step3() {
    let clientFlowData = useSelector(selectClientFlowData);
    let [tutors, setTutors] = useState<Array<Tutor>>([]);
    let dispatch = useDispatch();

    let tutorList;

    useEffect(() => {
        dispatch(actions.setLoading(true))
        const getTutor = async (id: String) => {
            return (await api.GetTutorById(id)).data;
        }

        clientFlowData.availableTutorIds.map((id) => {
            getTutor(id).then(value => {
                let nextState = tutors;
                nextState.push(value[0])
                setTutors(nextState)
            }
        )});
        
        dispatch(actions.setLoading(false))
    }, [clientFlowData.availableTutorIds, dispatch, tutors])

    
    if (clientFlowData.isLoading) {
        return <Spinner color="primary" />
    }

    if (clientFlowData.availableTutorIds.length !== 0) {
        console.log('Flow',tutors)
        tutorList = tutors.map((tutor, i) => (
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
                            dispatch(actions.setSelectedTutor(tutorObj));
                            dispatch(actions.incrementStep());
                        }}
                        checked={clientFlowData.selectedTutor.id === tutor._id}
                    />
                    <div className="form-label">
                        <TutorCard data={tutor}/>
                    </div>
                </label>
            </div>
        ));
    } else {
        tutorList = <p>No Tutors Found!</p>;
    }

    return (
        <div className="form-group text-center">
            <h3 className="hr mt-1">Select a Tutor</h3>
            <div className="row justify-content-md-center">{tutorList}</div>
        </div>
    );
}
