import React, { Component } from "react";

class Step4 extends Component {
    render() {
        // Only render this step if currentStep matches
        if (this.props.currentStep !== 4)
            return null;

        return (
            <div className="form-group">

            </div>
        );
    }
}

export default Step4;