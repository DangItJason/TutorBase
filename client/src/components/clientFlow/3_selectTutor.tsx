import React, { useEffect, useState } from "react";
import TutorCard from "../tutorCard/TutorCard";
import {useDispatch, useSelector} from "react-redux";
import {selectClientFlowData} from "../../store/ClientFlowData/selectors";
import {actions as clientFlowActions } from '../../store/ClientFlowData/slice';
import { Tutor } from "../../services/api.types";
import { api } from "../../services/api";

export function Step3() {
    let clientFlowData = useSelector(selectClientFlowData);
    let [tutors, setTutors] = useState<Array<Tutor>>([]);
    let dispatch = useDispatch();

    useEffect(() => {
        const getTutor = async (id: String) => {
            return (await api.GetTutorById(id)).data;
        }

        clientFlowData.availableTutorIds.map((id) => {
            getTutor(id).then(value => {
                let nextState = tutors;
                nextState.push(value[0])
                setTutors(nextState)
            }
        )
        });
    }, [clientFlowData.availableTutorIds, dispatch, tutors])

    let tutorList;
    // if (clientFlowData.tutorIds.length !== 0) {
    //     tutorList = clientFlowData.tutorIds.map((tutor, i) => (
    //         <div class="radio-option col-md-3 mb-4 ml-3 mr-3" key={i}>
    //             <label>
    //                 <input
    //                     className="form-input"
    //                     type="radio"
    //                     name="tutor"
    //                     value={tutor.name + "{}[]" + tutor.id}
    //                     onChange={(event) => {
    //                         let data = event.target.value.split("{}[]");
    //                         dispatch(clientFlowActions.setTutor([data[0], data[1]]));
    //                         dispatch(clientFlowActions.incrementStep);
    //                     }}
    //                     checked={clientFlowData.tutorName === tutor.name}
    //                 />
    //                 <div className="form-label">
    //                     <TutorCard data={tutor}/>
    //                 </div>
    //             </label>
    //         </div>
    //     ));
    // } else tutorList = <p>No Tutors Found!</p>;

    return (
        <div className="form-group text-center">
            <h3 className="hr mt-1">Select a Tutor</h3>
            {/* <div className="row justify-content-md-center">{tutorList}</div> */}
        </div>
    );
}
