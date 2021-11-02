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
import {Tutor,Course,Appointment, TutorTimes, AppointmentsResponse, CoursesResponse, SubjectsResponse, TutorsResponse} from "../../services/api.types";
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
    schedule:TutorTimes,
    temp_schedule:TutorTimes,
    added_times:TutorTimes,
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
          schedule: {
            Sunday: [],
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: []
        },
          temp_schedule:  {
            Sunday: [],
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: []
        },
          added_times: {
            Sunday: [],
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: []
        },
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
            obj_id: tutor._id,
            price: parseInt(tutor.price),
            temp_price: parseInt(tutor.price),
            schedule:tutor.times,
            temp_schedule:tutor.times,
            first_name: tutor.first_name,
            temp_firstn: tutor.first_name,
            last_name: tutor.last_name,
            temp_lastn: tutor.last_name,
            meeting_interval: parseInt(tutor.interval),
            temp_meeting_interval: parseInt(tutor.interval),
            profile_pic:tutor.profile_img,


          
          })
        });


    
          fetch("http://localhost:9000/api/courses",  {
            method: "GET",
            headers: {"Content-Type": "application/json"}
          }).then(res => {
              console.log(res);
              return res.json()
            }).then((courses:Course[]) => {

              this.setState({course_catalog: courses.map((course:Course) => course.name) })
              
            });
      
    }

    componentDidUpdate(prevProps:iSettingsProps, prevState:iSettingsState){

      if (prevState.obj_id !== this.state.obj_id){
        fetch(`http://localhost:9000/api/courses/tutor/${this.state.obj_id}`,  {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        }).then(res => {
            console.log(res);
            return res.json()
          }).then(courses => {
            this.setState({ courses: courses, temp_courses: courses })
          });
      }

    }

    handleFirstChange = (e:React.FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      this.setState({temp_firstn: target.value});
    };

    handleLastChange = (e:React.FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      this.setState({temp_lastn: target.value});
    }
    saveNameChange = (e:React.FormEvent<HTMLButtonElement>) => {
      fetch("http://localhost:9000/api/tutors/tutor", {
        method: "PUT",
        body: JSON.stringify({userid: this.state.obj_id, first_name: this.state.temp_firstn, last_name: this.state.temp_lastn}),
        headers: {"Content-Type": "application/json"}
      }).then(res=>{
        this.setState({first_name: this.state.temp_firstn, last_name: this.state.temp_lastn})
      });
      
      this.toggleNameModal(e);
    }
    
    toggleNameModal = (e:React.FormEvent<HTMLElement>) => {
      e.preventDefault();
      this.setState({ name_modal: !this.state.name_modal })
    };

    cancelNameChange = (e:React.FormEvent<HTMLElement>) => {
      this.setState({ temp_firstn: this.state.first_name });
      this.setState({ temp_lastn: this.state.last_name });
      this.toggleNameModal(e);
    }
    handlePriceChange = (value:Number) => {
      this.setState({ temp_price: value })
    }

    savePriceChange = (e:React.FormEvent<HTMLButtonElement>) => {
      
      fetch("http://localhost:9000/tutor-operations/price", {
        method: "PUT",
        body: JSON.stringify({email: this.state.email, price: this.state.temp_price}),
        headers: {"Content-Type": "application/json"},
      }).then(res=>{this.setState({ price: this.state.temp_price })});
      this.togglePriceModal(e);
    }

    togglePriceModal = (e:React.FormEvent<HTMLElement>) => {
      e.preventDefault();
      this.setState({ price_modal: !this.state.price_modal })
    };

    toggleCoursesModal = (e:React.FormEvent<HTMLElement>) => {
      e.preventDefault();
      this.setState({ courses_modal: !this.state.courses_modal })
    };
  
    toggleScheduleModal = (e:React.FormEvent<HTMLElement>) => {
      e.preventDefault();
      this.setState({ schedule_modal: !this.state.schedule_modal })
    };

    render(): JSX.Element{
      
        return(<div></div>)
    }

}

export default Settings;