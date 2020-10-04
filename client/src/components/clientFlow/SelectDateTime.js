import React, {Component, createRef, useCallback, useRef} from "react";
import AvailableTimes from 'react-available-times';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import {TZDate} from "tui-calendar";

/*
    Reach ToastUI Calendar Documentation: https://github.com/nhn/toast-ui.react-calendar
    ToastUI Calendar Documentation: https://nhn.github.io/tui.calendar/latest/Calendar
*/

// Temp Appointment Data
const tempTutorData = [
    {
        appt_id: '1',
        course_id: '1234',
        date: new Date(2020, 9, 7, 15, 0, 0, 0),
        start_time: '17:00',
        end_time: '18:00',
        location: 'Sage',
        tutor_id: '1234',
        client_id: '12345',
        price: 55,
        notes: "Test",
        confirmed: false
    },
    {
        appt_id: '12',
        course_id: '1234',
        date: new Date(2020, 9, 6, 16, 0, 0, 0),
        start_time: '17:00',
        end_time: '18:00',
        location: 'Sage',
        tutor_id: '1234',
        client_id: '12345',
        price: 55,
        notes: "Test",
        confirmed: true
    }
]

// Date Utility Function
Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
}

var themeConfig = {
    'common.border': '1px solid #e5e5e5',
    'common.backgroundColor': 'white',
    'common.holiday.color': '#ff4040',
    'common.saturday.color': '#333',
    'common.dayname.color': '#333',
    'common.today.color': '#333',

// creation guide style
    'common.creationGuide.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'common.creationGuide.border': '1px solid #515ce6',

// month header 'dayname'
    'month.dayname.height': '31px',
    'month.dayname.borderLeft': '1px solid #e5e5e5',
    'month.dayname.paddingLeft': '10px',
    'month.dayname.paddingRight': '10px',
    'month.dayname.backgroundColor': 'inherit',
    'month.dayname.fontSize': '12px',
    'month.dayname.fontWeight': 'normal',
    'month.dayname.textAlign': 'left',

// month day grid cell 'day'
    'month.holidayExceptThisMonth.color': 'rgba(255, 64, 64, 0.4)',
    'month.dayExceptThisMonth.color': 'rgba(51, 51, 51, 0.4)',
    'month.weekend.backgroundColor': 'inherit',
    'month.day.fontSize': '14px',

// month schedule style
    'month.schedule.borderRadius': '2px',
    'month.schedule.height': '24px',
    'month.schedule.marginTop': '2px',
    'month.schedule.marginLeft': '8px',
    'month.schedule.marginRight': '8px',

// month more view
    'month.moreView.border': '1px solid #d5d5d5',
    'month.moreView.boxShadow': '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
    'month.moreView.backgroundColor': 'white',
    'month.moreView.paddingBottom': '17px',
    'month.moreViewTitle.height': '44px',
    'month.moreViewTitle.marginBottom': '12px',
    'month.moreViewTitle.backgroundColor': 'inherit',
    'month.moreViewTitle.borderBottom': 'none',
    'month.moreViewTitle.padding': '12px 17px 0 17px',
    'month.moreViewList.padding': '0 17px',

// week header 'dayname'
    'week.dayname.height': '42px',
    'week.dayname.borderTop': '1px solid #e5e5e5',
    'week.dayname.borderBottom': '1px solid #e5e5e5',
    'week.dayname.borderLeft': 'inherit',
    'week.dayname.paddingLeft': '0',
    'week.dayname.backgroundColor': 'inherit',
    'week.dayname.textAlign': 'left',
    'week.today.color': '#333',
    'week.pastDay.color': '#bbb',

// week vertical panel 'vpanel'
    'week.vpanelSplitter.border': '1px solid #e5e5e5',
    'week.vpanelSplitter.height': '3px',

// week daygrid 'daygrid'
    'week.daygrid.borderRight': '1px solid #e5e5e5',
    'week.daygrid.backgroundColor': 'inherit',

    'week.daygridLeft.width': '72px',
    'week.daygridLeft.backgroundColor': 'inherit',
    'week.daygridLeft.paddingRight': '8px',
    'week.daygridLeft.borderRight': '1px solid #e5e5e5',

    'week.today.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'week.weekend.backgroundColor': 'inherit',

// week timegrid 'timegrid'
    'week.timegridLeft.width': '72px',
    'week.timegridLeft.backgroundColor': 'inherit',
    'week.timegridLeft.borderRight': '1px solid #e5e5e5',
    'week.timegridLeft.fontSize': '11px',
    'week.timegridLeftTimezoneLabel.height': '40px',
    'week.timegridLeftAdditionalTimezone.backgroundColor': 'white',

    'week.timegridOneHour.height': '52px',
    'week.timegridHalfHour.height': '26px',
    'week.timegridHalfHour.borderBottom': 'none',
    'week.timegridHorizontalLine.borderBottom': '1px solid #e5e5e5',

    'week.timegrid.paddingRight': '8px',
    'week.timegrid.borderRight': '1px solid #e5e5e5',
    'week.timegridSchedule.borderRadius': '2px',
    'week.timegridSchedule.paddingLeft': '2px',

    'week.currentTime.color': '#515ce6',
    'week.currentTime.fontSize': '11px',
    'week.currentTime.fontWeight': 'normal',

    'week.pastTime.color': '#bbb',
    'week.pastTime.fontWeight': 'normal',

    'week.futureTime.color': '#333',
    'week.futureTime.fontWeight': 'normal',

    'week.currentTimeLinePast.border': '1px dashed #515ce6',
    'week.currentTimeLineBullet.backgroundColor': '#515ce6',
    'week.currentTimeLineToday.border': '1px solid #515ce6',
    'week.currentTimeLineFuture.border': 'none',

// week creation guide style
    'week.creationGuide.color': '#515ce6',
    'week.creationGuide.fontSize': '11px',
    'week.creationGuide.fontWeight': 'bold',

// week daygrid schedule style
    'week.dayGridSchedule.borderRadius': '2px',
    'week.dayGridSchedule.height': '24px',
    'week.dayGridSchedule.marginTop': '2px',
    'week.dayGridSchedule.marginLeft': '8px',
    'week.dayGridSchedule.marginRight': '8px'
};

