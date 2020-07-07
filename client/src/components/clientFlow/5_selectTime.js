import React, { Component } from "react";
import classNames from "classnames";

class Step5 extends Component {

    render() {
        // Placeholder time data for testing purposes
        let startTimes = ["3:00PM", "3:30PM", "4:00PM", "4:30PM"];
        let endTimes = ["3:30PM", "4:00PM", "4:30PM", "5:00PM"];

        // Only render this step if currentStep matches
        if (this.props.currentStep !== 5) 
            return null;

        return (
            <div className="form-group">
                <h2 className={classNames("mt-4", "hr")}>Select a Time</h2>
                <div class="row">
                    <div class="col-md-6">
                        <p>Start Time</p>
                            {startTimes.map(time => 
                                <div className="radio-option">
                                    <label>
                                        <input className="form-input" type="radio" name="startTime" value={time} onChange={this.props.handleChangeTime} checked={this.props.startTime === time}></input>
                                        <p className="form-label">{time}</p>
                                    </label>
                                </div>
                            )}
                    </div>
                    <div class="col-md-6">
                        <p>End Time</p>
                            {endTimes.map(time => 
                                <div className="radio-option">
                                    <label>
                                        <input className="form-input" type="radio" name="endTime" value={time} onChange={this.props.handleChangeTime} checked={this.props.endTime === time}></input>
                                        <p className="form-label">{time}</p>
                                    </label>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Step5;