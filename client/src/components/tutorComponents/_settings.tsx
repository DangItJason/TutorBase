import React, { Component } from "react";
import classNames from "classnames";
import { Container, Row, Col, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, InputGroup, Input, Alert, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faBan, faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Slider from 'react-rangeslider';
import Autocomplete from 'react-autocomplete';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import * as R from 'ramda';
import {Tutor,Course,Appointment, AppointmentsResponse, CoursesResponse, SubjectsResponse, TutorsResponse} from "../../services/api.types";
import 'react-rangeslider/lib/index.css';
import "./settings.css";
import 'rc-time-picker/assets/index.css';
//const rambda = require('rambda');

interface iSettingsProps {

}

interface iSettingsState {
    first_name: String,
    last_name: String,
    temp_firstn: String,
    temp_lastn:String,
    email:String,
    obj_id:String,
    profile_pic:String,
    description: String,
    temp_description: String,
    price: Number,
    temp_price: Number,
    course_catalog: String[],
    meeting_interval: Number,
    temp_meeting_interval:Number,
    courses:Course[],
    temp_courses:Course[],
    added_courses:Course[],
    schedule:Appointment[][],
    temp_schedule:Appointment[][],
    added_times:Appointment[][],
    schedule_tab:Number,
    price_modal:Boolean,
    name_modal: Boolean,
    courses_modal: Boolean,
    add_course_err: Boolean,
    add_course_err_msg: String,
    desc_modal: Boolean,
    interval_modal: Boolean,
    schedule_modal: Boolean,
    add_time_err: Boolean,
    add_time_err_msg: String


}

class Settings extends Component<iSettingsProps,iSettingsState> {

    constructor(props: iSettingsProps) {
        super(props);
        this.state = {
          first_name: "Jason",
          last_name: "Nguyen",
          temp_firstn: "",
          temp_lastn: "",
          email: "test2@gmail.com",
          obj_id: "5f89d834aa18dfd7e932967d",
          profile_pic: "",
          description: "",
          temp_description: "",
          price: 55,
          temp_price: 55,
          course_catalog: [],
          meeting_interval: 30,
          temp_meeting_interval: 30,
          courses: [],
          temp_courses: [],
          added_courses: [],
          schedule: [[], [], [], [], [], [], []],
          temp_schedule:  [[], [], [], [], [], [], []],
          added_times: [[], [], [], [], [], [], []],
          schedule_tab: 0,
          price_modal: false,
          name_modal: false,
          courses_modal: false,
          add_course_err: false,
          add_course_err_msg: "",
          desc_modal: false,
          interval_modal: false,
          schedule_modal: false,
          add_time_err: false,
          add_time_err_msg: ""
        } as iSettingsState;
      }

    componentDidMount() {
      fetch(`localhost:9000/api/tutors?email=${this.state.email}`,  {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      }).then(res => {
         console.log(res);
          return res.json()
        }).then( (tutor: Tutor)  => {
          this.setState({ 
            price: parseInt(tutor.price),
            temp_price: parseInt(tutor.price) })
        });
      

      // fetch("http://localhost:9000/tutor-operations/price/" + this.state.email,  {
      //   method: "GET",
      //   headers: {"Content-Type": "application/json"},
      // }).then(res => {
      //    console.log(res);
      //     return res.json()
      //   }).then(price => {
      //     this.setState({ price: price, temp_price: price })
      //   });
    }
    render(): JSX.Element{

        return(<div></div>)
    }

}

export default Settings;