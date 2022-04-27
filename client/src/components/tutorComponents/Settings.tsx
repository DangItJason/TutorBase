import React, { Component } from "react";
import classNames from "classnames";
import { Container, Row, Col, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, InputGroup, Input, Alert, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faBan, faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import {ProfilePicModal,IProfilePicModalProps} from './ProfilePicModal'
import { TutorDataSlice } from "../../store/TutorData/types";
import { ClientDataSlice } from "../../store/ClientData/types";
import { connect } from 'react-redux';
import Slider from 'react-rangeslider';
import Autocomplete from 'react-autocomplete';
import defaultUser from "../../assets/default_user.png";
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import Cookies from "js-cookie";
import R from 'ramda';
import {Tutor,Course,Appointment, TutorTimes, AppointmentsResponse, CoursesResponse, SubjectsResponse, TutorsResponse} from "../../services/api.types";
import 'react-rangeslider/lib/index.css';
import "./settings.css";
import 'rc-time-picker/assets/index.css';

interface iSettingsProps {
  clientData:ClientDataSlice,
  tutorData: TutorDataSlice
}

interface iSettingsState {
    first_name: string,
    last_name: string,
    temp_firstn: string,
    temp_lastn:string,
    email:string,
    obj_id:string,
    profile_pic:string,
    description: string,
    temp_description: string,
    price: number,
    temp_price: number,
    course_catalog: Course[],
    meeting_interval: number,
    temp_meeting_interval:number,
    courses:Course[],
    temp_courses:Course[],
    added_courses:string[],
    schedule:TutorTimes,
    temp_schedule:TutorTimes,
    added_times:TutorTimes,
    schedule_tab:number,
    price_modal:boolean,
    name_modal: boolean,
    courses_modal: boolean,
    add_course_err: boolean,
    add_course_err_msg: string,
    desc_modal: boolean,
    interval_modal: boolean,
    schedule_modal: boolean,
    add_time_err: boolean,
    add_time_err_msg: string,
    imgModalOpen:boolean,
    croppedImg:string


}

//to-do: connect to Redux store Client + Tutor Data slice
class Settings extends Component<iSettingsProps,iSettingsState> {

    constructor(props: iSettingsProps) {
        super(props);
        const userid = Cookies.get('userid');
        this.state = {
          first_name: "Jason",
          last_name: "Nguyen",
          temp_firstn: "",
          temp_lastn: "",
          email: "test2@gmail.com",
          obj_id: userid || "61a5a9bbc73a5d336d8d0b74",
          profile_pic: "",
          description: "Typescript port",
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
        } as TutorTimes,
          temp_schedule:  {
            Sunday: [],
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: []
        } as TutorTimes,
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
          add_time_err_msg: "",
          imgModalOpen:false,
          croppedImg:""
        } as iSettingsState;
       
      }

    componentDidMount() {
      fetch(`http://localhost:9000/api/tutors/${this.state.obj_id}`,  {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      }).then(res => {
          return res.json()
        }).then( (tutorArray: Tutor[])  => {
          const tutor = tutorArray[0];
          
          this.setState({ 
            price: parseInt(tutor.price),
            temp_price: parseInt(tutor.price),
            schedule: R.clone(tutor.times),
            temp_schedule:R.clone(tutor.times),
            first_name: tutor.first_name,
            temp_firstn: tutor.first_name,
            last_name: tutor.last_name,
            temp_lastn: tutor.last_name,
            meeting_interval: parseInt(tutor.interval),
            temp_meeting_interval: parseInt(tutor.interval),
            profile_pic:tutor.profile_img || defaultUser,
            description: tutor.description || "",
            temp_description:  tutor.description || ""

          })
        }).catch(err=>console.log(err));


    
          fetch("http://localhost:9000/api/courses",  {
            method: "GET",
            headers: {"Content-Type": "application/json"}
          }).then(res => {
              console.log(res);
              return res.json()
            }).then((courses:Course[]) => {

              this.setState({course_catalog: courses})
              
            });

          fetch(`http://localhost:9000/api/courses/tutor/${this.state.obj_id}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
          }).then(res => {
              console.log(res);
              return res.json()
            }).then((courses:Course[]) => {

              this.setState({courses:R.clone(courses),temp_courses:R.clone(courses) });
              
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
        credentials: 'include',
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
    handlePriceChange = (value:number) => {
      this.setState({ temp_price: value })
    }

    savePriceChange = (e:React.FormEvent<HTMLElement>) => {
      let sched = R.clone(this.state.temp_schedule);
      fetch("http://localhost:9000/api/tutors/tutor", {
        credentials: 'include',
        method: "PUT",
        body: JSON.stringify({userid: this.state.obj_id,price: this.state.temp_price}),
        headers: {"Content-Type": "application/json"}
      }).then(res=>{
        this.setState({ price: this.state.temp_price });
        this.togglePriceModal(e);
      });
    }


    cancelPriceChange = (e:React.FormEvent<HTMLButtonElement>) => {
      this.setState({ temp_price: this.state.price });
      this.togglePriceModal(e);
    }


    // --- Description Functions ---

    handleDescChange = (e:React.FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      this.setState({temp_description: target.value});
    }

    saveDescChange = (e:React.FormEvent<HTMLElement>) => {
      fetch("http://localhost:9000/api/tutors/tutor", {
        credentials: 'include',
        method: "PUT",
        body: JSON.stringify({userid: this.state.obj_id,description: this.state.temp_description}),
        headers: {"Content-Type": "application/json"}
      }).then(res=>  {
        this.setState({description: this.state.temp_description});
        this.toggleDescModal(e);
      });

    }

    cancelDescChange = (e:React.FormEvent<HTMLElement>) => {
      this.setState({ temp_description: this.state.description });
      this.toggleDescModal(e);
    }
  
    // --- Course Functions ---
    handleCourseRemove = (course:Course) => {
    
      const filtered_courses = this.state.temp_courses.filter((c:Course) => c.name !== course.name);
      this.setState({ temp_courses: filtered_courses });
    }
    
    handleCourseAdd = (e:React.FormEvent<HTMLElement>) => {
      e.preventDefault();
      this.setState({ added_courses: [...this.state.added_courses, '' ]})
    }
    handleTempCourseChange = (i:number,courseName:string, event:React.FormEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      let values = [...this.state.added_courses];
      values[i] = target.value;
      this.setState({ added_courses: values });
    }

    handleAutofillCourse = (i:number, course:string) => {
      let values = [...this.state.added_courses];
      values[i] = course;
      this.setState({ added_courses: values });
      this.handleTempCourseAdd(course)
    }

    handleTempCourseAdd = ( courseName:string ) => {
      if (this.state.temp_courses.map((course)=>course.name).includes(courseName))
        this.setState({ add_course_err: true, add_course_err_msg: "Course already added." });
      else if (!this.state.course_catalog.map(course=>course.name).includes(courseName))
        this.setState({ add_course_err: true, add_course_err_msg: "Invalid course." });
      else {
        const course = this.state.course_catalog.filter(course=>course.name === courseName)[0]
        this.setState(prevState => ({ temp_courses: [...prevState.temp_courses, course],
          added_courses: this.state.added_courses.filter(a_course => a_course !== courseName),
          add_course_err: false
        }));
      }
    }
    handleTempCourseRemove = (index:number) => {
      this.setState({ added_courses: this.state.added_courses.filter((c, i) => index !== i) })
    }


    saveCoursesChange = (e:React.FormEvent<HTMLElement> ) => {


          // Update course('s) list of tutors
      let removed_set = this.state.courses.filter((c:Course) => !this.state.temp_courses.includes(c));
      let added_set = this.state.temp_courses.filter((c:Course) => !this.state.courses.includes(c));
      let tutor = this.state.obj_id;

      removed_set.forEach(function(c:Course) {
        fetch(`http://localhost:9000/api/courses/${c._id}/remove-tutor`, {
          method: "POST",
          credentials: 'include',
          body: JSON.stringify({ tutor_id: tutor}),
          headers: {"Content-Type": "application/json"},
        });
      });

      added_set.forEach(function(c:Course) {
        fetch(`http://localhost:9000/api/courses/${c._id}/add-tutor`, {
          method: "POST",
          credentials: 'include',
          body: JSON.stringify({tutor_id:  tutor}),
          headers: {"Content-Type": "application/json"},
        });
      });
      this.setState({ courses: this.state.temp_courses, added_courses: [], add_course_err: false });
      this.toggleCoursesModal(e);
    }

    cancelCoursesChange = (e:React.FormEvent<HTMLElement>) => {
      this.setState({ temp_courses: this.state.courses, added_courses: [], add_course_err: false });
      this.toggleCoursesModal(e);
    }

    setTutorTimes = (schedule:TutorTimes,tab:number,payload:number[][]) => {
      const times = [
        schedule.Sunday,
        schedule.Monday,
        schedule.Tuesday,
        schedule.Wednesday,
        schedule.Thursday,
        schedule.Friday,
        schedule.Saturday
  
      ];
      times[tab] = payload;
      
    }

    handleTimeBlockRemove = (index:number, block: any, e:React.FormEvent<HTMLElement>) => {
      e.preventDefault();
      let sched:TutorTimes = R.clone(this.state.temp_schedule);
      console.log(this.extractTutorTimes(sched,this.state.schedule_tab))
      this.extractTutorTimes(sched,this.state.schedule_tab).splice(index, 1);
      console.log(this.extractTutorTimes(sched,this.state.schedule_tab))
      // Sort before setting new state
      this.setTutorTimes(sched,this.state.schedule_tab, this.extractTutorTimes(sched,this.state.schedule_tab).sort(function(a:number[], b:number[]) {return a[0] - b[0]}) ) 
      this.setState({ temp_schedule: sched });
    }

    handleScheduleBlockAdd = (e:React.FormEvent<HTMLElement>) => {
      e.preventDefault();
      let added = R.clone(this.state.added_times);
      let addedTimes = this.extractTutorTimes(added,this.state.schedule_tab);
      addedTimes.push( [0, 0] )
      console.log(added);
      this.setState({ added_times: added });
    }
  
  
  // interKey: which block within the given day
  // intraKey: which time (start=0, end=1) within the given block
  handleTempTimeChange = (interKey:number, intraKey:number, event: moment.Moment) => {
    let sched = R.clone(this.state.added_times);
    this.extractTutorTimes(sched,this.state.schedule_tab)[interKey][intraKey] = parseInt(event.format('HHmm'))    ;
    this.setState({ added_times: sched });
  }


  extractTutorTimes(schedule:TutorTimes,tab:number){
    const times = [
      schedule.Sunday,
      schedule.Monday,
      schedule.Tuesday,
      schedule.Wednesday,
      schedule.Thursday,
      schedule.Friday,
      schedule.Saturday

    ];
    return times[tab];
  }

  

  handleTempTimeAdd = (index:number, event:React.FormEvent<HTMLButtonElement>) => {
    let added = R.clone(this.state.added_times);
    let addedTimes = this.extractTutorTimes(added,this.state.schedule_tab)
    let newBlock = [addedTimes[index][0], addedTimes[index][1]];
    if (newBlock[0] === newBlock[1])
      this.setState({ add_time_err: true, add_time_err_msg: "Start and end times must be different." });
    else if (newBlock[0] >= newBlock[1])
      this.setState({ add_time_err: true, add_time_err_msg: "Start time must be after end time." });
    // else if (R.includes(newBlock, this.extractTutorTimes(this.state.temp_schedule,this.state.schedule_tab) ))
    //   this.setState({ add_time_err: true, add_time_err_msg: "Time block is already added." });
    else {
      let timeIncl = false;
      for (let i = 0; i < this.extractTutorTimes(this.state.temp_schedule,this.state.schedule_tab).length; i++) {
        if ((this.extractTutorTimes(this.state.temp_schedule,this.state.schedule_tab)[i][1] <= newBlock[0]) ||
          (this.extractTutorTimes(this.state.temp_schedule,this.state.schedule_tab)[i][0] >= newBlock[1]))
          continue;
        else if ((this.extractTutorTimes(this.state.temp_schedule,this.state.schedule_tab)[i][0] <= newBlock[0]) ||
          (this.extractTutorTimes(this.state.temp_schedule,this.state.schedule_tab)[i][1] >= newBlock[1]) ||
          (this.extractTutorTimes(this.state.temp_schedule,this.state.schedule_tab)[i][0] >= newBlock[0] && 
          (this.extractTutorTimes(this.state.temp_schedule,this.state.schedule_tab)[i][1] >= newBlock[1]))) {
          timeIncl = true;
          break;
        }
      }
      if (timeIncl)
        this.setState({ add_time_err: true, add_time_err_msg: "Time block overlaps existing availability." });
      else {
        let sched = R.clone(this.state.temp_schedule);
        let schedTimes= this.extractTutorTimes(sched,this.state.schedule_tab);
        schedTimes.push(newBlock);
        addedTimes.splice(index, 1);
        // Sort before setting new state
        schedTimes = schedTimes.sort((a:number[], b:number[]) => {return a[0] - b[0]});
        this.setState({ temp_schedule: sched, added_times: added, add_time_err: false });
      }
    }
  }

  handleTempTimeRemove = (index:number, event:React.FormEvent<HTMLElement>) => {
    let sched = R.clone(this.state.added_times);
    let schedTimes= this.extractTutorTimes(sched,this.state.schedule_tab);
    schedTimes.splice(index, 1);
    this.setState({ added_times: sched });
  }

  saveScheduleChange = (e:React.FormEvent<HTMLElement>) => {
    let sched = R.clone(this.state.temp_schedule);
    fetch("http://localhost:9000/api/tutors/tutor", {
      credentials: 'include',
      method: "PUT",
      body: JSON.stringify({userid: this.state.obj_id, times: sched}),
      headers: {"Content-Type": "application/json"}
    })

    this.setState({ schedule: R.clone(this.state.temp_schedule), 
      added_times: {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
    } as TutorTimes, add_time_err: false });
    this.toggleAvailabilityModal(e);
  }

  cancelScheduleChange = (e:React.FormEvent<HTMLElement>) => {
    this.setState({ temp_schedule: R.clone(this.state.schedule), 
      added_times: {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
    } as TutorTimes, add_time_err: false });
    this.toggleScheduleModal(e);
  }
  
    // --- Interval Functions ---
    handleIntervalChange = (value:number) => {
      this.setState({ temp_meeting_interval: value });
    };
  
    cancelIntervalChange = (e:React.FormEvent<HTMLElement>) => {
      this.setState({temp_meeting_interval: this.state.meeting_interval});
      this.toggleIntervalModal(e);
    };
  
    saveIntervalChange = (e:React.FormEvent<HTMLElement>) => {
      let sched = R.clone(this.state.temp_schedule);
      fetch("http://localhost:9000/api/tutors/tutor", {
        credentials: 'include',
        method: "PUT",
        body: JSON.stringify({userid: this.state.obj_id,interval: this.state.temp_meeting_interval}),
        headers: {"Content-Type": "application/json"}
      }).then(res=>{
        this.setState({ meeting_interval: this.state.temp_meeting_interval })
        this.toggleIntervalModal(e);
      
      });
    }
    // (e:React.FormEvent<HTMLElement>) => {
    //   this.setState({ meeting_interval: this.state.temp_meeting_interval });
    //   fetch("http://localhost:9000/api/tutors/tutor", {
    //     method: "PUT",
    //     body: JSON.stringify({userid: this.state.obj_id, interval: this.state.temp_meeting_interval}),
    //     headers: {"Content-Type": "application/json"}
    //   })
    //   this.toggleIntervalModal(e);
    // };
  

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

    toggleScheduleTab = (tab:number) => {
      if (this.state.schedule_tab !== tab )
        this.setState({ schedule_tab: tab });
    };

    toggleDescModal = (e:React.FormEvent<HTMLElement>) => {
      e.preventDefault();
      this.setState({ desc_modal: !this.state.desc_modal });
    };

    toggleIntervalModal = (e:React.FormEvent<HTMLElement>) => {
      e.preventDefault();
      this.setState({ interval_modal: !this.state.interval_modal });
    };

    toggleAvailabilityModal = (e:React.FormEvent<HTMLElement>) => {
      e.preventDefault();
      this.setState({ schedule_modal: !this.state.schedule_modal });
    }

    formatTime = (block:number[]) => {
      return this.intToTime(block[0]) + " - " + this.intToTime(block[1]);
    }

    formatTimeList = (blockList:number[][]) => {
      if (blockList.length === 0)
        return "None";
      let ret = "";
      blockList.forEach((block, index) => {
        ret += this.formatTime(block);
        if (index < blockList.length-1)
          ret += ", ";
      });
      return ret;
    }

      // Given 1 to 4 digit integer, format as a 12hr time
  // e.g. Given time = 845, return "8:45AM"
  intToTime = (time:number )=> {
    // Case of after midnight
    if (time.toString().length <= 2)
      return "12:" + time + "AM";
    let mins:any = time % 100;
    let hrs:any =  (time-mins) / 100;
    let meridiem = hrs >= 12 ? "PM" : "AM";
    mins = mins === 0 ? "00" : mins.toString();
    hrs = hrs > 12 ? (hrs-12).toString() : hrs.toString();
    return hrs + ":" + mins + meridiem;    
  }




    render(): JSX.Element{
      let schedule_days = [{day: "Sunday", abbr: "SUN"}, {day: "Monday", abbr: "MON"}, {day: "Tuesday", abbr: "TUE"}, {day: "Wednesday", abbr: "WED"}, {day: "Thursday", abbr: "THU"}, {day: "Friday", abbr: "FRI"}, {day: "Saturday", abbr: "SAT"}];

      const profilePicProps = {
        isTutor:true,
        firstName:this.state.first_name,
        lastName:this.state.last_name,
        clientImg:this.state.profile_pic,
        imgModalOpen:this.state.imgModalOpen,
        croppedImg:this.state.croppedImg,
        setImgModalOpen: (arg:boolean) => this.setState({...this.state,imgModalOpen:arg}),
        setCroppedImg: (arg:string) =>this.setState({...this.state,croppedImg:arg}),
        setClientImg: (arg:string) =>this.setState({...this.state,profile_pic:arg}), 
        cancelImgChange: () => this.setState({...this.state,croppedImg:"",imgModalOpen:false}), 
        userid:this.state.obj_id 

      } as IProfilePicModalProps;
      return (
        <Container fluid className="background">
          <Row className="title">
            <div className="profile-text">Settings</div>
          </Row>
          <hr></hr>
          <Row xs="2" className="parent">
            <Col xl="6">
              <ListGroup className="heading-text">
                {/* <ListGroupItem>
                  <img src={this.state.profile_pic} alt={'profile pic'} className="img-responsive"></img>
                </ListGroupItem> */}
                <ListGroupItem className="img-item">
                  <ProfilePicModal {...profilePicProps} />

                </ListGroupItem>

                <ListGroupItem>
                  <span className="heading-item">{this.state.first_name + " " + this.state.last_name}</span>
                  <a href="/#" className="modal-link" onClick={this.toggleNameModal}>
                    <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>
                  </a>
                  <Modal isOpen={this.state.name_modal} fade={false} toggle={this.toggleNameModal} className="name-modal">
                    <ModalHeader toggle={this.cancelNameChange}>Edit Name</ModalHeader>
                    <ModalBody>
                      Change your name here.
                      <hr/>
                      <InputGroup>
                        First Name:<Input id="first-name" value={this.state.temp_firstn} onChange={this.handleFirstChange}/>
                      </InputGroup>
                      <InputGroup>
                        Last Name:<Input id="last-name" value={this.state.temp_lastn} onChange={this.handleLastChange} />
                      </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                      <Button className="btn-red" onClick={this.saveNameChange}>Save</Button>{' '}
                      <Button color="secondary" onClick={this.cancelNameChange}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
  
                  <span className="heading-item">${this.state.price}/h</span>
                  <a href="/#" className="modal-link" onClick={this.togglePriceModal}>
                    <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>
                  </a>
                  <Modal isOpen={this.state.price_modal} fade={false} toggle={this.togglePriceModal} className="price-modal">
                    <ModalHeader toggle={this.cancelPriceChange}>Edit Price</ModalHeader>
                    <ModalBody>
                      Change your hourly tutoring price rate.
                      <hr/>
                      <div className='slider'>
                        <Slider
                          min={15}
                          max={80}
                          step={1}
                          value={this.state.temp_price}
                          onChange={this.handlePriceChange}
                        />
                        <div className='value'>${this.state.temp_price}</div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button className="btn-red" onClick={this.savePriceChange}>Save</Button>{' '}
                      <Button color="secondary" onClick={this.cancelPriceChange}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </ListGroupItem>
                <br></br>
                <ListGroupItem>
                  <span className="heading-item">{this.state.meeting_interval + " minute sessions"}</span>
                  <a href="/#" className="modal-link" onClick={this.toggleIntervalModal}>
                    <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>
                  </a>
                  <Modal isOpen={this.state.interval_modal} fade={false} toggle={this.toggleIntervalModal} className="interval-modal">
                    <ModalHeader toggle={this.cancelIntervalChange}>Edit Meeting Interval</ModalHeader>
                    <ModalBody>
                      Change the length of your tutor sessions.
                      <hr/>
                      <div className='slider'>
                        <Slider
                          min={15}
                          max={60}
                          step={15}
                          value={this.state.temp_meeting_interval}
                          onChange={this.handleIntervalChange}
                        />
                        <div className='value'>{this.state.temp_meeting_interval} minutes</div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button className="btn-red" onClick={this.saveIntervalChange}>Save</Button>{' '}
                      <Button color="secondary" onClick={this.cancelIntervalChange}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </ListGroupItem>
                <br></br>
                <ListGroupItem>
                  <span className="heading-item">Description</span>
                  <a href="#" className="modal-link" onClick={this.toggleDescModal}>
                    <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>
                  </a>
                  <Modal isOpen={this.state.desc_modal} fade={false} toggle={this.toggleDescModal} className="desc-modal">
                    <ModalHeader toggle={this.cancelDescChange}>Edit Description</ModalHeader>
                    <ModalBody>
                      Change your description here.
                      <hr/>
                      <InputGroup>
                        <Input id="description-name" value={this.state.temp_description} type="textarea" onChange={this.handleDescChange} rows="10"/>
                      </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                      <Button className="btn-red" onClick={this.saveDescChange}>Save</Button>{' '}
                      <Button color="secondary" onClick={this.cancelDescChange}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                  <hr></hr>
                  <div className="body-text">
                    {this.state.description}
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col xl="6">
              <ListGroup className="heading-text">
                <ListGroupItem>
                  <span className="heading-item">Availability</span>
                  <a href="#" className="modal-link" onClick={this.toggleScheduleModal}>
                    <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>
                  </a>
                  <ListGroup>
                    {this.state.schedule && Object.values(this.state.schedule).map((time_blocks, i) => 
                      <span className="day-item" key={i}>{schedule_days[i].abbr}: {this.formatTimeList(time_blocks)}</span>
                    )}
                  </ListGroup>
                  <Modal isOpen={this.state.schedule_modal} fade={false} toggle={this.toggleScheduleModal} className="schedule-modal">
                    <ModalHeader toggle={this.cancelScheduleChange}>Edit Availability</ModalHeader>
                    <ModalBody>
                      <Nav tabs>
                        {schedule_days.map((day, i) =>
                          <NavItem>
                            <NavLink className={classNames({ active: this.state.schedule_tab === i })}
                              onClick={() => { this.toggleScheduleTab(i) }} >
                              {day.abbr}
                            </NavLink>
                          </NavItem> 
                        )}
                      </Nav>
                      <TabContent activeTab={this.state.schedule_tab}>
                        <br></br>
                        <TabPane tabId={this.state.schedule_tab}>
                          <Row>
                            <Col sm="12">
                              <p className="schedule-tab-header">
                                Change your {schedule_days[this.state.schedule_tab].day} availability.
                              </p>
                              { this.state.add_time_err ?
                                <Alert color="danger">
                                  <b>ERROR:</b><br/>{this.state.add_time_err_msg}
                                </Alert>
                              : null }
                              <hr/>
                              <ListGroup>
                                {this.state.temp_schedule && this.extractTutorTimes(this.state.temp_schedule,this.state.schedule_tab).map((block, i) => 
                                  <ListGroupItem className="body-text" key={i}>
                                    {this.formatTime(block)}
                                    <Button color="link" className="list-remove" onClick={(e) =>this.handleTimeBlockRemove( i, block,e) }>Remove <FontAwesomeIcon icon={faBan} className="font-adj"/></Button>
                                  </ListGroupItem>
                                )}
                                {this.state.added_times && Object.values( this.extractTutorTimes(this.state.added_times,this.state.schedule_tab) ).map((block:number[], i:number) => 
                                  <Form key={i}>
                               
                                    <ListGroupItem className="body-text">
                                      <InputGroup>
                                        <TimePicker
                                          showSecond={false}
                                          value={moment(block[0].toString().padStart(4,'0'), 'HHmm')}
                                          defaultValue={moment().hour(0).minute(0)}
                                          onChange={(e) => {this.handleTempTimeChange( i, 0,e)} }
                                          format={'h:mm a'}
                                          minuteStep={this.state.meeting_interval}
                                          allowEmpty={false}
                                          use12Hours={true}
                                          inputReadOnly={true}
                                        />
                                        <TimePicker
                                          showSecond={false}
                                          value={moment(block[1].toString().padStart(4,'0'), 'HHmm')}
                                          defaultValue={moment().hour(0).minute(0)}
                                          onChange={(e) => {this.handleTempTimeChange( i, 1,e)} }
                                          format={'h:mm a'}
                                          minuteStep={this.state.meeting_interval}
                                          allowEmpty={false}
                                          use12Hours={true}
                                          inputReadOnly={true}
                                        /> 
                                        <Button color="link" className="list-add" onClick={this.handleTempTimeAdd.bind(this, i)}><FontAwesomeIcon icon={faCheck} className="font-adj"/></Button>
                                        <Button color="link" className="list-remove" onClick={this.handleTempTimeRemove.bind(this, i)}><FontAwesomeIcon icon={faTimes} className="font-adj"/></Button>
                                      </InputGroup>
                                    </ListGroupItem>
                                  </Form>
                                )}
                              </ListGroup>
                              <br/>
                              <Button color="success" onClick={this.handleScheduleBlockAdd}>Add <FontAwesomeIcon icon={faPlus} className="font-adj"/></Button>
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                    </ModalBody>
                    <ModalFooter>
                      <Button className="btn-red" onClick={this.saveScheduleChange}>Save</Button>
                      <Button color="secondary" onClick={this.cancelScheduleChange}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </ListGroupItem>
                <br></br>
                <ListGroupItem>
                  <span className="heading-item">Courses Offered</span>
                    <a href="#" className="modal-link" onClick={this.toggleCoursesModal}>
                      <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>
                    </a>
                    <hr/>
                    <ListGroup>
                      {this.state.courses.map((course, i) => 
                        <ListGroupItem className="body-text" key={i}>{course.name}</ListGroupItem>
                      )}
                    </ListGroup>
                    <Modal isOpen={this.state.courses_modal} fade={false} toggle={this.toggleCoursesModal} className="courses-modal">
                      <ModalHeader toggle={this.cancelCoursesChange}>Edit Courses</ModalHeader>
                      <ModalBody>
                        Change your courses offered.
                        { this.state.add_course_err ?
                          <Alert color="danger">
                            <b>ERROR:</b><br/>{this.state.add_course_err_msg}
                          </Alert>
                        : null }
                        <hr/>
                        <ListGroup>
                          {this.state.temp_courses.map((course, i) => 
                            <ListGroupItem className="body-text" key={i}>
                              {course.name}
                              <Button color="link" className="list-remove" onClick={ ()=>{  this.handleCourseRemove(course)}   }>Remove <FontAwesomeIcon icon={faBan} className="font-adj"/></Button>
                            </ListGroupItem>
                          )}
                          {this.state.added_courses.map((courseName:string, i) => 
                            <Form key={i}>
                              <ListGroupItem className="body-text">
                                <InputGroup>
                                  <Autocomplete 
                                    getItemValue={(item) => item}
                                    items={this.state.course_catalog.map(course=>course.name)}
                                    renderItem={(item, isHighlighted) =>
                                      <div key={item} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                        {item}
                                      </div>
                                    }
                                    shouldItemRender={ (item,value) => item.toLowerCase().includes(value.toLowerCase())  }
                                    sortItems={(a,b,value)=>  a.localeCompare(b) }
                                    value={courseName || ''}
                                    onChange={this.handleTempCourseChange.bind(this, i, courseName)}
                                    onSelect={(index, course) => this.handleAutofillCourse(i, course )}
                                  />
                                  <Button color="link" className="list-add" onClick={(c) => this.handleTempCourseAdd(courseName)}><FontAwesomeIcon icon={faCheck} className="font-adj"/></Button>
                                  <Button color="link" className="list-remove" onClick={(index) => this.handleTempCourseRemove(i)}><FontAwesomeIcon icon={faTimes} className="font-adj"/></Button>
                                </InputGroup>
                              </ListGroupItem>
                            </Form>
                          )}
                        </ListGroup>
                        <br/>
                        <Button color="success" onClick={this.handleCourseAdd}>Add <FontAwesomeIcon icon={faPlus} className="font-adj"/></Button>
                      </ModalBody>
                      <ModalFooter>
                        <Button className="btn-red" onClick={this.saveCoursesChange}>Save</Button>
                        <Button color="secondary" onClick={this.cancelCoursesChange}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      );
    }

}

function mapStateToProps(state: any) {
  return { 
     tutorData: state.tutorData,
     clientData: state.clientData
     }
}

export default connect(mapStateToProps)(Settings);