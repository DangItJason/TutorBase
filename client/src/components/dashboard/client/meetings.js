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
import MeetingCard from "../../meetingCard/MeetingCard";

class Meetings extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      dropdownOpen: false,
      dropdownValue: "All",
      appointments: [],
    };
  }

  componentDidMount() {
    this.setState({
      appointments: [
        {
          name: "Jason Nguyen",
          color: "Completed",
          location: "Barton",
          time: "2PM-4PM",
        },
        {
          name: "Jeremy Weiss",
          color: "Pending",
          location: "Union",
          time: "12PM-4PM",
        },
        {
          name: "David Yao",
          color: "Upcoming",
          location: "DCC 308",
          time: "10AM-8PM",
        },
        {
          name: "Jacob Zamani",
          color: "Denied",
          location: "Off-Campus",
          time: "8PM-10PM",
        },
      ],
    });

    var url = "http://localhost:9000/catalog";
    var headers = {
      "Content-Type": "application/json",
    };
    fetch(url, { method: "GET", headers: headers })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((appointments) => {
        console.log(appointments);
        this.setState({appointments: appointments})
      });
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  changeValue = (e) => {
    this.setState(
      {
        dropdownValue: e.target.innerText,
        dropdownOpen: !this.state.dropdownOpen,
      },
      () => console.log("DropDownValue: " + this.state.dropdownValue)
    );
  };

  render() {
    const appointments = this.state.appointments;
    const dropDownValue = this.state.dropdownValue;

    const filteredDropdown = appointments.filter(
      (appointment) =>
        appointment.color === dropDownValue || dropDownValue === "All"
    );

    return (
      <Container fluid>
        <Row className="title">
          <div class="profile-text">Meetings</div>
        </Row>

        <hr></hr>

        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret color="secondary" outline>
            {this.state.dropdownValue}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.changeValue}>All</DropdownItem>
            <DropdownItem onClick={this.changeValue}>Completed</DropdownItem>
            <DropdownItem onClick={this.changeValue}>Pending</DropdownItem>
            <DropdownItem onClick={this.changeValue}>Upcoming</DropdownItem>
            <DropdownItem onClick={this.changeValue}>Denied</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {filteredDropdown.map((appointment) => (
          <MeetingCard appointment={appointment} />
        ))}
      </Container>
    );
  }
}

export default Meetings;
