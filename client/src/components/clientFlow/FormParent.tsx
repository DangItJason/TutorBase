import React, {Fragment} from "react";
import {Step1} from "./1_subject";
import {Step2} from "./2_class";
import {Step3} from "./3_selectTutor";
import {Step4} from "./4_selectDateTime";
import {Step5} from "./5_reserve";
import "./clientflow.css";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAppointmentConfirmed,
    selectClientFlowData,
    selectCurrentStep,
    selectFurthestStep
} from "../../store/ClientFlowData/selectors";
import {actions as clientFlowActions} from '../../store/ClientFlowData/slice';
import styled from "styled-components";

export function FormParent() {
    let clientFlowData = useSelector(selectClientFlowData);
    let currentStep = useSelector(selectCurrentStep);
    let furthestStep = useSelector(selectFurthestStep)
    let appointmentConfirmed = useSelector(selectAppointmentConfirmed)
    let dispatch = useDispatch();

    console.log("Current step: ", currentStep)

    // Button to move to a previous step
    function prevButton() {
        // First step has no previous step, dont show
        if (currentStep !== 0) {
            return (
                <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => dispatch(clientFlowActions.decrementStep())}
                >
                    Previous
                </button>
            );
        }

        return null;
    }

    // Button to move to the next step
    function nextButton() {
        /* Moving to the next step is only possible
           if it already has been visited */
        if ((currentStep < furthestStep) || (currentStep !== 4 && clientFlowData.appointmentStartTime !== "")) {
            return (
                <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => dispatch(clientFlowActions.incrementStep())}
                >
                    Next
                </button>
            );
        }

        return null;
    }

    /* On the calendar step we don't want to auto
       move to the next step until the time is confirmed
       (Because the user can alter and edit the timeslot
       at will). However, once a timeslot is created show
       this confirm button to move on. */
    function confirmButton() {
        if (
            appointmentConfirmed &&
            furthestStep === 4
        ) {
            return (
                <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => dispatch(clientFlowActions.incrementStep())}
                >
                    Confirm
                </button>
            );
        }
        return null;
    }

    return (
        <Container>
            {currentStep === 0 && <Step1/>}
            {currentStep === 1 && <Step2/>}
            {currentStep === 2 && <Step3/>}
            {currentStep === 3 && <Step4/>}
            {currentStep === 4 && <Step5/>}

            <ButtonBox>
                <div className="ml-1 mr-1 nav-btn">{prevButton()}</div>
                <div className="ml-1 mr-1 nav-btn">{nextButton()}</div>
                <div className="ml-1 mr-1 nav-btn">{confirmButton()}</div>
            </ButtonBox>
        </Container>
    );
}

const Container = styled.div`
  height: calc(100vh - 80px);
  
  display: flex;
  flex-direction: column;
  
  justify-content: center;
  align-items: center;
  
  // DEBUG STYLES //
  //border: blue solid 5px;
`

const ButtonBox = styled.div`
  display: flex;
  flex: 1;
  
  align-items: flex-end;
  
  // DEBUG STYLES //
  //border: red solid 5px;
`
