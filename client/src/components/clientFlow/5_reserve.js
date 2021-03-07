import React, { Component } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { actions } from "../../store/clientFlowData";

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
      let url = "http://localhost:9000/catalog/appointment";
      let headers = {
        "Content-Type": "application/json",
      };

      let start = new Date(this.props.flowData.apptStartTime);
      let startMin = ("0" + start.getMinutes()).slice(-2);
      let startHour = ("0" + start.getHours()).slice(-2);

      let end = new Date(this.props.flowData.apptEndTime);
      let endMin = ("0" + start.getMinutes()).slice(-2);
      let endHour = ("0" + start.getHours()).slice(-2);

      let body = {
        course_id: this.props.flowData.courseId,
        date: this.props.flowData.date,
        start: startHour + ":" + startMin,
        end: endHour + ":" + endMin,
        loc: this.props.flowData.apptLoc,
        tutor_id: this.props.flowData.tutorId,
        client_id: this.props.flowData.clientId,
        price: "temp",
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

      // Notify user that everything was created in the system.
      confirmSubmit();
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
          value={this.props.notes}
          onChange={(value) => this.props.setNotes(value.target.value)}
          placeholder="Have a preferred location? Need help on a specific homework or project? Let the tutor know here!"
        >
          {/*{this.props.notes}*/}
        </textarea>
        <br />
        <button
          className="btn btn-danger"
          onClick={() => {
            // confirmSubmit();
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

const mapDispatchToProps = (dispatch) => {
  return {
    setNotes: (state, action) => dispatch(actions.setNotes(state, action)),
  };
};

function mapStateToProps(state) {
  const { clientFlow } = state;
  return {
    date: clientFlow.apptDate,
    startTime: clientFlow.apptStartTime,
    endTime: clientFlow.apptEndTime,
    notes: clientFlow.apptNotes,
    flowData: clientFlow,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Step5);
