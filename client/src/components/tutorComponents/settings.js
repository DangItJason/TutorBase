import React, { Component } from "react";
import classNames from "classnames";
import { Container, Row, Col, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, InputGroup, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faBan, faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Slider from 'react-rangeslider';
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
    courses: [],
    temp_courses: [],
    added_courses: [],
    add_course: false,
    price_modal: false,
    name_modal: false,
    courses_modal: false,
    desc_modal: false
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

  handleTempCourseAdd = (course) => {
    this.setState(prevState => ({ temp_courses: [...prevState.temp_courses, course],
      added_courses: this.state.added_courses.filter(a_course => a_course != course)
    }));
  }

  handleTempCourseRemove = (index) => {
    this.setState({ added_courses: this.state.added_courses.filter((c, i) => index != i) })
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
    this.setState({ courses: this.state.temp_courses, add_course: false });
    fetch("http://localhost:9000/tutor-operations/courses", {
      method: "PUT",
      body: JSON.stringify({email: this.state.email, courses: this.state.temp_courses}),
      headers: {"Content-Type": "application/json"},
    })
    this.toggleCoursesModal(e);
  }

  cancelCoursesChange = (e) => {
    this.setState({ temp_courses: this.state.courses, add_course: false });
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
                {/*<span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>*/}
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
                {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sit amet metus pharetra neque vestibulum lobortis in maximus
                tortor. Praesent vitae placerat dolor, pellentesque egestas
                orci. Pellentesque pharetra aliquet iaculis. Cras non urna
                magna. Integer erat tortor, porta pharetra sodales in, fringilla
                eu nisi. In lacus nunc, scelerisque a velit vitae, placerat
                volutpat arcu. Donec a erat id nulla molestie porttitor. Duis
                pellentesque mauris quis libero ultrices imperdiet. Vestibulum
                vel odio cursus ligula aliquam dignissim ac nec tellus.
                Vestibulum massa sem, scelerisque nec ullamcorper elementum,
                congue sed diam. Duis volutpat tincidunt est vel pretium. Proin
                at leo at risus viverra varius eget ac lorem. Praesent erat
                risus, semper quis tincidunt sit amet, posuere non mauris. Duis
                placerat fermentum interdum. Aliquam ornare, sem id pretium
                commodo, velit odio porttitor augue, et fringilla augue eros ac
                velit. Fusce fermentum facilisis urna in consequat. Ut aliquam
                purus nec metus hendrerit molestie. Donec eu varius eros, quis
                condimentum neque. Donec porttitor aliquet leo id tincidunt.
                Nunc purus nisi, volutpat id dui sed, pretium ultrices sapien.
                Etiam quis tempor justo. In sit amet nulla congue nulla auctor
                mollis. Quisque vel tempus sapien. Suspendisse dignissim diam id
                lobortis auctor. Ut et ullamcorper purus.*/}
                </div>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col xl="6">
            <ListGroup className="heading-text">
              <ListGroupItem>
                <span className="heading-item">Availability</span>
                <span className="heading-item"><FontAwesomeIcon icon={faEdit} className="font-adj"/></span>
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
                            <Input className="list-add-input" value={course || ''} onChange={this.handleTempCourseChange.bind(this, i)}/>
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
