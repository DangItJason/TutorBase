import React from "react";
import TutorCard from "../tutorCard/TutorCard";
import {useDispatch, useSelector} from "react-redux";
import {selectClientFlowData} from "../../store/ClientFlowData/selectors";
import {actions as clientFlowActions } from '../../store/ClientFlowData/slice';

export function Step3() {
    let clientFlowData = useSelector(selectClientFlowData);
    let dispatch = useDispatch();

    // Only render this step if currentStep matches
    if (clientFlowData.currentStep !== 3) return null;

    let tutorList;
    if (clientFlowData.tutorIds.length !== 0) {
        tutorList = clientFlowData.tutorIds.map((tutor, i) => (
            <div class="radio-option col-md-3 mb-4 ml-3 mr-3" key={i}>
                <label>
                    <input
                        className="form-input"
                        type="radio"
                        name="tutor"
                        value={tutor.name + "{}[]" + tutor.id}
                        onChange={(event) => {
                            let data = event.target.value.split("{}[]");
                            dispatch(clientFlowActions.setTutor([data[0], data[1]]));
                            dispatch(clientFlowActions.incrementStep);
                        }}
                        checked={clientFlowData.tutorName === tutor.name}
                    />
                    <div className="form-label">
                        <TutorCard data={tutor}/>
                    </div>
                </label>
            </div>
        ));
    } else tutorList = <p>No Tutors Found!</p>;

    return (
        <div class="form-group text-center">
            <h3 class="hr mt-1">Select a Tutor</h3>
            <div class="row justify-content-md-center">{tutorList}</div>
        </div>
    );
}
