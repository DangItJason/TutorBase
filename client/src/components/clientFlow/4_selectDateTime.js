import React, { Component } from "react";
import AvailableTimes from 'react-available-times';
import {connect} from "react-redux";
import {actions} from "../../store/clientFlowData";

class Step4 extends Component {

    render() {
        // Only render this step if currentStep matches
        if (this.props.currentStep !== 4) 
            return null;

        return (
            <div class="form-group text-center">
                <h3 class="hr mt-1">Select a Time</h3>
                <AvailableTimes
                    timeConvention="12h"
                    weekStartsOn="sunday"
                    onChange={(selections) => {
                        selections.forEach(({ start, end }) => {
                            console.log('Start:', start, 'End:', end);
                        })
                        if (selections.length > 0) {
                            this.props.handleChangeTime();
                        }
                    }}
                    recurring={false}
                    availableDays={['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']}
                    availableHourRange={{ start: 10, end: 20 }}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSidebar: (state, event) => dispatch(actions.handleChangeTime(state, event))
    }
}

function mapStateToProps(state){
    const { clientFlow } = state;
    return {
        startTime: clientFlow.startTime,
        endTime: clientFlow.endTime,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Step4);