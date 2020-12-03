import React, { Component } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Step5 extends Component {
  render() {
    const confirmSubmit = () => {
      toast.success(
        "Appointment Submitted! We'll let you know when the tutor confirms the appointment!!",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    };

    const handleSubmit = () => {
      console.log("Submitting");

      // Create Appointment
      var url = "http://localhost:9000/catalog/appointment";
      var headers = {
        "Content-Type": "application/json",
      };
      var body = {
        course_id: this.props.flowData.course,
        start: this.props.flowData.startTime,
        end: this.props.flowData.endTime,
        loc: "temp",
        tutor_id: this.props.flowData.tutor,
        client_id: this.props.flowData.clientName,
        price: "temp",
        date: this.props.flowData.data,
        notes: this.props.flowData.notes,
      };

      console.log("RESERVE POST BODY: ", body);

      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }).then((res) => {
        console.log(res);
      });

      // TODO: Verify appointment creation and send email to client and tutor for confirmation
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
            confirmSubmit();
            handleSubmit();
          }}
        >
          <ToastContainer />
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
