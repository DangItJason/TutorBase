import { applyMiddleware } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./meetings.css";

class Meetings extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      dropdownOpen: false,
      dropdownValue: "Completed",
      //Dummy data until express routes are implemented
      appointments: [ 
          {
              'name' : 'Jason',
              'color' : 'success',
          },
          {
              'name' : 'Jeremy',
              'color' : 'warning',
          }
          ,
          {
              'name' : 'David',
              'color' : 'danger',
          }
        ]
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  changeValue(e) {
    this.setState({
      dropDownValue: e.currentTarget.textContent,
      dropdownOpen: !this.state.dropdownOpen,
    });
  }


  render() {
    return (
      <Container fluid>
        <Row className="title">
          <div class="profile-text">Settings</div>
        </Row>
        
        <hr></hr>

        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret color="secondary" outline>
            {this.state.dropDownValue}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <div onClick={this.changeValue}>Completed</div>
            </DropdownItem>
            <DropdownItem>
              <div onClick={this.changeValue}>Pending</div>
            </DropdownItem>
            <DropdownItem>
              <div onClick={this.changeValue}>Upcoming</div>
            </DropdownItem>
            <DropdownItem>
              <div onClick={this.changeValue}>Declined</div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <ListGroup>
            {this.state.appointments.map(appointment => (
                    <ListGroupItem color={appointment.color} className="item">
                        {appointment.name}
                    </ListGroupItem>
                ))}
        </ListGroup>
      </Container>
    );
  }
}

export default Meetings;
