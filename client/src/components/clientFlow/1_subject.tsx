import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions as clientFlowActions} from "../../store/ClientFlowData/slice";
import {selectClientFlowData} from "../../store/ClientFlowData/selectors";
import {api} from "../../services/api";
import {Subject} from "../../services/api.types";

export function Step1() {
    let clientFlowData = useSelector(selectClientFlowData);
    let [subjects, setSubjects] = useState<Array<Subject>>([]);
    let dispatch = useDispatch();

    useEffect(() => {
        const getSubjects = async () => {
            return (await api.GetSubjects()).data;
        }

        getSubjects().then(value => {
                setSubjects(value);
                dispatch(clientFlowActions.setAvailableSubjects(value));
            }
        )
    }, [dispatch])

    return (
        <div className="form-group text-center">
            <h3 className="hr mt-1">Select a Subject</h3>
            {subjects.map((subject, i) => (
                <div className="radio-option" key={i}>
                    <label>
                        <input
                            className="form-input"
                            type="radio"
                            name="subject"
                            value={subject.id}
                            onChange={(event) => {
                                dispatch(clientFlowActions.incrementStep());
                                dispatch(clientFlowActions.setSelectedSubject(subject));
                            }}
                            checked={clientFlowData.selectedSubject.id === subject.id}
                        />
                        <p className="form-label">{subject.id}</p>
                    </label>
                </div>
            ))}
        </div>
    );
}
