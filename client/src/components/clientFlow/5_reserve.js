import React, { Component } from "react";
import ToastSubmit from "./toast/submit.js";
import classNames from "classnames";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";

class Step5 extends Component {
  render() {
    // const { addToast } = useToasts();

    const handleSubmit = () => {
      // event.preventDefault();
      console.log("Submitting");

      //Send verification email to tutor
      var url = "http://localhost:9000/email-user/tutor";
      var headers = {
        "Content-Type": "application/json",
      };
      var body = {
        clientName: this.props.flowData.clientName,
        tutorName: this.props.flowData.tutor,
        date: this.props.flowData.date,
        class: this.props.flowData.course,
        notes: this.props.flowData.notes,
        endTime: this.props.flowData.endTime,
        startTime: this.props.flowData.startTime,
      };
      // fetch(url, { method: "POST", headers: headers, body: body }).then(
      //   (res) => {
      //     console.log(res);
      //   }
      // );

      //Send confirmation email to client
      url = "http://localhost:9000/appointment";
      body = {
        appt_id: "1123123123123123",
        course_id: this.props.flowData.course,
      };
      fetch(url, { method: "POST", headers: headers, body: body }).then(
        (res) => {
          console.log(res);
        }
      );
    };

    // Only render this step if currentStep matches
    if (this.props.flowData.currentStep !== 5) return null;

    return (
      <div class="form-group text-center">
        <h3 class="hr mt-1">Reserve</h3>
        <h3>
          {this.props.date}, {this.props.startTime} - {this.props.endTime}
        </h3>
        <h4>Notes</h4>
        <textarea
          className="form-input"
          name="notes"
          id="notes"
          placeholder="Have a preferred location? Need help on a specific homework or project? Let the tutor know here!"
        >
          {this.props.notes}
        </textarea>
        <br />
        <button
          className="btn btn-danger"
          onClick={() => {
            // addToast(
            //   "Appointment Submitted! We'll let you know when the tutor confirms the appointment!",
            //   {
            //     appearance: "success",
            //     placement: "bottom-left",
            //   }
            // );
            handleSubmit();
          }}
        >
          Book Now
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { clientFlow } = state;
  return {
    date: clientFlow.date,
    startTime: clientFlow.startTime,
    endTime: clientFlow.endTime,
    notes: clientFlow.notes,
    flowData: clientFlow,
  };
}

export default connect(mapStateToProps)(Step5);
