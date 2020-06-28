import React, { Component } from "react";

class Step5 extends Component {
    render() {
        // Only render this step if currentStep matches
        if (this.props.currentStep !== 5) 
            return null;

        return (
            <div className="form-group">

            </div>
        );
    }
}

export default Step5;