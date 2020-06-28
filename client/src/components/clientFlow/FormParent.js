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
            subject: "",
            class: "",
            tutor: "",
            date: "",
            startTime: "",
            endTime: "",
            notes: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        const { name, value } = event.target
        let step = this.state.currentStep;
        step = step >= 5 ? 6 : step + 1;
        this.setState({ [name]: value, currentStep: step });
    }

    prevStep = () => {
        let step = this.state.currentStep;
        step = step <= 1 ? 1 : step - 1;
        this.setState({ currentStep: step });
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    render() {
        const formProps = {
            currentStep: this.state.currentStep,
            handleChange: this.handleChange
        }

        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <Step1 {...formProps} subject={this.state.subject} />
                    <Step2 {...formProps} class={this.state.class} />
                    <Step3 {...formProps} tutor={this.state.tutor} />
                    <Step4 {...formProps} date={this.state.date} />
                    <Step5 {...formProps} time={this.state.time} />
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