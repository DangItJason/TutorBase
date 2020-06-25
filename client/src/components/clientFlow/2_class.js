import React, { Component } from "react";

class Step2 extends Component {
    state = {
        //1. Grab class codes based on available tutors from server
        //2. Pass into state
        //3. Render components
        class_codes = [],
        //Create a seperate component for this. ... maybe?
        class_cards = [],
    };

    render() {
        
        for (const [index, value] of this.state.class_codes.entries()) {
            this.state.class_cards.push(<div>create_component_from_class_code</div>)
        }
        
        return (
            <div>
                {this.state.class_cards}
            </div>
        );
    }
}

export default Step2;