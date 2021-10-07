import React, { useState } from "react";
import { Container,Card, Button, CardTitle, CardText, Row, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import CountUp from 'react-countup';
import TutorHeatmap from "./components/TutorHeatmap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";



export const DataVisualization = () => {
  const [chart, setChart] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Container fluid className="background" style={{marginBottom:'10em'}}>
        <Row className="title" >
          <div className="profile-text" style={{marginTop:'0.5em'}}>Profile Data</div>
        </Row>
        <hr></hr>
        <Row xs="2" className="parent">

        </Row>
        <div style={{display:'flex', flexDirection:'row'}}>
                <div style={{display:'flex', flexDirection:'column', flex:'1 1 0px'}}>
                    <Card body>
                    <CardTitle tag="h5">Hours Tutored</CardTitle>
                    <CardText>
                        <h1>
                        <CountUp 
                            end={68} 
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
                <CardTitle tag="h5">Hours Tutored
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle caret>
                        Select Chart <FontAwesomeIcon icon={faArrowDown} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Tutor Hours</DropdownItem>
                        <DropdownItem onClick={() => setChart(0)}>Heatmap</DropdownItem>
                        
                        <DropdownItem onClick={() => setChart(1)}>Hours Line</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Bar Action</DropdownItem>
                        <DropdownItem>Quo Action</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    </CardTitle>
                    <CardText>
                      {chart == 0 ?
                        <TutorHeatmap />
                        : <div>
                          Coming soon
                          </div>}
                      
                      
                    </CardText>
                    
              </Card>
            </div>
            </Container>
    );
}

export default DataVisualization;