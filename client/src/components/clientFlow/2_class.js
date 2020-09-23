import React, { Component } from "react";

class Step2 extends Component {
    constructor(props) {
        super(props)
        this.state = { subject: "", courses: [] }
    }

    componentDidUpdate() {
        // Load subjects if they have not yet been loaded in 
        if (this.state.subject !== this.props.subject) {
            this.setState({subject: this.props.subject, courses: []})
            fetch("http://localhost:9000/catalog/courses/" + this.props.subject)
                .then(res => {
                    console.log(res);
                    return res.json()
                })
                .then(courses => { 
                    console.log(courses); 
                    courses.map(course => 
                        this.setState(prevState => ({
                            courses: [...prevState.courses, {id: course.id, name: course.name, tutors: course.tutors}]
                        }))
                    )
                });
        }
    }
  
    render() {
        // Only render this step if currentStep matches
        if (this.props.currentStep !== 2) 
            return null;
        
        return (
            <div class="form-group text-center">
                <h3 class="hr mt-1">Select a Course</h3>
                {this.state.courses.map((course, i) => 
                    <div className="radio-option" key={i}>
                        <label>
                            <input className="form-input" type="radio" name="course" value={course.id} data-tutors={course.tutors} onChange={this.props.handleChangeCourse} checked={this.props.course === course.id}></input>
                            <p className="form-label">{course.id} - {course.name}</p>
                        </label>
                    </div>
                )}
            </div>
        );
    }
}

export default Step2;