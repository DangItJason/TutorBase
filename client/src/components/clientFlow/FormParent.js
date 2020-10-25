import React, { Component, Fragment } from "react";
import Step1 from "./1_subject";
import Step2 from "./2_class";
import Step3 from "./3_selectTutor";
import Step4 from "./4_selectDateTime";
import Step5 from "./5_reserve";
import "./clientflow.css";
import {connect} from "react-redux";
import {actions} from "../../store/clientFlowData";

class FormParent extends Component {
    constructor(props) {
        super(props)
    }

    // handleChange = event => {
    //     const { name, value } = event.target
    //     this.setState({ [name]: value });
    //     this.props.incrementStep();
    // }
    //
    // handleChangeTime = event => {
    //     // const { name, value } = event.target
    //     this.setState({ furthestStep: this.state.furthestStep + 1 });
    // }
    //
    // handleChangeCourse = event => {
    //     const { name, value } = event.target
    //     this.setState({[name]: value, tutor_ids: [event.target.dataset.tutors]});
    //     this.nextStep();
    // }

    handleSubmit = event => {
        event.preventDefault();

        //Send verification email to tutor
        var url = "http://localhost:9000/email-user/tutor";
        var headers = {
            "Content-Type": "application/json"
        }
        var body = {
            clientName: this.state.clientName,
            tutorName: this.state.tutor,
            date: this.state.date,
            class: this.state.course,
            notes: this.state.notes,
            endTime: this.state.endTime,
            startTime: this.state.startTime,

        }
        fetch(url, {method: 'POST', headers: headers, body: body})
            .then(res => {
                console.log(res);
            })


        //Send confirmation email to client
        url = "http://localhost:9000/email-user/client";
        fetch(url, {method: 'POST', headers: headers, body: body})
            .then(res => {
                console.log(res);
            })
    }

    prevButton() {
        if (this.props.flowData.currentStep !== 1) {
            return (
                <button className="btn btn-secondary" type="button" onClick={() => this.props.decrementStep()}>Previous</button>
            );
        }
        return null;
    }

    nextButton() {
        if (this.props.flowData.currentStep < this.props.flowData.furthestStep) {
            return (
                <button className="btn btn-danger" type="button" onClick={() => this.props.incrementStep()}>Next</button>
            );
        }
        return null;
    }

    render() {
        // const formProps = {
        //     currentStep: this.state.currentStep,
        //     handleChange: this.handleChange,
        // }

        return (
            <Fragment>
                <h2 class="text-center mt-4 fragment-title">Schedule a Tutoring Session</h2>
                <div class="text-center mt-3 mb-2">
                    <div class="ml-1 mr-1 nav-btn">{this.prevButton()}</div>
                    <div class="ml-1 mr-1 nav-btn">{this.nextButton()}</div>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <Step1/>
                    <Step2/>
                    <Step3/>
                    <Step4/>
                    <Step5/>
                </form>
            </Fragment>
        );
    }
}

function mapStateToProps(state){
    const { clientFlow } = state;
    return { flowData:  clientFlow}
}

const mapDispatchToProps = dispatch => {
    return {
        incrementStep: (state) => dispatch(actions.incrementStep(state)),
        decrementStep: (state) => dispatch(actions.decrementStep(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormParent);
