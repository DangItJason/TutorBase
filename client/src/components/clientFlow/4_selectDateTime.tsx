import React, {createRef, useEffect, useRef, useState} from "react";
import {initialState as clientFlowData} from "../../store/ClientFlowData/slice";
import {isMobile} from "react-device-detect";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,} from "reactstrap";
import Calendar from "@toast-ui/react-calendar";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import "tui-calendar/dist/tui-calendar.css";
import {ApiBaseAddress} from "../../utils/Environment";
import {selectClientFlowData} from "../../store/ClientFlowData/selectors";
import {useDispatch, useSelector} from "react-redux";
import {actions as clientFlowActions} from '../../store/ClientFlowData/slice'

// Calendar Default Options //
const mobileWeekOptions = {
    daynames: ["", "", "", "", "", "", ""],
};

const weekOptions = {};
//////////////////////////////

// Date Utility Function //
//Add hours to a dateTime//
// @ts-ignore
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
};

///////////////////////////

export function Step4() {
    const cal: any = useRef(null);
    const [mobile, setMobile] = useState(isMobile);
    const [currentView, setCurrentView] = useState("week");
    const [calTypeOpen, setCalTypeOpen] = useState(false);
    const [prevSchedule, setPreviousSchedule] = useState([{}]);

    const dispatch = useDispatch();
    const clientFlowData = useSelector(selectClientFlowData);

    // useEffect(() => {
    //     // Get a tutors already scheduled appointments
    //     let headers = {
    //         "Content-Type": "application/json",
    //     };
    //
    //     // Add previously schedule meeting to array
    //     let previousAppts = [{
    //         id: "1",
    //         calendarId: "0",
    //         title: clientFlowData.apptSubj,
    //         category: "time",
    //         dueDateClass: "",
    //         start: new Date(clientFlowData.apptStartTime),
    //         end: new Date(clientFlowData.apptEndTime),
    //         bgColor: "lightblue",
    //         location: clientFlowData.apptLoc,
    //     },];
    //
    //     fetch(ApiBaseAddress + "api/appointments/tutor_id", {
    //         method: "GET",
    //         headers: headers,
    //     }).then((res) => {
    //         // TODO: Loop through the response data and add to previousAppts
    //
    //         if (clientFlowData.apptSubj !== "" && prevSchedule === []) {
    //             setPreviousSchedule(
    //                 previousAppts
    //             );
    //         }
    //     });
    // });

    /* This currently only supports saving one schedule appointment at a time. */
    if (clientFlowData.currentStep !== 4) return null;

    const toggleCalType = () => {
        setCalTypeOpen(!calTypeOpen);
    };

    // Template Functions //
    const onClickSchedule = (e: any) => {
        const {calendarId, id} = e.schedule;
        const event = cal.current.calendarInst.getElement(id, calendarId);
    };

    /* After all schedules are rendered
       on the calendar run this function.
       which saves the schedule details
       to store. */
    const onAfterRenderSchedule = (e: any) => {
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

        // dispatch(clientFlowActions.setAppt([apptDate, apptStart, apptEnd, apptLoc, apptSubj]));
    };

    const onBeforeCreateSchedule = (scheduleData: any) => {
        console.log("BEFORE CREATE SCHEDULE:", scheduleData);
        let id = 1;

        const schedule = {
            id: id,
            title: "Tutor Time!",
            isAllDay: scheduleData.isAllDay,
            start: scheduleData.start,
            end: scheduleData.end,
            category: scheduleData.isAllDay ? "allday" : "time",
            dueDateClass: "",
            bgColor: "lightblue",
            // location: scheduleData.location,
            // raw: {
            //   class: scheduleData.raw["class"],
            // },
            // state: scheduleData.state,
        };

        cal.current.calendarInst.createSchedules([schedule]);
    };

    // Gather the currently schedule appointments from tutor and block off times
    // const generateTutorTimes = () => {
    //     // Create Appointment
    //     let url = ApiBaseAddress + "api/appointment/" + clientFlowData.tutorId;
    //     let headers = {
    //         "Content-Type": "application/json",
    //     };
    //
    //     let start = new Date(clientFlowData.apptStartTime);
    //     let startMin = ("0" + start.getMinutes()).slice(-2);
    //     let startHour = ("0" + start.getHours()).slice(-2);
    //
    //     let end = new Date(clientFlowData.apptEndTime);
    //     let endMin = ("0" + start.getMinutes()).slice(-2);
    //     let endHour = ("0" + start.getHours()).slice(-2);
    //
    //     let body = {
    //         course_id: clientFlowData.courseId,
    //         start: start,
    //         end: endHour + endMin,
    //         loc: clientFlowData.apptLoc,
    //         tutor_id: clientFlowData.tutorId,
    //         client_id: clientFlowData.clientId,
    //         price: clientFlowData.tutorPrice,
    //         // notes: clientFlowData.notes,
    //     };
    //
    //     console.log("RESERVE POST BODY: ", body);
    //
    //     fetch(url, {
    //         method: "POST",
    //         headers: headers,
    //         body: JSON.stringify(body),
    //     }).then((res) => {
    //         console.log(res);
    //     });
    // }


    const onBeforeDeleteSchedule = (res: any) => {
        const {id, calendarId} = res.schedule;

        cal.current.calendarInst.deleteSchedule(id, calendarId);
    };

    const onBeforeUpdateSchedule = (e: any) => {
        const {schedule, changes} = e;

        cal.current.calendarInst.updateSchedule(
            schedule.id,
            schedule.calendarId,
            changes
        );
    };
    ////////////////////////

    // Instance Functions //
    const calNext = () => {
        const calendarInstance = cal.current.getInstance();
        calendarInstance.next();
    };

    const calBack = () => {
        const calendarInstance = cal.current.getInstance();
        calendarInstance.prev();
    };

    const calReturn = () => {
        const calendarInstance = cal.current.getInstance();
        calendarInstance.today();
    };

    const setMonthView = () => {
        const calendarInstance = cal.current.getInstance();
        calendarInstance.changeView("month", true);
        setCurrentView("month");
    };

    const setWeekView = () => {
        const calendarInstance = cal.current.getInstance();
        calendarInstance.changeView("week", true);
        setCurrentView("week");
    };

    const setDayView = () => {
        const calendarInstance = cal.current.getInstance();
        calendarInstance.changeView("day", true);
        setCurrentView("day");
    };
    ////////////////////////

    return (
        <div className="form-group text-center">
            <h3 className="hr mt-1">Select a Time</h3>

            <div>
                <div style={{display: "flex", alignSelf: "left"}}>
                    <Button style={{margin: "0.2em"}} onClick={calBack}>
                        Back
                    </Button>
                    <Button style={{margin: "0.2em"}} onClick={calReturn}>
                        Today
                    </Button>
                    <Button style={{margin: "0.2em"}} onClick={calNext}>
                        Next
                    </Button>
                    <Dropdown
                        style={{margin: "0.2em"}}
                        isOpen={calTypeOpen}
                        toggle={() => {
                            toggleCalType();
                        }}
                    >
                        <DropdownToggle caret>{currentView}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={setDayView}>Day</DropdownItem>
                            <DropdownItem onClick={setWeekView}>Week</DropdownItem>
                            <DropdownItem onClick={setMonthView}>Month</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <Calendar
                    ref={cal}
                    calendars={[
                        {
                            id: "0",
                            name: "Schedule",
                            bgColor: "#9e5fff",
                            borderColor: "#9e5fff",
                        },
                    ]}
                    height={"100%"}
                    view={currentView}
                    week={mobile ? mobileWeekOptions : weekOptions}
                    taskView={false}
                    scheduleView={["time"]}
                    // useCreationPopup={true}
                    useDetailPopup={true}
                    schedules={prevSchedule}
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
