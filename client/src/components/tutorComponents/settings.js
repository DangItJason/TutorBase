import React, { Component } from "react";
import classNames from "classnames";
import { Container, Row, Col, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, InputGroup, Input, Alert, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faBan, faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Slider from 'react-rangeslider';
import Autocomplete from 'react-autocomplete';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'react-rangeslider/lib/index.css';
import "./settings.css";
import 'rc-time-picker/assets/index.css';
const rambda = require('rambda');

class Settings extends Component {
  constructor(props) {
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
    };
  }

  componentDidMount() {
    fetch("http://localhost:9000/tutor-operations/price/" + this.state.email,  {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    }).then(res => {
       console.log(res);
        return res.json()
      }).then(price => {
        this.setState({ price: price, temp_price: price })
      });

    fetch("http://localhost:9000/tutor-operations/courses/" + this.state.email,  {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    }).then(res => {
        console.log(res);
        return res.json()
      }).then(courses => {
        this.setState({ courses: courses, temp_courses: courses })
      });

    fetch("http://localhost:9000/tutor-operations/schedule/" + this.state.email, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    }).then(res => {
      console.log(res);
      return res.json();
    }).then(times => {
      this.setState({ schedule: rambda.clone(times), temp_schedule: rambda.clone(times) })
    });

    fetch("http://localhost:9000/catalog/courses",  {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    }).then(res => {
        console.log(res);
        return res.json()
      }).then(courses => {
        courses.map(course => 
          this.setState(prevState => ({
              course_catalog: [...prevState.course_catalog, course.name]
          }))
        )
      });
    
    fetch("http://localhost:9000/tutor-operations/name/" + this.state.email,  {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    }).then(res => {
      console.log(res);
      return res.json();
    }).then(name => {
      this.setState({ first_name: name.first_name, temp_firstn: name.first_name })
      this.setState({ last_name: name.last_name, temp_lastn: name.last_name })
    });

    fetch("http://localhost:9000/tutor-operations/description/" + this.state.email,  {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    }).then(res => {
      console.log(res);
      return res.json();
    }).then(description => {
      this.setState({ description: description.description, temp_description: description.description });
    });

    fetch("http://localhost:9000/tutor-operations/interval/" + this.state.email, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    }).then(res => {
      console.log(res);
      return res.json();
    }).then(interval => {
      this.setState({ meeting_interval: interval, temp_meeting_interval: interval });
    });

    fetch("http://localhost:9000/tutor-operations/pfp/" + this.state.email, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    }).then(res => {
      console.log(res);
      return res.json();
    }).then(pfp => {
      this.setState({ profile_pic: pfp });
    });
  }

  // --- Name Functions ---
  handleFirstChange = (e) => {
    this.setState({temp_firstn: e.target.value});
  }

  handleLastChange = (e) => {
    this.setState({temp_lastn: e.target.value});
  }

  saveNameChange = (e) => {
    fetch("http://localhost:9000/tutor-operations/name", {
      method: "PUT",
      body: JSON.stringify({email: this.state.email, first_name: this.state.temp_firstn, last_name: this.state.temp_lastn}),
      headers: {"Content-Type": "application/json"}
    });
    this.setState({first_name: this.state.temp_firstn, last_name: this.state.temp_lastn})
    this.toggleNameModal(e);
  }

  cancelNameChange = (e) => {
    this.setState({ temp_firstn: this.state.first_name });
    this.setState({ temp_lastn: this.state.last_name });
    this.toggleNameModal(e);
  }

  // --- Price Functions ---
  handlePriceChange = (value) => {
    this.setState({ temp_price: value })
  }

  savePriceChange = (e) => {
    this.setState({ price: this.state.temp_price });
    fetch("http://localhost:9000/tutor-operations/price", {
      method: "PUT",
      body: JSON.stringify({email: this.state.email, price: this.state.temp_price}),
      headers: {"Content-Type": "application/json"},
    })
    this.togglePriceModal(e);
  }

  cancelPriceChange = (e) => {
    this.setState({ temp_price: this.state.price });
    this.togglePriceModal(e);
  }

  // --- Description Functions ---
  handleDescChange = (e) => {
    this.setState({temp_description: e.target.value});
  }

  saveDescChange = (e) => {
    fetch("http://localhost:9000/tutor-operations/description", {
      method: "PUT",
      body: JSON.stringify({email: this.state.email, description: this.state.temp_description}),
      headers: {"Content-Type": "application/json"}
    });
    this.setState({description: this.state.temp_description});
    this.toggleDescModal(e);
  }

  cancelDescChange = (e) => {
    this.setState({ temp_description: this.state.description });
    this.toggleDescModal(e);
  }

  // --- Course Functions ---
  handleCourseRemove = e => {
    const { value } = e.target;
    e.preventDefault();
    const filtered_courses = this.state.temp_courses.filter((c) => c !== value);
    this.setState({ temp_courses: filtered_courses });
  }

  handleCourseAdd = e => {
    e.preventDefault();
    this.setState(prevState => ({ added_courses: [...prevState.added_courses, '']}))
  }

  handleTempCourseChange = (i, event) => {
    let values = [...this.state.added_courses];
    values[i] = event.target.value;
    this.setState({ added_courses: values });
  }
  
  handleAutofillCourse = (i, course) => {
    let values = [...this.state.added_courses];
    values[i] = course;
    this.setState({ added_courses: values });
  }

  handleTempCourseAdd = (course) => {
    if (this.state.temp_courses.includes(course))
      this.setState({ add_course_err: true, add_course_err_msg: "Course already added." });
    else if (!this.state.course_catalog.includes(course))
      this.setState({ add_course_err: true, add_course_err_msg: "Invalid course." });
    else {
      this.setState(prevState => ({ temp_courses: [...prevState.temp_courses, course],
        added_courses: this.state.added_courses.filter(a_course => a_course !== course),
        add_course_err: false
      }));
    }
  }

  handleTempCourseRemove = (index) => {
    this.setState({ added_courses: this.state.added_courses.filter((c, i) => index !== i) })
  }

  saveCoursesChange = (e) => {
    // Update tutor's list of courses
    fetch("http://localhost:9000/tutor-operations/courses", {
      method: "PUT",
      body: JSON.stringify({email: this.state.email, courses: this.state.temp_courses}),
      headers: {"Content-Type": "application/json"},
    })
    // Update course('s) list of tutors
    let removed_set = this.state.courses.filter(c => !this.state.temp_courses.includes(c));
    let added_set = this.state.temp_courses.filter(c => !this.state.courses.includes(c));
    let tutor = this.state.obj_id;
    removed_set.forEach(function(c) {
      fetch("http://localhost:9000/catalog/course/remove-tutor", {
        method: "POST",
        body: JSON.stringify({course_name: c, tutor_id: tutor}),
        headers: {"Content-Type": "application/json"},
      });
    });
    added_set.forEach(function(c) {
      fetch("http://localhost:9000/catalog/course/add-tutor", {
        method: "POST",
        body: JSON.stringify({course_name: c, tutor_id:  tutor}),
        headers: {"Content-Type": "application/json"},
      });
    });

    this.setState({ courses: this.state.temp_courses, added_courses: [], add_course_err: false });
    this.toggleCoursesModal(e);
  }

  cancelCoursesChange = (e) => {
    this.setState({ temp_courses: this.state.courses, added_courses: [], add_course_err: false });
    this.toggleCoursesModal(e);
  }

  // --- Schedule Availability Functions ---
  handleTimeBlockRemove = (index, e) => {
    e.preventDefault();
    let sched = rambda.clone(this.state.temp_schedule);
    sched[this.state.schedule_tab].splice(index, 1);
    // Sort before setting new state
    sched[this.state.schedule_tab] = sched[this.state.schedule_tab].sort(function(a, b) {return a[0] - b[0]});
    this.setState({ temp_schedule: sched });
  }

  handleScheduleBlockAdd = e => {
    e.preventDefault();
    let added = rambda.clone(this.state.added_times);
    added[this.state.schedule_tab].push([[moment().minute(0).format('HHmm')], [moment().minute(0).format('HHmm')]]);
    this.setState({ added_times: added });
  }

  // interKey: which block within the given day
  // intraKey: which time (start=0, end=1) within the given block
  handleTempTimeChange = (interKey, intraKey, event) => {
    let sched = rambda.clone(this.state.added_times);
    sched[this.state.schedule_tab][interKey][intraKey] = event.format('HHmm');
    this.setState({ added_times: sched });
  }

  handleTempTimeAdd = (index, event) => {
    let added = rambda.clone(this.state.added_times);
    let newBlock = [parseInt(added[this.state.schedule_tab][index][0], 10), parseInt(added[this.state.schedule_tab][index][1], 10)];
    if (newBlock[0] === newBlock[1])
      this.setState({ add_time_err: true, add_time_err_msg: "Start and end times must be different." });
    else if (newBlock[0] >= newBlock[1])
      this.setState({ add_time_err: true, add_time_err_msg: "Start time must be after end time." });
    else if (rambda.includes(newBlock, this.state.temp_schedule[this.state.schedule_tab]))
      this.setState({ add_time_err: true, add_time_err_msg: "Time block is already added." });
    else {
      let timeIncl = false;
      for (let i = 0; i < this.state.temp_schedule[this.state.schedule_tab].length; i++) {
        if ((this.state.temp_schedule[this.state.schedule_tab][i][1] <= newBlock[0]) ||
          (this.state.temp_schedule[this.state.schedule_tab][i][0] >= newBlock[1]))
          continue;
        else if ((this.state.temp_schedule[this.state.schedule_tab][i][0] <= newBlock[0]) ||
          (this.state.temp_schedule[this.state.schedule_tab][i][1] >= newBlock[1]) ||
          (this.state.temp_schedule[this.state.schedule_tab][i][0] >= newBlock[0] && 
          (this.state.temp_schedule[this.state.schedule_tab][i][1] >= newBlock[1]))) {
          timeIncl = true;
          break;
        }
      }
      if (timeIncl)
        this.setState({ add_time_err: true, add_time_err_msg: "Time block overlaps existing availability." });
      else {
        let sched = rambda.clone(this.state.temp_schedule);
        sched[this.state.schedule_tab].push(newBlock);
        added[this.state.schedule_tab].splice(index, 1);
        // Sort before setting new state
        sched[this.state.schedule_tab] = sched[this.state.schedule_tab].sort(function(a, b) {return a[0] - b[0]});
        this.setState({ temp_schedule: sched, added_times: added, add_time_err: false });
      }
    }
  }

  handleTempTimeRemove = (index, event) => {
    let sched = rambda.clone(this.state.added_times);
    sched[this.state.schedule_tab].splice(index, 1);
    this.setState({ added_times: sched });
  }

  saveScheduleChange = (e) => {
    let sched = rambda.clone(this.state.temp_schedule);
    fetch("http://localhost:9000/tutor-operations/schedule", {
      method: "PUT",
      body: JSON.stringify({email: this.state.email, times: sched}),
      headers: {"Content-Type": "application/json"},
    });
    this.setState({ schedule: rambda.clone(this.state.temp_schedule), 
      added_times: [[], [], [], [], [], [], []], add_time_err: false });
    this.toggleAvailabilityModal(e);
  }

  cancelScheduleChange = (e) => {
    this.setState({ temp_schedule: rambda.clone(this.state.schedule), 
      added_times: [[], [], [], [], [], [], []], add_time_err: false });
    this.toggleScheduleModal(e);
  }

  // --- Interval Functions ---
  handleIntervalChange = (value) => {
    this.setState({ temp_meeting_interval: value });
  };

  cancelIntervalChange = (e) => {
    this.setState({temp_meeting_interval: this.state.meeting_interval});
    this.toggleIntervalModal(e);
  };

  saveIntervalChange = (e) => {
    this.setState({ meeting_interval: this.state.temp_meeting_interval });
    fetch("http://localhost:9000/tutor-operations/interval", {
      method: "PUT",
      body: JSON.stringify({email: this.state.email, interval: this.state.temp_meeting_interval}),
      headers: {"Content-Type": "application/json"},
    })
    this.toggleIntervalModal(e);
  };

  // --- Modal / Tab Toggle Functions ---
  togglePriceModal = (e) => {
    e.preventDefault();
    this.setState({ price_modal: !this.state.price_modal })
  };

  toggleNameModal = (e) => {
    e.preventDefault();
    this.setState({ name_modal: !this.state.name_modal })
  };

  toggleCoursesModal = (e) => {
    e.preventDefault();
    this.setState({ courses_modal: !this.state.courses_modal })
  };

  toggleScheduleModal = (e) => {
    e.preventDefault();
    this.setState({ schedule_modal: !this.state.schedule_modal })
  };

  toggleScheduleTab = tab => {
    if (this.state.schedule_tab !== tab )
      this.setState({ schedule_tab: tab });
  };

  toggleDescModal = (e) => {
    e.preventDefault();
    this.setState({ desc_modal: !this.state.desc_modal });
  };

  toggleIntervalModal = (e) => {
    e.preventDefault();
    this.setState({ interval_modal: !this.state.interval_modal });
  };

  toggleAvailabilityModal = (e) => {
    e.preventDefault();
    this.setState({ schedule_modal: !this.state.schedule_modal });
  }

  formatTime = block => {
    return this.intToTime(block[0]) + " - " + this.intToTime(block[1]);
  }

  formatTimeList = blockList => {
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
  intToTime = time => {
    // Case of after midnight
    if (time.toString().length <= 2)
      return "12:" + time + "AM";
    let mins = time % 100;
    let hrs =  (time-mins) / 100;
    let meridiem = hrs >= 12 ? "PM" : "AM";
    mins = mins === 0 ? "00" : mins.toString();
    hrs = hrs > 12 ? (hrs-12).toString() : hrs.toString();
    return hrs + ":" + mins + meridiem;    
  }

  render() {

    let schedule_days = [{day: "Sunday", abbr: "SUN"}, {day: "Monday", abbr: "MON"}, {day: "Tuesday", abbr: "TUE"}, {day: "Wednesday", abbr: "WED"}, {day: "Thursday", abbr: "THU"}, {day: "Friday", abbr: "FRI"}, {day: "Saturday", abbr: "SAT"}];
    
    return (
      <Container fluid className="background">
        <Row className="title">
          <div class="profile-text">Settings</div>
        </Row>
        <hr></hr>
        <Row xs="2" className="parent">
          <Col xl="6">
            <ListGroup className="heading-text">
              <ListGroupItem>
                <img src={this.state.profile_pic} className="img-responsive"></img>
              </ListGroupItem>
              <ListGroupItem>
                <span className="heading-item">{this.state.first_name + " " + this.state.last_name}</span>
                <a href="#" className="modal-link" onClick={this.toggleNameModal}>
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
                <a href="#" className="modal-link" onClick={this.togglePriceModal}>
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
                <a href="#" className="modal-link" onClick={this.toggleIntervalModal}>
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
                  {this.state.schedule.map((time_blocks, i) => 
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
                              {this.state.temp_schedule[this.state.schedule_tab].map((block, i) => 
                                <ListGroupItem className="body-text" key={i}>
                                  {this.formatTime(block)}
                                  <Button color="link" className="list-remove" value={block} onClick={this.handleTimeBlockRemove.bind(this, i)}>Remove <FontAwesomeIcon icon={faBan} className="font-adj"/></Button>
                                </ListGroupItem>
                              )}
                              {this.state.added_times[this.state.schedule_tab].map((block, i) => 
                                <Form key={i}>
                                  <ListGroupItem className="body-text">
                                    <InputGroup>
                                      <TimePicker
                                        showSecond={false}
                                        value={moment(('0000' + block[0]).slice(-4), 'HHmm')}
                                        defaultValue={moment().hour(0).minute(0)}
                                        onChange={this.handleTempTimeChange.bind(this, i, 0)}
                                        format={'h:mm a'}
                                        minuteStep={this.state.meeting_interval}
                                        allowEmpty={false}
                                        use12Hours={true}
                                        inputReadOnly={true}
                                      />
                                      <TimePicker
                                        showSecond={false}
                                        value={moment(('0000' + block[1]).slice(-4), 'HHmm')}
                                        defaultValue={moment().hour(0).minute(0)}
                                        onChange={this.handleTempTimeChange.bind(this, i, 1)}
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
                      <ListGroupItem className="body-text" key={i}>{course}</ListGroupItem>
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
                            {course}
                            <Button color="link" className="list-remove" value={course} onClick={this.handleCourseRemove}>Remove <FontAwesomeIcon icon={faBan} className="font-adj"/></Button>
                          </ListGroupItem>
                        )}
                        {this.state.added_courses.map((course, i) => 
                          <Form key={i}>
                            <ListGroupItem className="body-text">
                              <InputGroup>
                                <Autocomplete className="list-add-input"
                                  getItemValue={(item) => item}
                                  items={this.state.course_catalog}
                                  renderItem={(item, isHighlighted) =>
                                    <div key={item} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                      {item}
                                    </div>
                                  }
                                  value={course || ''}
                                  onChange={this.handleTempCourseChange.bind(this, i)}
                                  onSelect={(index, val) => this.handleAutofillCourse(i, val)}
                                />
                                <Button color="link" className="list-add" onClick={(c) => this.handleTempCourseAdd(course)}><FontAwesomeIcon icon={faCheck} className="font-adj"/></Button>
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

export default Settings;
