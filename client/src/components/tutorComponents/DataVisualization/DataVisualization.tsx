import React, { ReactElement, useEffect, useState } from "react";
import { Container,Card, Button, CardTitle, CardText, Row, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import CountUp from 'react-countup';
import TutorHeatmap from "./components/TutorHeatmap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { stringify } from "querystring";
import HoursLine, { LineGraph } from "./components/LineGraph";
import { api } from "../../../services/api";
import { IAppointmentEndpoint } from "../../../services/api.types";
import { JsxElement } from "typescript";
import { useSelector } from "react-redux";
import { selectClientData } from "../../../store/ClientData/selectors";

function getNow() {
  let currentYear:Date = new Date();
    currentYear.setHours(0);
    currentYear.setMinutes(0);
    currentYear.setSeconds(0);
    currentYear.setMilliseconds(0);
    return currentYear;
}
async function GetTutoringHours(course:string, tutorID: string): Promise<[Map<number,number>, Map<number,number>, number, number, number, Array<string>]> {
  let meetingsMap : Map<number,number> = new Map<number,number>();
  let moneyMap : Map<number, number> = new Map<number, number>();
  let coursesSet : Set<string> = new Set<string>();
  let currentYear:Date = getNow();
  let date = new Date(currentYear);
  date.setFullYear(2020);
  date.setDate(0);
  date.setMonth(0);
  let hrs = 0;
  let apts = 0;
  let earnings = 0;
  const value = await api.GetTutorAppointmentsWithData(tutorID);
    let appointmentsList:Array<IAppointmentEndpoint> = [];
    if (!value)
      console.error("Error Fetching Past Appointments.");
    else 
      appointmentsList = value.data;
    for (let i = 0; i < appointmentsList.length; i++) {
      
      let appointment = appointmentsList[i];
      coursesSet.add(appointment.course_id);
      if (course !== "All Courses" && course !== appointment.course_id)
        continue;
      
      let start = new Date(appointment.start_time);
      start.setMinutes(start.getMinutes());

      // This assumes end_time is stored in milliseconds currently some times in database are microseconds
      let length = (appointment.end_time - start.getTime()) / 1000 / 60 / 60; // Length in hours of session
      if (length > 24) continue; // improper dates in database
      hrs += length;
      apts += 1;
      earnings += appointment.price;
      let dateKey = getNow();
      dateKey.setFullYear(start.getFullYear());
      dateKey.setMonth(start.getMonth());
      dateKey.setDate(start.getDate());
      if (meetingsMap.has(dateKey.getTime())) {
        meetingsMap.set(dateKey.getTime(), (meetingsMap.get(dateKey.getTime())! + length));
        moneyMap.set(dateKey.getTime(), (moneyMap.get(dateKey.getTime())! + appointment.price));
      }
      else {
        meetingsMap.set(dateKey.getTime(), length);
        moneyMap.set(dateKey.getTime(), appointment.price);
      }
    }

    
  return [meetingsMap, moneyMap, hrs, apts, earnings, Array.from(coursesSet.values())];
}
export const DataVisualization = () => {
  
  const [dropdownLabel2, setDropdownLabel2] = useState("All Time");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [dropdownOpen3, setDropdownOpen3] = useState(false);
  const [dateRange, setDateRange] = useState(new Date(2020,0,0));
  const [course, setCourse] = useState("All Courses");
  const [courses, setCourses] = useState(new Array<string>());
  const [appointments, setAppointments] = useState(0);
  const [hours, setHours] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [chart, setChart] = useState(0);
  const [meetingsMap, setMeetingsMap] = useState(new Map<number,number>());
  const [earningsMap, setEarningsMap] = useState(new Map<number,number>());
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const toggle2 = () => setDropdownOpen2(prevState => !prevState);
  const toggle3 = () => setDropdownOpen3(prevState => !prevState);
  let tutor = useSelector(selectClientData);
  let tutorID = tutor.clientId;
  useEffect(() => {
    GetTutoringHours(course, tutorID).then( apiResult => {
    setMeetingsMap(apiResult[0]);
    setEarningsMap(apiResult[1]);
    setAppointments(apiResult[3]);
    setHours(apiResult[2]);
    setEarnings(apiResult[4]);
    setCourses(apiResult[5]);
    });
  },[]);



  let coursesDropdowns:Array<ReactElement> = [];
  coursesDropdowns.push(<DropdownItem onClick={() => {
    setCourse("All Courses");
    GetTutoringHours("All Courses", tutorID).then( apiResult => {
      setMeetingsMap(apiResult[0]);
      setEarningsMap(apiResult[1]);
      setAppointments(apiResult[3]);
      setHours(apiResult[2]);
      setEarnings(apiResult[4]);
      setCourses(apiResult[5]);
      });
  }}>
    All Courses
  </DropdownItem>);
  for (let i = 0; i < courses.length; i++) {
    coursesDropdowns.push(<DropdownItem onClick={() => {
      setCourse(courses[i]);
      GetTutoringHours(courses[i], tutorID).then( apiResult => {
        setMeetingsMap(apiResult[0]);
        setEarningsMap(apiResult[1]);
        setAppointments(apiResult[3]);
        setHours(apiResult[2]);
        setEarnings(apiResult[4]);
        setCourses(apiResult[5]);
        });
    }}>
      {courses[i]}
    </DropdownItem>);         
  }
    return (
        <Container fluid className="background" style={{marginBottom:'10em'}}>
        <hr></hr>
        <Row xs="2" className="parent">

        </Row>
        <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                <div style={{display:'flex', flexDirection:'column', flex:'1 1 0px', flexWrap:'wrap'}}>
                    <Card body>
                    <CardTitle tag="h5">Appointments</CardTitle>
                    <CardText>
                        <h1>
                        <CountUp 
                            end={appointments} 
                            useEasing={true}
                            duration={3.5}
                            />
                            </h1>
                        </CardText>
                    
                    </Card>
                </div>
                <div style={{display:'flex', flexDirection:'column', flex:'1 1 0px', flexWrap:'wrap'}}>
                    <Card body>
                    <CardTitle tag="h5">Hours Tutored</CardTitle>
                    <CardText>
                        <h1>
                        <CountUp 
                            end={hours} 
                            useEasing={true}
                            duration={4}
                            />
                            </h1>
                        </CardText>
                    
                    </Card>
                </div>
                <div style={{display:'flex', flexDirection:'column', flex:'1 1 0px', flexWrap:'wrap'}}>
                <Card body>
                    <CardTitle tag="h5">Earnings</CardTitle>
                    <CardText>
                        <h1>
                        <CountUp 
                            decimals={2}
                            prefix="$"
                            end={earnings} 
                            useEasing={true}
                            

                            duration={4}/>
                            </h1>
                        </CardText>
                    
                    </Card>
                </div>
            </div>
        
            <div style={{display:'flex', flexDirection:'row'}}>
            <Card body>
                <CardTitle tag="h5">
                <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                  <div style={{display:'flex', flexDirection:'column', marginRight:'1em', marginTop:'0.25em'}}>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle caret>
                        {(chart === 0) ? "Calendar" : (chart === 1 ? "Total Hours" : "Total Earnings")}
                        
                        <FontAwesomeIcon icon={faArrowDown} style={{marginLeft:'1em'}}/>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Tutor Data</DropdownItem>
                        <DropdownItem onClick={() => setChart(0)}>Calendar</DropdownItem>
                        <DropdownItem onClick={() => setChart(1)}>Total Hours</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => setChart(2)}>Total Earnings</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                    { chart != 0 ?
                    <div style={{display:'flex', flexDirection:'column', marginRight:'1em', marginTop:'0.25em'}}>
                    <Dropdown isOpen={dropdownOpen2} toggle={toggle2} style={{alignSelf:'right'}}>
                      <DropdownToggle caret>
                        {dropdownLabel2}
                        <FontAwesomeIcon icon={faArrowDown} style={{marginLeft:'1em'}}/>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Date Range</DropdownItem>
                        <DropdownItem onClick={() => {
                          let date = new Date(getNow());
                          date.setFullYear(2020);
                          date.setMonth(0);
                          date.setDate(0);
                          setDateRange(date);
                          setDropdownLabel2("All Time");
                        }}>
                          All Time
                        </DropdownItem>
                        
                        <DropdownItem onClick={() => {
                              let date = new Date(getNow());
                              date.setFullYear(date.getFullYear() - 1);
                              setDateRange(date);
                              setDropdownLabel2("1Y");

                            }}>1Y
                        </DropdownItem>

                        <DropdownItem onClick={() => { 
                              let date = new Date(getNow()); 
                              date.setMonth(date.getMonth() - 6);
                              setDateRange(date);
                              setDropdownLabel2("6M");
                            }}>6M
                        </DropdownItem>
                        <DropdownItem onClick={() => { 
                              let date = new Date(getNow()); 
                              date.setMonth(date.getMonth() - 1);
                              setDateRange(date);
                              setDropdownLabel2("1M");
                            }}>1M
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    </div>
                    : <div></div>}
                    <div style={{display:'flex', flexDirection:'column', marginTop:'0.25em'}}>
                      <Dropdown isOpen={dropdownOpen3} toggle={toggle3} style={{alignSelf:'right'}}>
                      <DropdownToggle caret>
                        {course}
                        <FontAwesomeIcon icon={faArrowDown} style={{marginLeft:'1em'}}/>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Filter by Course</DropdownItem>
                        {coursesDropdowns}
                      </DropdownMenu>
                    </Dropdown>
                    </div>
                    </div>
                    </CardTitle>
                    
                    <CardText>
                      {chart == 0 ?
                        <TutorHeatmap dateMap={meetingsMap} />
                        : (chart == 1 ? <LineGraph dateMap={meetingsMap}
                          fromTime={dateRange}
                          isHours={true}/>
                          :<LineGraph dateMap={earningsMap}
                          fromTime={dateRange}
                          isHours={false}/>
                          )}
                      
                      
                    </CardText>

                    
              </Card>
            </div>
            </Container>
    );
}

export default DataVisualization;