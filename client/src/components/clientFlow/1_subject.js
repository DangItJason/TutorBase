import React, { Component } from "react";

class Step1 extends Component {
    constructor(props) {
        super(props)
        this.state = { subjects: [] };
    }

    componentDidMount() {
        // Load subjects if they have not yet been loaded in 
        if (!this.state.subjects.length) {
            fetch("http://localhost:9000/catalog")
                .then(res => {
                    console.log(res);
                    return res.json()
                })
                .then(subjects => { 
                    console.log(subjects); 
                    subjects.map(subject => 
                        this.setState(prevState => ({
                            subjects: [...prevState.subjects, {id: subject.id, courses: subject.courses}]
                        }))
                    )
                });
        }
    }
  
    render() {
        // Only render this step if currentStep matches
        if (this.props.currentStep !== 1) 
            return null;
        
        return (
            <div class="form-group text-center">
                <h3 class="hr mt-1">Select a Subject</h3>
                {this.state.subjects.map((subject, i) => 
                    <div className="radio-option" key={i}>
                        <label>
                            <input className="form-input" type="radio" name="subject" value={subject.id} onChange={this.props.handleChange} checked={this.props.subject === subject.id}></input>
                            <p className="form-label">{subject.id}</p>
                        </label>
                    </div>
                )}
            </div>
        );
    }
}

export default Step1;