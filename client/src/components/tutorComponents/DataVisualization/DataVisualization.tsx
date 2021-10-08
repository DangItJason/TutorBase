import React, { useState } from "react";
import { Container,Card, Button, CardTitle, CardText, Row, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import CountUp from 'react-countup';
import TutorHeatmap from "./components/TutorHeatmap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { stringify } from "querystring";
import HoursLine from "./components/HoursLine";

// Get Tutor history from endpoint and fill map and array of data to visualize
function GetTutoringHours() {
  let meetingsMap : Map<number,number> = new Map<number,number>();
  let date = new Date(2020,9,7, 0, 0, 0, 0);
  let hrs = 0;
  let apts = 0;
  while (date.getTime() < new Date().getTime()) {
    let aptlength = Math.round(Math.random()*40)/10; // API call here
    meetingsMap.set(date.getTime(), aptlength);
    date.setDate(date.getDate()+Math.ceil(Math.random()*4));
    apts += 1;
    hrs += aptlength;
  }
  return [meetingsMap, hrs, apts];
}

export const DataVisualization = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  let apiResult :[Map<number,number>, number, number] = GetTutoringHours() as [Map<number,number>, number, number];
  
  let meetingsMap : Map<number,number> = apiResult[0];
const [appointments, setAppointments] = useState(apiResult[2]);
const [hours, setHours] = useState(apiResult[1]);
const [earnings, setEarnings] = useState(apiResult[1] * 15);
  const [chart, setChart] = useState(0);
  
    return (
        <Container fluid className="background" style={{marginBottom:'10em'}}>
        <hr></hr>
        <Row xs="2" className="parent">

        </Row>
        <div style={{display:'flex', flexDirection:'row'}}>
                <div style={{display:'flex', flexDirection:'column', flex:'1 1 0px'}}>
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
                <div style={{display:'flex', flexDirection:'column', flex:'1 1 0px'}}>
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
                <div style={{display:'flex', flexDirection:'column', flex:'1 1 0px'}}>
                <Card body>
                    <CardTitle tag="h5">Earnings</CardTitle>
                    <CardText>
                        <h1>
                        <CountUp 
                            decimals={2}
                            prefix="$"
                            end={1426.25} 
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
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle caret>
                        {(chart === 0) ? "Calendar" : (chart === 1 ? "Total Hours" : "")}
                        
                        <FontAwesomeIcon icon={faArrowDown} style={{marginLeft:'1em'}}/>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Tutor Data</DropdownItem>
                        <DropdownItem onClick={() => setChart(0)}>Calendar</DropdownItem>
                        <DropdownItem onClick={() => setChart(1)}>Total Hours</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem divider />
                        <DropdownItem disabled style={{color:'gray'}}>Total Earnings</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    </CardTitle>
                    <CardText>
                      {chart == 0 ?
                        <TutorHeatmap dateMap={meetingsMap} />
                        : <HoursLine dateMap={meetingsMap}/>}
                      
                      
                    </CardText>
                    
              </Card>
            </div>
            </Container>
    );
}

export default DataVisualization;