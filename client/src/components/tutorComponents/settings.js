import React, { Component } from "react";
import classNames from "classnames";
import { Container, Row, Col, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import "./settings.css";

class Settings extends Component {
  state = {
    profile: "Jason Nguyen",
    email: "test2@gmail.com",
    price: 55,
    temp_price: 55,
    price_modal: false,
    name_modal: false
  };

  handlePriceChange = (value) => {
    this.setState({ temp_price: value })
  }

  savePriceChange = (e) => {
    this.setState({ price: this.state.temp_price });
    fetch("http://localhost:9000/tutor-operations/price", {
      method: "put",
      body: JSON.stringify({email: this.state.email, price: this.state.temp_price}),
      headers: {"Content-Type": "application/json"},
    })
    this.togglePriceModal(e);
  }

  cancelPriceChange = (e) => {
    this.setState({ temp_price: this.state.price });
    this.togglePriceModal(e);
  }

  togglePriceModal = (e) => {
    e.preventDefault();
    this.setState({ price_modal: !this.state.price_modal })
  };

  toggleNameModal = (e) => {
    e.preventDefault();
    this.setState({ name_modal: !this.state.name_modal })
  };
  
  render() {
    return (
      <Container fluid className={classNames("background")}>
        <Row className="title">
          <div class="profile-text">Settings</div>
        </Row>
        <hr></hr>
        <Row xs="2" className="parent">
          <Col xl="6">
            <ListGroup className="heading-text">
              <ListGroupItem className="bubble-container">
                
                <span className="heading-item">{this.state.profile}</span>
                <a href="#" className="modal-link" onClick={this.toggleNameModal}>
                  <span className="heading-item"><FontAwesomeIcon
                    icon={faEdit}
                    className="font-adj"
                  ></FontAwesomeIcon></span>
                </a>
                <Modal isOpen={this.state.name_modal} fade={false} toggle={this.toggleNameModal} className="name-modal">
                  <ModalHeader toggle={this.toggleNameModal}>Edit Name</ModalHeader>
                  <ModalBody>
                    Change your name here.
                    <InputGroup>
                      <Input placeholder={this.state.profile} />
                    </InputGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggleNameModal}>Save</Button>{' '}
                    <Button color="secondary" onClick={this.toggleNameModal}>Cancel</Button>
                  </ModalFooter>
                </Modal>
                
                <span className="heading-item">${this.state.price}/h</span>
                <a href="#" className="modal-link" onClick={this.togglePriceModal}>
                  <span className="heading-item"><FontAwesomeIcon
                  icon={faEdit}
                  className="font-adj"
                  ></FontAwesomeIcon></span>
                </a>
                <Modal isOpen={this.state.price_modal} fade={false} toggle={this.togglePriceModal} className="price-modal">
                  <ModalHeader toggle={this.togglePriceModal}>Edit Price</ModalHeader>
                  <ModalBody>
                    Change your hourly tutoring price rate.
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
                    <Button className="btn-red" onClick={this.savePriceChange}>Save</Button>
                    <Button color="secondary" onClick={this.cancelPriceChange}>Cancel</Button>
                  </ModalFooter>
                </Modal>
                
              </ListGroupItem>
              <br></br>
              <ListGroupItem>
                <span className="heading-item">Description</span>
                <span className="heading-item"><FontAwesomeIcon
                  icon={faEdit}
                  className="font-adj"
                ></FontAwesomeIcon></span>
                
                <hr></hr>
                <div className="body-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
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
                lobortis auctor. Ut et ullamcorper purus.
                </div>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col xl="6">
            <ListGroup className="heading-text">
              <ListGroupItem>
                Availability
                <FontAwesomeIcon
                  icon={faEdit}
                  className="font-adj"
                ></FontAwesomeIcon>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Settings;
