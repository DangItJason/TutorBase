import React, { Component } from "react";
import { actions } from "../../store/clientFlowData";
import { connect } from "react-redux";

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = { subjectId: "", courses: [] };
  }

  componentDidUpdate() {
    // Load subjects if they have not yet been loaded in
    if (this.state.subjectId !== this.props.flowData.subjectId) {
      this.setState({ subjectId: this.props.flowData.subjectId, courses: [] });
      fetch(
        "http://localhost:9000/api/courses/" + this.props.flowData.subjectId
      )
        .then((res) => {
          //console.log(res);
          return res.json();
        })
        .then((courses) => {
          //console.log(courses);
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
                value={course.name + "{}[]" + course.id}
                data-tutors={course.tutors}
                onChange={(event) => {
                  // console.log(event.target.dataset);
                  // console.log(event.target.value);
                  let course = event.target.value.split("{}[]");
                  this.props.setCourse([
                    course[0],
                    course[1],
                    event.target.dataset.tutors.split(","),
                  ]);
                  this.props.incrementStep();
                }}
                checked={this.props.flowData.courseName === course.id}
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

// REDUX MAPPING //
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
