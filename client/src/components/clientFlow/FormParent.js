import React, { Component, Fragment } from "react";
import Step1 from "./1_subject";
import Step2 from "./2_class";
import Step3 from "./3_selectTutor";
import Step4 from "./4_selectDateTime";
import Step5 from "./5_reserve";
import "./clientflow.css";
import { connect } from "react-redux";
import { actions } from "../../store/clientFlowData";

class FormParent extends Component {
  constructor(props) {
    super(props);
  }

  // Button to move to a previous step
  prevButton() {
    // First step has no previous step, dont show
    if (this.props.flowData.currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => this.props.decrementStep()}
        >
          Previous
        </button>
      );
    }

    return null;
  }

  // Button to move to the next step
  nextButton() {
    /* Moving to the next step is only possible
       if it already has been visited */
    if (this.props.flowData.currentStep < this.props.flowData.furthestStep) {
      return (
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => this.props.incrementStep()}
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
  confirmButton() {
    if (
      this.props.flowData.apptConfirm &&
      this.props.flowData.furthestStep === 4
    ) {
      return (
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => this.props.incrementStep()}
        >
          Confirm
        </button>
      );
    }
    return null;
  }

  render() {
    return (
      <Fragment>
        <h2 class="text-center mt-4 fragment-title">
          Schedule a Tutoring Session
        </h2>
        <div class="text-center mt-3 mb-2">
          <div class="ml-1 mr-1 nav-btn">{this.prevButton()}</div>
          <div class="ml-1 mr-1 nav-btn">{this.nextButton()}</div>
          <div className="ml-1 mr-1 nav-btn">{this.confirmButton()}</div>
        </div>
        <Step1 />
        <Step2 />
        <Step3 />
        <Step4 />
        <Step5 />
      </Fragment>
    );
  }
}

// REDUX MAPPING //
function mapStateToProps(state) {
  const { clientFlow } = state;
  return { flowData: clientFlow };
}

const mapDispatchToProps = (dispatch) => {
  return {
    incrementStep: (state) => dispatch(actions.incrementStep(state)),
    decrementStep: (state) => dispatch(actions.decrementStep(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormParent);
