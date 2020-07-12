import React, { Component } from "react";
import classNames from "classnames";
import TutorCard from "../tutorCard/TutorCard";

class Step3 extends Component {
    render() {
        // Placeholder tutor data for testing purposes
        let tutors = [
            {name: "Tutor Name1", available: "11:00AM", img: "https://randomuser.me/api/portraits/lego/1.jpg"},
            {name: "Tutor Name2", available: "2:00PM", img: "https://randomuser.me/api/portraits/lego/2.jpg"},
            {name: "Tutor Name3", available: "3:00PM", img: "https://randomuser.me/api/portraits/lego/3.jpg"},
            {name: "Tutor Name4", available: "10:00AM", img: "https://randomuser.me/api/portraits/lego/4.jpg"},
            {name: "Tutor Name5", available: "1:30PM", img: "https://randomuser.me/api/portraits/lego/5.jpg"},
            {name: "Tutor Name6", available: "4:30PM", img: "https://randomuser.me/api/portraits/lego/6.jpg"},
            {name: "Tutor Name7", available: "5:00PM", img: "https://randomuser.me/api/portraits/lego/7.jpg"},
        ];
        
        // Only render this step if currentStep matches
        if (this.props.currentStep !== 3) 
            return null;
        
        return (
            <div class="form-group text-center">
                <h3 class="hr mt-1">Select a Tutor</h3>
                <div class="row justify-content-md-center">
                    {tutors.map(tutor => 
                        <div class="radio-option col-md-3 mb-4 ml-3 mr-3">
                            <label>
                                <input className="form-input" type="radio" name="tutor" value={tutor.name} onChange={this.props.handleChange} checked={this.props.tutor === tutor.name}></input>
                                <p className="form-label"><TutorCard data={tutor}/></p>
                            </label>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Step3;