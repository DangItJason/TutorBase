import React, { Component, Fragment } from "react";
import Step1 from "./1_subject";
import Step2 from "./2_class";
import Step3 from "./3_selectTutor";
import Step4 from "./4_selectDate";
import Step5 from "./5_selectTime";
import Step6 from "./6_reserve";


class FormParent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentStep: 1,
            subject: "",
            class: "",
            tutorID: "",
            date: "",
            time: ""
        }
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <Fragment>
                <form>
                    <Step1 currentStep={this.state.currentStep} 
                        handleChange={this.handleChange}
                        subject = {this.state.subject} />
                    <Step2 currentStep={this.state.currentStep} 
                        handleChange={this.handleChange}
                        subject = {this.state.subject} />
                    <Step3 currentStep={this.state.currentStep} 
                        handleChange={this.handleChange}
                        subject = {this.state.subject} />
                    <Step4 currentStep={this.state.currentStep} 
                        handleChange={this.handleChange}
                        subject = {this.state.subject} />
                    <Step5 currentStep={this.state.currentStep} 
                        handleChange={this.handleChange}
                        subject = {this.state.subject} />
                    <Step6 currentStep={this.state.currentStep} 
                        handleChange={this.handleChange}
                        subject = {this.state.subject} />
                </form>
            </Fragment>
        );
    }
}

export default FormParent;