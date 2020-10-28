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
        <hr></hr>
      </Container>
    );
  }
}

export default Meetings;
