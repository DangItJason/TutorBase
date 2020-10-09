import React, { Component, createRef, useCallback, useRef } from "react";
import AvailableTimes from "react-available-times";
import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import { TZDate } from "tui-calendar";
import { isMobile } from "react-device-detect";

/*
    Reach ToastUI Calendar Documentation: https://github.com/nhn/toast-ui.react-calendar
    ToastUI Calendar Documentation: https://nhn.github.io/tui.calendar/latest/Calendar
*/

// Temp Appointment Data
const tempTutorData = [
  {
    appt_id: "1",
    course_id: "1234",
    date: new Date(2020, 9, 7, 15, 0, 0, 0),
    start_time: "17:00",
    end_time: "18:00",
    location: "Sage",
    tutor_id: "1234",
    client_id: "12345",
    price: 55,
    notes: "Test",
    confirmed: false,
  },
  {
    appt_id: "12",
    course_id: "1234",
    date: new Date(2020, 9, 6, 16, 0, 0, 0),
    start_time: "17:00",
    end_time: "18:00",
    location: "Sage",
    tutor_id: "1234",
    client_id: "12345",
    price: 55,
    notes: "Test",
    confirmed: true,
  },
];

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
  }

  render() {
    // Only render this step if currentStep matches
    if (this.props.currentStep !== 4) return null;

    // Get Tutor's current appointment times to put on calender
    const getSchedules = () => {
      // Use an express route to fetch data
      let calSchedules = [];
      tempTutorData.forEach((appointment) => {
        calSchedules.push({
          id: appointment.appt_id,
          calendarId: "0",
          category: "time",
          isVisible: true,
          isReadOnly: true,
          bgColor: "red",
          // location: appointment.location,
          title: appointment.confirmed ? "Pending Booked" : "Tutor Booked",
          isPending: appointment.confirmed,
          start: appointment.date,
          end: new Date(appointment.date).addHours(2),
        });
      });

      return calSchedules;
    };

    // Template Functions //
    const onClickSchedule = (e) => {
      const { calendarId, id } = e.schedule;
      const el = this.cal.current.calendarInst.getElement(id, calendarId);

      console.log(el.getBoundingClientRect());
    };

    const onBeforeCreateSchedule = (scheduleData) => {
      // Add Express route to save time //
      console.log(scheduleData);

      const schedule = {
        id: String(Math.random()),
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
      // Add Express route to delete time //
      const { id, calendarId } = res.schedule;

      this.cal.current.calendarInst.deleteSchedule(id, calendarId);
    };

    const onBeforeUpdateSchedule = (e) => {
      // Add Express route to update time //
      console.log(e);

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
    };

    const setWeekView = () => {
      const calendarInstance = this.cal.current.getInstance();
      calendarInstance.changeView("week", true);
    };

    const setDayView = () => {
      const calendarInstance = this.cal.current.getInstance();
      calendarInstance.changeView("day", true);
    };
    ////////////////////////

    return (
      <div class="form-group text-center">
        <h3 class="hr mt-1">Select a Time</h3>

        <div>
          <div style={{ display: "flex", alignSelf: "left" }}>
            <button onClick={calBack}>Back</button>
            <button onClick={calReturn}>Today</button>
            <button onClick={calNext}>Next</button>
            <select>
              <option onClick={setMonthView} value={"Month"}>
                Month
              </option>
              <option
                onClick={setWeekView}
                value={"Week"}
                selected={"selected"}
              >
                Week
              </option>
              <option onClick={setDayView} value={"Day"}>
                Day
              </option>
            </select>
          </div>
          <Calendar
            ref={this.cal}
            height={"100%"}
            schedules={getSchedules()}
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

export default Step4;
