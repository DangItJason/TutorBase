import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { actions } from "../../store/clientFlowData";
import { isMobile } from "react-device-detect";
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Calendar from "@toast-ui/react-calendar";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import "tui-calendar/dist/tui-calendar.css";

// Week Options
const mobileWeekOptions = {
  daynames: ["", "", "", "", "", "", ""],
};

const weekOptions = {};

// Date Utility Function
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

class Step4 extends Component {
  constructor(props) {
    super(props);
    this.cal = createRef();
    this.mobile = isMobile;
    this.currentView = "week";
    this.state = {
      date: null,
      start: null,
      end: null,
      calTypeOpen: false,
      tutorHours: null,
    };
  }

  render() {
    // if (this.state.startDay != null)
    //   this.test(this.state.startDay, this.state.endDay);

    // Only render this step if currentStep matches
    if (this.props.currentStep !== 4) return null;

    // Template Functions //
    const onClickSchedule = (e) => {
      const { calendarId, id } = e.schedule;
      const event = this.cal.current.calendarInst.getElement(id, calendarId);
    };

    const onBeforeCreateSchedule = (scheduleData) => {
      console.log(scheduleData);
      let startDay = scheduleData.start;
      let endDay = scheduleData.end;
      let id = String(Math.random());
      let date = new Date(
        startDay.getFullYear(),
        startDay.getMonth(),
        startDay.getDay()
      ).toDateString();
      let start = `${startDay.getHours()}:${startDay.getMinutes()}`;
      let end = `${endDay.getHours()}:${endDay.getMinutes()}`;

      // this.props.setSessionTime([
      //   new Date(
      //     startDay.getFullYear(),
      //     startDay.getMonth(),
      //     startDay.getDay()
      //   ).toDateString(),
      //   `${startDay.getHours()}:${startDay.getMinutes()}`,
      //   `${endDay.getHours()}:${endDay.getMinutes()}`,
      // ]);

      const schedule = {
        id: id,
        title: scheduleData.title,
        isAllDay: scheduleData.isAllDay,
        start: scheduleData.start,
        end: scheduleData.end,
        category: scheduleData.isAllDay ? "allday" : "time",
        dueDateClass: "",
        bgColor: "lightblue",
        location: scheduleData.location,
        raw: {
          class: scheduleData.raw["class"],
        },
        state: scheduleData.state,
      };

      this.cal.current.calendarInst.createSchedules([schedule]);
    };

    const onBeforeDeleteSchedule = (res) => {
      const { id, calendarId } = res.schedule;

      this.cal.current.calendarInst.deleteSchedule(id, calendarId);
    };

    const onBeforeUpdateSchedule = (e) => {
      const { schedule, changes } = e;

      this.cal.current.calendarInst.updateSchedule(
        schedule.id,
        schedule.calendarId,
        changes
      );
    };
    ////////////////////////

    // Instance Functions //
    const calNext = () => {
      const calendarInstance = this.cal.current.getInstance();
      calendarInstance.next();
    };

    const calBack = () => {
      const calendarInstance = this.cal.current.getInstance();
      calendarInstance.prev();
    };

    const calReturn = () => {
      const calendarInstance = this.cal.current.getInstance();
      calendarInstance.today();
    };

    const setMonthView = () => {
      const calendarInstance = this.cal.current.getInstance();
      calendarInstance.changeView("month", true);
      this.currentView = "month";
    };

    const setWeekView = () => {
      const calendarInstance = this.cal.current.getInstance();
      calendarInstance.changeView("week", true);
      this.currentView = "week";
    };

    const setDayView = () => {
      const calendarInstance = this.cal.current.getInstance();
      calendarInstance.changeView("day", true);
      this.currentView = "day";
    };

    const toggleCalType = (prevState) => {
      this.setState({ calTypeOpen: !prevState.calTypeOpen });
    };
    ////////////////////////

    return (
      <div className="form-group text-center">
        <h3 className="hr mt-1">Select a Time</h3>

        <div>
          <div style={{ display: "flex", alignSelf: "left" }}>
            <Button style={{ margin: "0.2em" }} onClick={calBack}>
              Back
            </Button>
            <Button style={{ margin: "0.2em" }} onClick={calReturn}>
              Today
            </Button>
            <Button style={{ margin: "0.2em" }} onClick={calNext}>
              Next
            </Button>
            <Dropdown
              style={{ margin: "0.2em" }}
              isOpen={this.state.calTypeOpen}
              toggle={() => {
                toggleCalType(this.state);
              }}
            >
              <DropdownToggle caret>{this.currentView}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={setDayView}>Day</DropdownItem>
                <DropdownItem onClick={setWeekView}>Week</DropdownItem>
                <DropdownItem onClick={setMonthView}>Month</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <Calendar
            ref={this.cal}
            height={"100%"}
            view={this.currentView}
            week={this.mobile ? mobileWeekOptions : weekOptions}
            taskView={false}
            scheduleView={["time"]}
            useCreationPopup={true}
            useDetailPopup={true}
            onClickSchedule={onClickSchedule}
            onBeforeCreateSchedule={onBeforeCreateSchedule}
            onBeforeDeleteSchedule={onBeforeDeleteSchedule}
            onBeforeUpdateSchedule={onBeforeUpdateSchedule}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incrementFurthest: (state) =>
      dispatch(actions.incrementFurthestStep(state)),
    setSessionTime: (state, action) =>
      dispatch(actions.setSessionTime(state, action)),
  };
};

function mapStateToProps(state) {
  const { clientFlow } = state;
  return {
    startTime: clientFlow.startTime,
    endTime: clientFlow.endTime,
    currentStep: clientFlow.currentStep,
    flowData: clientFlow,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Step4);
