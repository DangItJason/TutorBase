import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Course, Appointment } from "../../services/api.types";
import { api } from "../../services/api";
import { selectTutorData } from "../../store/TutorData/selectors";
import { actions as tutorDataActions } from "../../store/TutorData/slice";
import { Container, Row, Col, Table, Tooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { BreakDownTime } from "../../services/tools";
import "./TutorOverview.css";

export function UnconfirmedMeetingExists(appts: Array<Appointment>): boolean {
    for(let i = 0; i < appts.length; i++) {
        if(!appts[i].confirmed)
            return true;
    }
    return false;
}

export function GetAppointmentsWithinRange(appts: Array<Appointment>, start_date: Date, end_date: Date): Array<Appointment> {
    return appts.filter((appt) => {
        let checkDate = new Date(appt.start_time);
        return checkDate.getTime() >= start_date.getTime() && checkDate.getTime() <= end_date.getTime();
    });
}

export function GetDailyAppointments(appts: Array<Appointment>, date: Date): Array<Appointment> {
    let dayBegin = new Date();
    let dayEnd = new Date();

    dayBegin.setDate(date.getDate());
    dayEnd.setDate(date.getDate());
    dayBegin.setHours(0, 0, 0, 1);
    dayEnd.setHours(23, 59, 59, 99);

    return GetAppointmentsWithinRange(appts, dayBegin, dayEnd);
}

export function GetWeeklyAppointments(appts: Array<Appointment>, date: Date): Array<Appointment> {
    let day = date.getDay();
    let firstWeekDay = new Date();
    let lastWeekDay = new Date();

    firstWeekDay.setDate(date.getDate() - day);
    firstWeekDay.setHours(0, 0, 0, 1);
    lastWeekDay.setDate(date.getDate() + (7 - day) - 1);
    lastWeekDay.setHours(23, 59, 59, 99);

    return GetAppointmentsWithinRange(appts, firstWeekDay, lastWeekDay);
}

// Gets the week that the provided day is a part of. Weeks are assumed to be Sunday - Saturday.
// The return key is a day of the week (e.g. Sunday) and the value is the date (e.g. 10/10/2021)
export function GetWeekMap(date: Date): Map<Number, Date> {
    let weekMap = new Map<Number, Date>();
    let day = date.getDay();
    
    for(let i = 0; i < 7; i++) {
        let new_date = new Date();
        if(i < day + 1) {
        // if(i < day + 1) {
            // new_date.setDate(date.getDate() - (day - i) - 1);
            new_date.setDate(date.getDate() - (day - i));
        } else if(i === day) {
            new_date = new Date(date);
        } else {
            new_date.setDate(date.getDate() + (i - day));
            // new_date.setDate(date.getDate() + (i - day) - 1);
        }
        weekMap.set(i, new_date);
    }

    return weekMap;
}

export const TutorOverview = () => {
    let tutorData = useSelector(selectTutorData);
    let dispatch = useDispatch();

    let [tooltipsOpen, setTooltipsOpen] = useState<Array<boolean>>([false, false, false, false, false, false, false]);
    let [weeklyAppointments, setWeeklyAppointments] = useState<Array<Appointment>>([]);
    let [tutorCourses, setTutorCourses] = useState<Array<Course>>([]);

    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let currDate = useMemo(() => {return new Date()}, [])
    let currWeekMap = GetWeekMap(currDate);

    useEffect(() => {
        const getTutorAppointments = async () => {
            return (await api.GetTutorAppointments(tutorData.tutorId)).data;
        }

        getTutorAppointments().then(value => {
                setWeeklyAppointments(GetWeeklyAppointments(value, currDate));
                dispatch(tutorDataActions.setAppointment(value));
            }
        )
    }, [currDate, tutorData.tutorId, dispatch]);

    useEffect(() => {
        const getTutorCourses = async () => {
            return (await api.GetCoursesByTutorId(tutorData.tutorId)).data;
        }

        getTutorCourses().then(value => {
                setTutorCourses(value);
                dispatch(tutorDataActions.setCourses(value));
            }
        )
    }, [tutorData.tutorId, dispatch]);

    return (
        <Container className="overview" fluid>
            <Row className="title" style={{ marginTop: '25px'}}>
                <div className="profile-text">Overview</div>
            </Row>

            <hr></hr>

            <Row>
                <Col className="courses-col" md={6}>
                    <Row className="title" style={{ marginTop: '25px'}}>
                        <h2>Courses</h2>
                    </Row>
                    <Container className="table-container">
                        <Table className="table-striped">
                            <tbody>
                                {tutorCourses.map((course, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className="td-bold">{course.name}</td>
                                            </tr>
                                        );
                                    }
                                )}
                                {tutorCourses.length > 0 ? <></> :
                                    <tr><td className="td-bold">No courses found!<br/>Change which courses you plan to tutor from the Settings page.</td></tr>
                                }
                            </tbody>
                        </Table>
                    </Container>
                </Col>
                <Col className="weekly-sched-col" md={6}>
                    <Row className="title" style={{ marginTop: '25px'}}>
                        <h2>Weekly Tutoring Schedule</h2>
                    </Row>
                    <Container className="table-container">
                        <Table className="table-striped">
                            <tbody>
                                {Array.from(Array(7).keys()).map(day => {
                                    let date = currWeekMap.get(day);
                                    if(date !== undefined) {
                                        let date_time = BreakDownTime(date.toISOString());
                                        let daily_appointments = GetDailyAppointments(weeklyAppointments, date);
                                        let unconfirmed = UnconfirmedMeetingExists(daily_appointments);
                                        return (
                                            <tr key={day}>
                                                <td className="td-bold">{daysOfWeek[day]}, {date_time[0].split(",")[0]}</td>
                                                <td>
                                                    {daily_appointments.length > 0 ? daily_appointments.length : "No"} Meetings
                                                    {unconfirmed ? 
                                                    <span className="sched-pending">
                                                        <FontAwesomeIcon id={"pending-icon-"+day} icon={faQuestionCircle}/>
                                                        <Tooltip placement="top" isOpen={tooltipsOpen[day]} target={"pending-icon-"+day} toggle={() => {
                                                            let tooltipsOpenCopy = [...tooltipsOpen];
                                                            tooltipsOpenCopy[day] = !tooltipsOpen[day];
                                                            setTooltipsOpen(tooltipsOpenCopy); 
                                                        }}>
                                                            You have one or more unconfirmed meetings on this day.
                                                        </Tooltip>
                                                    </span> : <></>}
                                                </td>
                                            </tr>
                                        );
                                    } else {
                                        return <></>;
                                    }
                                })}
                            </tbody>
                        </Table>
                    </Container>
                </Col>
            </Row>

        </Container>
    );
}