import React, { Component } from "react";
import classNames from "classnames";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./settings.css";

class Settings extends Component {
  state = {
    profile: "Jason Nguyen",
    price: "55",
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
                <span className="heading-item"><FontAwesomeIcon
                  icon={faEdit}
                  className="font-adj"
                ></FontAwesomeIcon></span>
                <span className="heading-item">${this.state.price}/h</span>
                <span className="heading-item"><FontAwesomeIcon
                  icon={faEdit}
                  className="font-adj"
                ></FontAwesomeIcon></span>
                
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
