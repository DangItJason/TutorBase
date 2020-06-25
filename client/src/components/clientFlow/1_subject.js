import React, { Component } from "react";

class Step1 extends Component {
    state = {
        //1. Grab subject codes based on available tutors from server
        //2. Pass into props
        //3. Render components
        subject_codes = [],
        //Create a seperate component for this.
        subject_cards = [],
    };

    render() {
        
        for (const [index, value] of this.state.subject_codes.entries()) {
            this.state.subject_cards.push(<div>create_component_from_subject_code</div>)
        }
        
        return (
            <div>
                {this.state.subject_cards}
            </div>
        );
    }
}

export default Step1;