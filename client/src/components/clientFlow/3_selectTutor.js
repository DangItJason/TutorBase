import React, { Component } from "react";
import classNames from "classnames";

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
            <div className="form-group">
                <h2 className={classNames("mt-4", "hr")}>Select a Tutor</h2>
                {tutors.map(tutor => 
                    <div className="radio-option">
                        <label>
                            <input className="form-input" type="radio" name="tutor" id="tutor" value={this.props.tutor}></input>
                            <p>{tutor.name}</p>
                        </label>
                    </div>
                )}
            </div>
        );
    }
}

export default Step3;