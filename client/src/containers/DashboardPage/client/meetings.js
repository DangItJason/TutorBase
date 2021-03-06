import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../../store/clientData";
import { Container, Row, ListGroup, ListGroupItem } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./meetings.css";
import MeetingCard from "../../../components/meetingCard/MeetingCard";

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
    this.props.clearAppointments()
    var url = "http://localhost:9000/api/appointment/clients/" + this.props.data.clientId;
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(url, requestOptions)
    .then((res) => res.json())
    .then((appointments) => {
      appointments.map((appointment) =>
        this.props.addAppointments(appointment)
      );
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
        dropdownOpen: false,
      },
      () => console.log("DropDownValue: " + this.state.dropdownValue)
    );
  };

  render() {
    const appointments = this.props.data.appointments;
    const dropDownValue = this.state.dropdownValue;

    // const filteredDropdown = appointments.filter(
    //   (appointment) =>
    //     appointment.color === dropDownValue || dropDownValue === "All"
    // );

    return (
      <Container fluid>
        <Row className="title" style={{ marginTop: '25px'}}>
          <div class="profile-text">Meetings</div>
        </Row>

        <hr></hr>

        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret >
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

        {/* <Container fluid className="card-container">
          {filteredDropdown.map((appointment, index) => (
            <MeetingCard key={index} appointment={appointment} />
          ))}
        </Container> */}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { clientData } = state;
  return { data: clientData };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAppointments: (state, action) => dispatch(actions.setAppointments(state, action)),
    clearAppointments: (state) => dispatch(actions.clearAppointments(state)),
    addAppointments: (state, action) => dispatch(actions.addAppointments(state, action)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Meetings);
