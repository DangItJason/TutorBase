import React, { Component } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faLeaf } from "@fortawesome/free-solid-svg-icons";
import "./meetings.css";

class Meetings extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.state = {
            dropdownOpen: false,
            dropdownValue: "",
        }
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        })
    }

    changeValue(e) {
        this.setState({ 
            dropDownValue: e.currentTarget.textContent,
            dropdownOpen: !this.state.dropdownOpen
         })
    }

    render() {
        return (
            <Container fluid>
                <Row className="title">
                    <div class="profile-text">Settings</div>
                </Row>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        {this.state.dropDownValue}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header><div onClick={this.changeValue} >Completed</div></DropdownItem>
                        <DropdownItem header><div onClick={this.changeValue} >Pending</div></DropdownItem>
                        <DropdownItem header><div onClick={this.changeValue} >Upcoming</div></DropdownItem>
                        <DropdownItem header><div onClick={this.changeValue} >Declined</div></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <hr></hr>

            </Container>
        )
    }
}

export default Meetings;