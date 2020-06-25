import React, { Component } from "react";

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

        if (this.props.currentStep !== 3) 
            return null;
        
        return (
            <div className="form-group">
                {tutors.map(tutor => 
                    <div>
                        <input class="form-input" type="radio" name="tutor" id="tutor" value={this.props.tutor}></input>
                        <label class="form-label" for="exampleRadios1">{tutor.name}</label>
                    </div>
                )}
            </div>
        );
    }
}

export default Step3;