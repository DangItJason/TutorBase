import React, {Component} from "react";
import {connect} from "react-redux";
import {actions} from "../../store/ClientFlowData/slice";
import {useDispatch, useSelector} from "react-redux";
import {selectClientFlowData} from "../../store/ClientFlowData/selectors";
import {actions as clientFlowActions } from '../../store/ClientFlowData/slice';

export function Step1() {
    let clientFlowData = useSelector(selectClientFlowData);
    let dispatch = useDispatch();

    // Only render this step if currentStep matches
    if (clientFlowData.currentStep !== 1) return null;

    return (
        <div class="form-group text-center">
            <h3 class="hr mt-1">Select a Subject</h3>
            {clientFlowData.subjectIds.map((subject, i) => (
                <div className="radio-option" key={i}>
                    <label>
                        <input
                            className="form-input"
                            type="radio"
                            name="subject"
                            value={subject.id}
                            onChange={(event) => {
                                this.props.setSubject(event.target.value);
                                this.props.incrementStep();
                            }}
                            checked={this.props.flowData.subjectId === subject.id}
                        ></input>
                        <p className="form-label">{subject.id}</p>
                    </label>
                </div>
            ))}
        </div>
    );
}
