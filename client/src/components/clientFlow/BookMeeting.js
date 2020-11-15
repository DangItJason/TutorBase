import React, { Component } from "react";
import ToastSubmit from "./toast/submit.js";
import classNames from "classnames";
import {connect} from "react-redux";

class Step5 extends Component {
 
    render() {
        // Only render this step if currentStep matches
        if (this.props.currentStep !== 5) 
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
                <ToastSubmit message = "Hello World"></ToastSubmit>
            </div>
        );
    }
}

function mapStateToProps(state){
    const { clientFlow } = state;
    return {    
        date: clientFlow.date, 
        startTime: clientFlow.startTime,
        endTime: clientFlow.endTime,
        notes: clientFlow.notes,
    };
}

export default connect(mapStateToProps)(Step5);