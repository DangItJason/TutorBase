import React, { Component } from "react";
import classNames from "classnames";

class Step4 extends Component {
    render() {
        // Placeholder date data for testing purposes
        let dates = [
            {day: "Sunday", hours: "3PM-5PM"},
            {day: "Monday", hours: "3PM-5PM"},
            {day: "Tuesday", hours: "3PM-5PM"},
            {day: "Wednesday", hours: "3PM-5PM"},
            {day: "Thursday", hours: "3PM-5PM"},
            {day: "Friday", hours: "3PM-5PM"},
            {day: "Saturday", hours: "3PM-5PM"}
        ];

        // Only render this step if currentStep matches
        if (this.props.currentStep !== 4)
            return null;

        return (
            <div className="form-group">
                <h2 className={classNames("mt-4", "hr")}>Select a Day</h2>
                {dates.map(date => 
                    <div className="radio-option">
                        <label>
                            <input className="form-input" type="radio" name="date" value={date.day} onChange={this.props.handleChange} checked={this.props.date === date.day}></input>
                            <p className="form-label">{date.day}<br />Available {date.hours}</p>
                        </label>
                    </div>
                )}
            </div>
        );
    }
}

export default Step4;