var templates = {

}

var weekOptions = {
    daynames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    // narrowWeekend: true,
}

class Step4 extends Component {
    constructor(props) {
        super(props);
        this.cal = createRef();
    }

    render() {
        // Only render this step if currentStep matches
        if (this.props.currentStep !== 4)
            return null;

        // Get Tutor's current appointment times to put on calender
        const getSchedules = () => {
            // Use an express route to fetch data
            let calSchedules = [];
            tempTutorData.forEach(appointment => {
                calSchedules.push({
                    id: appointment.appt_id,
                    calendarId: "0",
                    category: "time",
                    isVisible: true,
                    isReadOnly: true,
                    bgColor: 'red',
                    // location: appointment.location,
                    title: appointment.confirmed ? 'Pending Booked' : 'Tutor Booked',
                    isPending: appointment.confirmed,
                    start: appointment.date,
                    end: new Date(appointment.date).addHours(2)
                })
            })

            return calSchedules;
        }

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
                bgColor: 'lightblue',
                location: scheduleData.location,
                raw: {
                    class: scheduleData.raw["class"]
                },
                state: scheduleData.state
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

        return (
            <div class="form-group text-center">
                <h3 class="hr mt-1">Select a Time</h3>
                <div style={{marginLeft: '-45px'}}>
                    <Calendar ref={this.cal}
                              theme={themeConfig}
                              template={templates}
                              week={weekOptions}
                              height={'1000px'}
                              schedules={getSchedules()}
                              defaultView={'week'}
                              taskView={false}
                              scheduleView={['time']}
                              useCreationPopup={true}
                              useDetailPopup={true}
                              onClickSchedule={onClickSchedule}
                              onBeforeCreateSchedule={onBeforeCreateSchedule}
                              onBeforeDeleteSchedule={onBeforeDeleteSchedule}
                              onBeforeUpdateSchedule={onBeforeUpdateSchedule}
                              // timezones={[
                              //     {
                              //         timezoneOffset: 540,
                              //         tooltip: 'Seoul'
                              //     },
                              //     {
                              //         timezoneOffset: -420,
                              //         tooltip: 'Los Angeles'
                              //     },
                              //     {
                              //         timezoneOffset: 0,
                              //         tooltip: 'EST'
                              //     }
                              // ]}
                    />
                </div>
            </div>
        );
    }
}

export default Step4;
