import React, { Component } from "react";
import classNames from "classnames";

class Step6 extends Component {
    render() {
        // Only render this step if currentStep matches
        if (this.props.currentStep !== 6) 
            return null;

        return (
            <div className="form-group">
                <h2 className={classNames("mt-4", "hr")}>Reserve</h2>
                <h3>{this.props.date}, {this.props.startTime} - {this.props.endTime}</h3>
                <h4>Notes</h4>
                <textarea 
                    className="form-input" name="notes" id="notes"
                    placeholder="Have a preferred location? Need help on a specific homework or project? Let the tutor know here!">
                        {this.props.notes}
                </textarea>
                <button className="btn btn-danger btn-block">Book Now</button>
            </div>
        );
    }
}

export default Step6;