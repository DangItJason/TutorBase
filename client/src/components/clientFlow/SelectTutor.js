import React, { Component } from "react";
import classNames from "classnames";
import TutorCard from "../tutorCard/TutorCard";

class Step3 extends Component {
    constructor(props) {
        super(props)
        this.state = { course: "", tutors: [] };
    }

    formatDate(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear().toString().substring(0, 2) + ', ' + hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    nextAvailableTime(info) {
        let time = new Date();
        let hours = info['times'];
        let interval = info['interval'];
        let hr = time.getHours();
        let mins = time.getMinutes();
        let nextAvailHr = 0;
        let nextAvailMins = 0;

        // Round up minutes based on tutor-specified interval
        if (mins + interval >= 60) {
            hr += 1;
            mins = 0;
        }
        else if (mins !== 0 && mins % interval !== 0)
            mins += (interval - (mins % interval));

        let dayInd = time.getDay();
        let dayCount = 0;

        for (dayCount; dayCount < 7; dayCount++) {
            if (dayInd > 6)
                dayInd = 0;
            let workHrs = hours[dayInd];
            for (var pair of workHrs) {
                const startHr = (pair[0] - pair[0] % 100) / 100;
                const endHr = (pair[1] - pair[1] % 100) / 100;
                // Current time falls between interval
                if (startHr <= hr && hr < endHr && (mins + interval) < 60) {
                    nextAvailHr = hr;
                    nextAvailMins = mins;
                    return this.formatDate(new Date(time.getFullYear(), time.getMonth(), time.getDate() + dayCount, nextAvailHr, nextAvailMins));
                }
                // Current time falls before interval
                else if (hr < startHr) {
                    const startMins = pair[0] % 100;
                    nextAvailHr = startHr;
                    nextAvailMins = startMins;
                    return this.formatDate(new Date(time.getFullYear(), time.getMonth(), time.getDate() + dayCount, nextAvailHr, nextAvailMins));
                }
            }
            dayInd++;          
        }
        return this.formatDate(time);
    }

    componentDidUpdate() {
        // Load tutors if they have not yet been loaded in 
        if (this.state.course !== this.props.course) {
            this.setState({course: this.props.course, tutors: []})
            // Retrieve all User objects with IDs in this.props.tutor_ids
            fetch("http://localhost:9000/catalog/tutors", {method: 'POST', body: JSON.stringify({ tutor_ids: this.props.tutor_ids }), headers: {'Content-Type': 'application/json'}})
                .then(res => {
                    console.log(res);
                    return res.json()
                })
                .then(users => { 
                    console.log(users);
                    users.map(user => 
                        this.setState(prevState => ({
                            tutors: [...prevState.tutors, {id: user._id, email: user.email, name: user.first_name + " " + user.last_name, info: user.tutor, next_avail: this.nextAvailableTime(user.tutor)}]
                        }))
                    )
                });
        }
    }

    render() {        
        // Only render this step if currentStep matches
        if (this.props.currentStep !== 3) 
            return null;
        
        return (
            <div class="form-group text-center">
                <h3 class="hr mt-1">Select a Tutor</h3>
                <div class="row justify-content-md-center">
                    {this.state.tutors.map(tutor => 
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