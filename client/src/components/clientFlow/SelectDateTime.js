import React, { Component } from "react";
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT,
} from "react-big-scheduler";
import "react-big-scheduler/lib/css/style.css";
import moment from "moment";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
// import AvailableTimes from 'react-available-times';

class Step4 extends Component {
  constructor(props) {
    super(props);

    let schedulerData = new SchedulerData(
      new moment().format(DATE_FORMAT),
      ViewTypes.Week
    );
    //set locale moment to the schedulerData, if your locale isn't English. By default, Scheduler comes with English(en, United States).
    moment.locale("zh-cn");
    schedulerData.setLocaleMoment(moment);
    let calenderName = this.props.course + " Session";
    let resources = [
      {
        id: "class1",
        name: calenderName,
      },
    ];
    schedulerData.setResources(resources);
    this.state = {
      viewModel: schedulerData,
    };
  }

  render() {
    // Only render this step if currentStep matches
    if (this.props.currentStep !== 4) return null;
    const { viewModel } = this.state;

    return (
      <div class="form-group text-center">
        <h3 class="hr mt-1"> Select a Time </h3>{" "}
        <Scheduler
          schedulerData={viewModel}
          prevClick={this.prevClick}
          nextClick={this.nextClick}
          onSelectDate={this.onSelectDate}
          onViewChange={this.onViewChange}
          newEvent={this.newEvent}
          updateEventStart={this.updateEventStart}
          updateEventEnd={this.updateEventEnd}
          moveEvent={this.moveEvent}
        />
      </div>
    );
  }

  prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(schedulerData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(schedulerData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(schedulerData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(schedulerData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    let newFreshId = 0;
    schedulerData.events.forEach((item) => {
      if (item.id >= newFreshId) newFreshId = item.id + 1;
    });

    let newEvent = {
      id: newFreshId,
      title: "Tutor Session",
      start: start,
      end: end,
      resourceId: slotId,
      bgColor: "purple",
    };
    schedulerData.addEvent(newEvent);
    this.setState({
      viewModel: schedulerData,
    });
  };

  updateEventStart = (schedulerData, event, newStart) => {
    schedulerData.updateEventStart(event, newStart);
    this.setState({
      viewModel: schedulerData,
    });
  };

  updateEventEnd = (schedulerData, event, newEnd) => {
    schedulerData.updateEventEnd(event, newEnd);
    this.setState({
      viewModel: schedulerData,
    });
  };

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    schedulerData.moveEvent(event, slotId, slotName, start, end);
    this.setState({
      viewModel: schedulerData,
    });
  };
}

export default DragDropContext(HTML5Backend)(Step4);
// export default Step4;
