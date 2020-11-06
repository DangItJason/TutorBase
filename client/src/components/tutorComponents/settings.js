import React, { Component } from "react";
import classNames from "classnames";
import { Container, Row, Col, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, InputGroup, Input, Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faBan, faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Slider from 'react-rangeslider';
import Autocomplete from 'react-autocomplete';
import 'react-rangeslider/lib/index.css';
import "./settings.css";

class Settings extends Component {
  state = {
    first_name: "Jason",
    last_name: "Nguyen",
    email: "test2@gmail.com",
    description: "",
    price: 55,
    temp_price: 55,
    course_catalog: [],
    meeting_interval: 30,
    temp_meeting_interval: 30,
    courses: [],
    temp_courses: [],
    added_courses: [],
    course_add_suggestions: [],
    price_modal: false,
    name_modal: false,
    courses_modal: false,
    add_course_err: false,
    add_course_err_msg: "",
    desc_modal: false,
    interval_modal: false
  };

  componentDidMount() {
    fetch("http://localhost:9000/tutor-operations/price/" + this.state.email,  {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    }).then(res => {
       console.log(res);
        return res.json()
      }).then(price => {
        this.setState({ price: price, temp_price: price });
      });

    fetch("http://localhost:9000/tutor-operations/courses/" + this.state.email,  {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    }).then(res => {
        console.log(res);
        return res.json()
      }).then(courses => {
        this.setState({ courses: courses, temp_courses: courses });
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
      this.setState({ first_name: name.first_name});
      this.setState({ last_name: name.last_name});
    });

    fetch("http://localhost:9000/tutor-operations/description/" + this.state.email,  {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    }).then(res => {
      console.log(res);
      return res.json();
    }).then(description => {
      this.setState({ description: description.description});
    });

    fetch("http://localhost:9000/tutor-operations/interval/" + this.state.email, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    }).then(res => {
      console.log(res);
      return res.json();
    }).then(interval => {
      this.setState({ meeting_interval: interval, temp_meeting_interval: interval });
    })
  }

  saveNameChange = (e) => {
    fetch("http://localhost:9000/tutor-operations/name", {
      method: "PUT",
      body: JSON.stringify({email: this.state.email, first_name: this.state.first_name, last_name: this.state.last_name}),
      headers: {"Content-Type": "application/json"}
    });
    this.toggleNameModal(e);
  }

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

  saveDescChange = (e) => {
    fetch("http://localhost:9000/tutor-operations/description", {
      method: "PUT",
      body: JSON.stringify({email: this.state.email, description: this.state.description}),
      headers: {"Content-Type": "application/json"}
    });
    this.toggleDescModal(e);
  }

  cancelPriceChange = (e) => {
    this.setState({ temp_price: this.state.price });
    this.togglePriceModal(e);
  }

  resetCourseErrMsg = () => {
    this.setState({ add_course_err: false, add_course_err_msg: "" });
  }

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

  handleDescChange = (e) => {
    this.setState({description: e.target.value});
  }

  handleFirstChange = (e) => {
    this.setState({first_name: e.target.value});
  }

  handleLastChange = (e) => {
    this.setState({last_name: e.target.value});
  }

  saveCoursesChange = (e) => {
    this.setState({ courses: this.state.temp_courses, add_course_err: false });
    fetch("http://localhost:9000/tutor-operations/courses", {
      method: "PUT",
      body: JSON.stringify({email: this.state.email, courses: this.state.temp_courses}),
      headers: {"Content-Type": "application/json"},
    })
    this.toggleCoursesModal(e);
  }

  cancelCoursesChange = (e) => {
    this.setState({ temp_courses: this.state.courses, add_course_err: false });
    this.toggleCoursesModal(e);
  }

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

  toggleDescModal = (e) => {
    e.preventDefault();
    this.setState({ desc_modal: !this.state.desc_modal });
  };

  toggleIntervalModal = (e) => {
    e.preventDefault();
    this.setState({ interval_modal: !this.state.interval_modal });
  }

  cancelIntervalChange = (e) => {
    this.setState({temp_meeting_interval: this.state.meeting_interval});
    this.toggleIntervalModal(e);
  }

  saveIntervalChange = (e) => {
    this.setState({ meeting_interval: this.state.temp_meeting_interval });
    fetch("http://localhost:9000/tutor-operations/interval", {
      method: "PUT",
      body: JSON.stringify({email: this.state.email, interval: this.state.temp_meeting_interval}),
      headers: {"Content-Type": "application/json"},
    })
    this.toggleIntervalModal(e);
  }

  handleIntervalChange = (value) => {
    this.setState({ temp_meeting_interval: value });
  }
  
  render() {
    return (
      <Container fluid className="background">
        <Row className="title">
          <div class="profile-text">Settings</div>
        </Row>
        <hr></hr>
        <Row xs="2" className="parent">
          <Col xl="6">
            <ListGroup className="heading-text">
              <ListGroupItem className="bubble-container">
                <span className="heading-item">{this.state.first_name + " " + this.state.last_name}</span>
                <a href="#" className="modal-link" onClick={this.toggleNameModal}>
                  <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>
                </a>
                <Modal isOpen={this.state.name_modal} fade={false} toggle={this.toggleNameModal} className="name-modal">
                  <ModalHeader toggle={this.toggleNameModal}>Edit Name</ModalHeader>
                  <ModalBody>
                    Change your name here.
                    <hr/>
                    <InputGroup>
                      First Name:<Input id="first-name" value={this.state.first_name} onChange={this.handleFirstChange}/>
                    </InputGroup>
                    <InputGroup>
                      Last Name:<Input id="last-name" value={this.state.last_name} onChange={this.handleLastChange} />
                    </InputGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button className="btn-red" onClick={this.saveNameChange}>Save</Button>{' '}
                    <Button color="secondary" onClick={this.toggleNameModal}>Cancel</Button>
                  </ModalFooter>
                </Modal>

                <span className="heading-item">${this.state.price}/h</span>
                <a href="#" className="modal-link" onClick={this.togglePriceModal}>
                  <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>
                </a>
                <Modal isOpen={this.state.price_modal} fade={false} toggle={this.togglePriceModal} className="price-modal">
                  <ModalHeader toggle={this.togglePriceModal}>Edit Price</ModalHeader>
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
                <span className="heading-item">Description</span>
                <a href="#" className="modal-link" onClick={this.toggleDescModal}>
                  <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>
                </a>
                <Modal isOpen={this.state.desc_modal} fade={false} toggle={this.toggleDescModal} className="desc-modal">
                  <ModalHeader toggle={this.toggleDescModal}>Edit Description</ModalHeader>
                  <ModalBody>
                    Change your description here.
                    <hr/>
                    <InputGroup>
                      <Input id="description-name" value={this.state.description} type="textarea" onChange={this.handleDescChange} rows="10"/>
                    </InputGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button className="btn-red" onClick={this.saveDescChange}>Save</Button>{' '}
                    <Button color="secondary" onClick={this.toggleDescModal}>Cancel</Button>
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
                <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span><br></br>
                <span className="heading-item">{this.state.meeting_interval + " minute sessions"}</span>
                <a href="#" className="modal-link" onClick={this.toggleIntervalModal}>
                  <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>
                </a>
                <Modal isOpen={this.state.interval_modal} fade={false} toggle={this.toggleIntervalModal} className="interval-modal">
                  <ModalHeader toggle={this.toggleIntervalModal}>Edit Meeting Interval</ModalHeader>
                  <ModalBody>
                    Change the length of your tutor sessions.
                    <hr/>
                    <div className='slider'>
                      <Slider
                        min={15}
                        max={60}
                        step={5}
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
                    <ModalHeader toggle={this.toggleCoursesModal}>Edit Courses</ModalHeader>
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
