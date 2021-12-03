import React, { useState } from "react";
import { Container, Row, Col, Table, Tooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { BreakDownTime, GetWeekMap } from "../../services/tools";
import "./TutorOverview.css";

export const TutorOverview = () => {
    let [tooltipsOpen, setTooltipsOpen] = useState<Array<boolean>>([false, false, false, false, false, false, false]);

    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let currWeekMap = GetWeekMap(new Date());

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
                    <Row>

                    </Row>
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
                                    if(date != undefined) {
                                        let date_time = BreakDownTime(date.toISOString());
                                        return (
                                            <tr key={day}>
                                                <td className="sched-date">{daysOfWeek[day]}, {date_time[0].split(",")[0]}</td>
                                                <td>1 Meeting
                                                    <span className="sched-pending">
                                                        <FontAwesomeIcon id={"pending-icon-"+day} icon={faQuestionCircle}/>
                                                        <Tooltip placement="top" isOpen={tooltipsOpen[day]} target={"pending-icon-"+day} toggle={() => {
                                                            let tooltipsOpenCopy = [false, false, false, false, false, false, false];
                                                            tooltipsOpenCopy[day] = !tooltipsOpen[day];
                                                            setTooltipsOpen(tooltipsOpenCopy); 
                                                        }}>
                                                            You have one or more unconfirmed meetings on this day.
                                                        </Tooltip>
                                                    </span>
                                                </td>
                                            </tr>
                                        );
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