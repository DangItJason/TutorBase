import React, { Component } from "react";
import classNames from "classnames";
import TutorCard from "../tutorCard/TutorCard";
import { connect } from "react-redux";
import { actions } from "../../store/clientFlowData";

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = { courseId: "", tutors: [] };
  }

  componentDidUpdate() {
    // Load tutors if they have not yet been loaded in
    // if (this.state.courseId !== this.props.flowData.courseId) {
    //   this.setState({ courseId: this.props.flowData.courseId, tutors: [] });
    // }

    var url = "http://localhost:9000/api/tutors/";
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    let tutorIds = this.props.flowData.tutorIds

    if (this.state.tutors.length === 0) {
      tutorIds.map((id) => {
        fetch(url + id, requestOptions)
        .then((res) => { return res.json(); })
        .then((tutor) => { 
          console.log(tutor)
          this.setState((prevState) => ({
            tutors: [
              ...prevState.tutors,
              {
                id: tutor._id,
                email: tutor.email,
                name: tutor.first_name + " " + tutor.last_name,
                info: "",
                next_avail: "",
              },
            ],
          }))
        });
      })
    }
    console.log(this.props.flowData.tutorIds)
  }

  render() {
    // Only render this step if currentStep matches
    if (this.props.flowData.currentStep !== 3) return null;

    let tutorList;
    if (this.state.tutors.length !== 0) {
      tutorList = this.state.tutors.map((tutor, i) => (
        <div class="radio-option col-md-3 mb-4 ml-3 mr-3" key={i}>
          <label>
            <input
              className="form-input"
              type="radio"
              name="tutor"
              value={tutor.name + "{}[]" + tutor.id}
              onChange={(event) => {
                let data = event.target.value.split("{}[]");
                this.props.setTutor([data[0], data[1]]);
                this.props.incrementStep();
              }}
              checked={this.props.flowData.tutorName === tutor.name}
            />
            <div className="form-label">
              <TutorCard data={tutor} />
            </div>
          </label>
        </div>
      ));
    } else tutorList = <p>No Tutors Found!</p>;

    return (
      <div class="form-group text-center">
        <h3 class="hr mt-1">Select a Tutor</h3>
        <div class="row justify-content-md-center">{tutorList}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTutor: (state, name) => dispatch(actions.setTutor(state, name)),
    setTutorIds: (state, ids) => dispatch(actions.setTutorIds(state, ids)),
    incrementStep: (state) => dispatch(actions.incrementStep(state)),
  };
};

function mapStateToProps(state) {
  const { clientFlow } = state;
  return { flowData: clientFlow };
}

export default connect(mapStateToProps, mapDispatchToProps)(Step3);
