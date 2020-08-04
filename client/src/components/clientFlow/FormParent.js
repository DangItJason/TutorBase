import React, { Component, Fragment } from "react";
import Step1 from "./1_subject";
import Step2 from "./2_class";
import Step3 from "./3_selectTutor";
import Step4 from "./4_selectDate";
import Step5 from "./5_selectTime";
import Step6 from "./6_reserve";
import "./clientflow.css";

class FormParent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1,
            furthestStep: 1,
            subject: "",
            course: "",
            tutor: "",
            date: "",
            startTime: "",
            endTime: "",
            notes: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
    }
    
    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value });
        this.nextStep();
    }

    handleChangeTime = event => {
        const { name, value } = event.target
        this.setState({ [name]: value });
        if ((name === "endTime" && this.state.startTime !== "") || (name === "startTime" && this.state.endTime !== ""))
            this.nextStep();
    }

    prevStep = () => {
        let step = this.state.currentStep;
        step = step <= 1 ? 1 : step - 1;
        this.setState({ currentStep: step });
    }

    nextStep = () => {
        let step = this.state.currentStep;
        step = step >= 5 ? 6 : step + 1;
        this.setState({ currentStep: step });
        if (step > this.state.furthestStep)
            this.setState({ furthestStep: step });
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    prevButton() {
        if (this.state.currentStep !== 1) {
            return (
                <button className="btn btn-secondary" type="button" onClick={this.prevStep}>Previous</button>
            );
        }
        return null;
    }

    nextButton() {
        if (this.state.currentStep < this.state.furthestStep) {
            return (
                <button className="btn btn-danger" type="button" onClick={this.nextStep}>Next</button>
            );
        }
        return null;
    }

    render() {
        const formProps = {
            currentStep: this.state.currentStep,
            handleChange: this.handleChange,
        }

        return (
            <Fragment>
                <h2 class="text-center mt-4 fragment-title">Schedule a Tutoring Session</h2>
                <div class="text-center mt-3 mb-2">
                    <div class="ml-1 mr-1 nav-btn">{this.prevButton()}</div>
                    <div class="ml-1 mr-1 nav-btn">{this.nextButton()}</div>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <Step1 {...formProps} subject={this.state.subject} />
                    <Step2 {...formProps} subject={this.state.subject} class={this.state.class} />
                    <Step3 {...formProps} class={this.state.class} tutor={this.state.tutor}/>
                    <Step4 {...formProps} date={this.state.date} />
                    <Step5 {...formProps} startTime={this.state.startTime} 
                        endTime={this.state.endTime} 
                        handleChangeTime={this.handleChangeTime} />
                    <Step6 {...formProps} date={this.state.date} 
                        startTime={this.state.startTime} 
                        endTime={this.state.endTime}
                        notes={this.state.notes} />
                </form>
            </Fragment>
        );
    }
}

export default FormParent;