import React, { Component, Fragment } from "react";
import Step1 from "./1_subject";
import Step2 from "./2_class";
import Step3 from "./3_SelectTutor";
import Step4 from "./4_selectDate";
import Step5 from "./5_selectTime";
import Step6 from "./6_reserve";


class FormParent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 3,
            subject: "",
            class: "",
            tutor: "",
            date: "",
            time: "",
            notes: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    render() {
        const formProps = {
            currentStep: this.state.currentStep,
            handleChange: this.handleSubmit
        }

        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <Step1 {...formProps} subject={this.state.subject} />
                    <Step2 {...formProps} class={this.state.class} />
                    <Step3 {...formProps} tutor={this.state.tutor} />
                    <Step4 {...formProps} date={this.state.date} />
                    <Step5 {...formProps} time={this.state.time} />
                    <Step6 {...formProps} notes={this.state.notes} />
                </form>
            </Fragment>
        );
    }
}

export default FormParent;