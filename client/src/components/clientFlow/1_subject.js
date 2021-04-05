import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../store/ClientFlowData/slice";

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = { subjectIds: [] };
  }

  componentDidMount() {
    // Load subjects if they have not yet been loaded in
    if (!this.state.subjectIds.length) {
      let url = "http://localhost:9000/api/subjects";
      let headers = {
        "Content-Type": "application/json",
      };
      fetch(url, { method: "GET", headers: headers })
        .then((res) => {
          //console.log(res);
          return res.json();
        })
        .then((subjects) => {
          //console.log(subjects);
          subjects.map((subject) =>
            this.setState((prevState) => ({
              subjectIds: [...prevState.subjectIds, { id: subject.id }],
            }))
          );
        });
    }
  }

  render() {
    // Only render this step if currentStep matches
    if (this.props.flowData.currentStep !== 1) return null;

    return (
      <div class="form-group text-center">
        <h3 class="hr mt-1">Select a Subject</h3>
        {this.state.subjectIds.map((subject, i) => (
          <div className="radio-option" key={i}>
            <label>
              <input
                className="form-input"
                type="radio"
                name="subject"
                value={subject.id}
                onChange={(event) => {
                  this.props.setSubject(event.target.value);
                  this.props.incrementStep();
                }}
                checked={this.props.flowData.subjectId === subject.id}
              ></input>
              <p className="form-label">{subject.id}</p>
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
    setSubject: (state, payload) =>
      dispatch(actions.setSubject(state, payload)),
    incrementStep: (state) => dispatch(actions.incrementStep(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step1);
