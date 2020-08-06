import React, { Component } from "react";
import Toast from 'light-toast';
import classNames from "classnames";

class Step6 extends Component {


    render() {
        // Only render this step if currentStep matches
        if (this.props.currentStep !== 6) 
            return null;

        return (
            <div class="form-group text-center">
                <h3 class="hr mt-1">Reserve</h3>
                <h3>{this.props.date}, {this.props.startTime} - {this.props.endTime}</h3>
                <h4>Notes</h4>
                <textarea
                    className="form-input" name="notes" id="notes"
                    placeholder="Have a preferred location? Need help on a specific homework or project? Let the tutor know here!">
                        {this.props.notes}
                </textarea>
                <br />
                <button className="btn btn-danger" onClick = {() => {
                    Toast.success("Appointment Submitted!. We'll send you an email if the tutor accepts the appointment.", 3000);
                }}>Book Now</button>
            </div>
        );
    }
}

export default Step6;