import React, { Component } from "react";
import AvailableTimes from 'react-available-times';
import ScheduleSelector from 'react-schedule-selector'

class Step4 extends Component {

    state = { schedule : [] }

    handleChange = newSchedule => {
        this.setState({ schedule: newSchedule })
    }

    render() {

        if (this.props.currentStep !== 4)
            return null;

        return (
            <ScheduleSelector
        selection={this.state.schedule}
        numDays={5}
        minTime={8}
        maxTime={22}
        hourlyChunks={1}
        onChange={this.handleChange}
        />
    )
    }
}

export default Step4;