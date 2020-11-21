import React, { Component } from "react";
import { actions } from "../../store/clientFlowData";
import { connect } from "react-redux";

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = { subject: "", courses: [] };
  }

  componentDidUpdate() {
    // Load subjects if they have not yet been loaded in
    if (this.state.subject !== this.props.flowData.subject) {
      this.setState({ subject: this.props.flowData.subject, courses: [] });
      fetch(
        "http://localhost:9000/catalog/courses/" + this.props.flowData.subject
      )
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((courses) => {
          console.log(courses);
          courses.map((course) =>
            this.setState((prevState) => ({
              courses: [
                ...prevState.courses,
                { id: course.id, name: course.name, tutors: course.tutors },
              ],
            }))
          );
        });
    }
  }

  render() {
    // Only render this step if currentStep matches
    if (this.props.flowData.currentStep !== 2) return null;

    return (
      <div class="form-group text-center">
        <h3 class="hr mt-1">Select a Course</h3>
        {this.state.courses.map((course, i) => (
          <div className="radio-option" key={i}>
            <label>
              <input
                className="form-input"
                type="radio"
                name="course"
                value={course.id}
                data-tutors={course.tutors}
                onChange={(event) => {
                  console.log(event.target.dataset);
                  this.props.setCourse([
                    event.target.value,
                    event.target.dataset.tutors.split(","),
                  ]);
                  this.props.incrementStep();
                }}
                checked={this.props.flowData.course === course.id}
              ></input>
              <p className="form-label">
                {course.id} - {course.name}
              </p>
            </label>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { clientFlow } = state;
  return { flowData: clientFlow };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCourse: (state, payload) => dispatch(actions.setCourse(state, payload)),
    incrementStep: (state) => dispatch(actions.incrementStep(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step2);
