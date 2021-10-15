import React, {useEffect, useRef, useState} from "react";
import {isMobile} from "react-device-detect";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,} from "reactstrap";
import Calendar from "@toast-ui/react-calendar";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import "tui-calendar/dist/tui-calendar.css";
import {selectClientFlowData} from "../../store/ClientFlowData/selectors";
import {useDispatch, useSelector} from "react-redux";
import {api} from "../../services/api";
import {actions} from "../../store/ClientFlowData/slice";
import styled from "styled-components";

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

export const  Step4 = () => {
    const cal: any = useRef(null);
    const [mobile, setMobile] = useState(isMobile);
    const [currentView, setCurrentView] = useState("week");
    const [calTypeOpen, setCalTypeOpen] = useState(false);
    const [prevSchedule, setPreviousSchedule] = useState<any>();

    const dispatch = useDispatch();
    const clientFlowData = useSelector(selectClientFlowData);
    let previousAppts = [{
        id: "1",
        calendarId: "0",
        // title: clientFlowData.appointmentSubjectId,
        title: "Tutor Time!",
        category: "time",
        dueDateClass: "",
        start: new Date(clientFlowData.appointmentStartTime),
        end: new Date(clientFlowData.appointmentEndTime),
        bgColor: "lightblue",
        location: clientFlowData.appointmentLocation,
    },];

    useEffect(() => {
        // Gather the currently schedule appointments from tutor and block off times
        const generateTutorTimes = async () => {
            // Add previously schedule meeting to array

            let appts = await api.GetTutorAppointments(clientFlowData.selectedTutor._id);

            if (appts !== null) {
                appts.data.forEach(appt => {
                    previousAppts.push({
                        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(),
                        calendarId: "0",
                        title: "Blocked Time",
                        category: "time",
                        dueDateClass: "",
                        start: new Date(appt.start_time),
                        end: new Date(appt.end_time),
                        bgColor: "red",
                        location: "Blocked",
                    })
                })
            }
        }

        generateTutorTimes();
    }, []);

    const generateTutorTimes = async () => {
        // Add previously schedule meeting to array
        let previousAppts = [{
            id: "1",
            calendarId: "0",
            // title: clientFlowData.appointmentSubjectId,
            title: "Tutor Time!",
            category: "time",
            dueDateClass: "",
            start: new Date(clientFlowData.appointmentStartTime),
            end: new Date(clientFlowData.appointmentEndTime),
            bgColor: "lightblue",
            location: clientFlowData.appointmentLocation,
        },];

        let appts = await api.GetTutorAppointments(clientFlowData.selectedTutor._id);

        if (appts !== null) {
            appts.data.forEach(appt => {
                previousAppts.push({
                    id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(),
                    calendarId: "0",
                    title: "Blocked Time",
                    category: "time",
                    dueDateClass: "",
                    start: new Date(appt.start_time),
                    end: new Date(appt.end_time),
                    bgColor: "red",
                    location: "Blocked",
                })
            })
        }

        return previousAppts;
    }

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
    const onAfterRenderSchedule = (e: any) => {};

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

        let startDay = scheduleData.start;
        let endDay = scheduleData.end;
        let apptLoc = scheduleData.location;
        let apptSubj = scheduleData.title;

        let apptDate = new Date(startDay._date).toDateString();

        let apptStart = startDay.getTime();
        let apptEnd = endDay.getTime();

        dispatch(actions.setAppointment([apptDate, apptStart, apptEnd, apptLoc, apptSubj]));
    };

    const onBeforeDeleteSchedule = (res: any) => {
        console.log("onBeforeDelete");
        const {id, calendarId} = res.schedule;
        cal.current.calendarInst.deleteSchedule(id, calendarId);
    };

    const onBeforeUpdateSchedule = (e: any) => {
        console.log("onBeforeDelete");

        const {schedule, changes} = e;

        cal.current.calendarInst.updateSchedule(
            schedule.id,
            schedule.calendarId,
            changes
        );

        let startDay = schedule.start;
        let endDay = schedule.end;
        let apptLoc = schedule.location;
        let apptSubj = schedule.title;

        let apptDate = new Date(startDay._date).toDateString();

        let apptStart = startDay.getTime();
        let apptEnd = endDay.getTime();

        dispatch(actions.setAppointment([apptDate, apptStart, apptEnd, apptLoc, apptSubj]));
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
        <Container>
            <Title>
                <h3 className="hr mt-1">Select a Time</h3>
            </Title>

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

            <div style={{overflow: 'auto'}}>
                <Calendar
                    height={"400px"}
                    ref={cal}
                    calendars={[
                        {
                            id: "0",
                            name: "Schedule",
                            bgColor: "#9e5fff",
                            borderColor: "#9e5fff",
                        },
                    ]}
                    view={currentView}
                    week={mobile ? mobileWeekOptions : weekOptions}
                    taskView={false}
                    scheduleView={["time"]}
                    useDetailPopup={true}
                    schedules={previousAppts}
                    onClickSchedule={onClickSchedule}
                    onBeforeCreateSchedule={onBeforeCreateSchedule}
                    onBeforeDeleteSchedule={onBeforeDeleteSchedule}
                    onBeforeUpdateSchedule={onBeforeUpdateSchedule}
                    onAfterRenderSchedule={onAfterRenderSchedule}
                />
            </div>
        </Container>
    );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  
  // DEBUG STYLES //
  //border: orange solid 5px;
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
