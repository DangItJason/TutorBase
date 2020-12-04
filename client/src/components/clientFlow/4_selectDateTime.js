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

// Calendar Default Options //
const mobileWeekOptions = {
  daynames: ["", "", "", "", "", "", ""],
};

const weekOptions = {};
//////////////////////////////

// Date Utility Function //
//Add hours to a dateTime//
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};
///////////////////////////

class Step4 extends Component {
  constructor(props) {
    super(props);
    this.cal = createRef();
    this.mobile = isMobile;
    this.currentView = "week";
    this.state = {
      calTypeOpen: false,
      prevSchedule: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("Step 4 MOUNTING");
    // console.log("Prev State", prevState);
    // console.log("Curr State", this.state);
    // console.log("apptSubj", this.props.flowData.apptSubj);
    // console.log("VALID DATE:", new Date());
    if (
      this.props.flowData.apptSubj !== "" &&
      prevState.prevSchedule === this.state.prevSchedule
    ) {
      // console.log("start", new Date(this.props.flowData.apptStartTime));
      // console.log("end", new Date(this.props.flowData.apptEndTime));
      this.setState({
        prevSchedule: [
          {
            id: "1",
            calendarId: "0",
            title: this.props.flowData.apptSubj,
            category: "time",
            dueDateClass: "",
            start: new Date(this.props.flowData.apptStartTime),
            end: new Date(this.props.flowData.apptEndTime),
            bgColor: "lightblue",
            location: this.props.flowData.apptLoc,
          },
        ],
      });
    }
  }

  /* This currently only supports saving one schedule appointment
     at a time. */
  render() {
    // Only render this step if currentStep matches
    if (this.props.flowData.currentStep !== 4) return null;

    const toggleCalType = (prevState) => {
      this.setState({ calTypeOpen: !prevState.calTypeOpen });
    };

    // Template Functions //
    const onClickSchedule = (e) => {
      const { calendarId, id } = e.schedule;
      const event = this.cal.current.calendarInst.getElement(id, calendarId);
    };

    /* After all schedules are rendered
       on the calendar run this function.
       which saves the schedule details
       to store. */
    const onAfterRenderSchedule = (e) => {
      // TODO: This is being called twice for some reason
      // TODO: Block the user from trying to create another appt, if they do it loops infinitely
      console.log("AFTER RENDER SCHEDULE:", e);
      let startDay = e.schedule.start;
      let endDay = e.schedule.end;
      let apptLoc = e.schedule.location;
      let apptSubj = e.schedule.title;

      let apptDate = new Date(
        startDay.getFullYear(),
        startDay.getMonth(),
        startDay.getDay()
      ).toDateString();

      let apptStart = startDay.getTime();
      let apptEnd = endDay.getTime();

      this.props.setAppt([apptDate, apptStart, apptEnd, apptLoc, apptSubj]);
    };

    const onBeforeCreateSchedule = (scheduleData) => {
      console.log("BEFORE CREATE SCHEDULE:", scheduleData);
      let id = 1;

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
            calendars={[
              {
                id: "0",
                name: "Schedule",
                bgColor: "#9e5fff",
                borderColor: "#9e5fff",
              },
            ]}
            height={"100%"}
            view={this.currentView}
            week={this.mobile ? mobileWeekOptions : weekOptions}
            taskView={false}
            scheduleView={["time"]}
            useCreationPopup={true}
            useDetailPopup={true}
            schedules={this.state.prevSchedule}
            onClickSchedule={onClickSchedule}
            onBeforeCreateSchedule={onBeforeCreateSchedule}
            onBeforeDeleteSchedule={onBeforeDeleteSchedule}
            onBeforeUpdateSchedule={onBeforeUpdateSchedule}
            onAfterRenderSchedule={onAfterRenderSchedule}
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
    setAppt: (state, action) => dispatch(actions.setAppt(state, action)),
  };
};

function mapStateToProps(state) {
  const { clientFlow } = state;
  return { flowData: clientFlow };
}

export default connect(mapStateToProps, mapDispatchToProps)(Step4);
