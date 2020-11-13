import React, { Component } from "react";
import "./MeetingCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";

class MeetingCard extends Component {
  constructor(props) {
    super(props);
    this.toggleCard = this.toggleCard.bind(this);
    this.state = {
      cardExpanded: false,
    };
  }

  toggleCard = () => {
    this.setState({
      cardExpanded: !this.state.cardExpanded,
    });
  };

  render() {
    let cardType = "upcoming-card";

    if (this.props.appointment.color === "Completed") {
      cardType = "completed-card";
    } else if (this.props.appointment.color === "Denied") {
      cardType = "denied-card";
    } else if (this.props.appointment.color === "Pending") {
      cardType = "pending-card";
    }

    let card = (
      <div className={"compressed-card " + cardType} onClick={this.toggleCard}>
        <div className={"card-container-start"}>
          <div className={"card-name"}>{this.props.appointment.name}</div>
          <div className={"card-location"}>
            {this.props.appointment.location}
          </div>
          <div className={"card-time"}>{this.props.appointment.time}</div>
        </div>

        {cardType === "pending-card" && (
          <div className={"card-container-end"}>
            <div className={"card-icon"}>
              <Button><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></Button>
            </div>
            <div className={"card-icon"}>
              <Button><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></Button>
            </div>
            <div className={"card-status"}>{this.props.appointment.color}</div>
          </div>
        )}

        {cardType === "denied-card" && (
          <div className={"card-container-end"}>
            <div className={"card-status"}>{this.props.appointment.color}</div>
          </div>
        )}

        {cardType === "upcoming-card" && (
          <div className={"card-container-end"}>
            <div className={"card-status"}>{this.props.appointment.color}</div>
          </div>
        )}

        {cardType === "completed-card" && (
          <div className={"card-container-end"}>
            <div className={"card-status"}>{this.props.appointment.color}</div>
          </div>
        )}
      </div>
    );
    if (this.state.cardExpanded) {
      card = (
        <div className={"expanded-card " + cardType} onClick={this.toggleCard}>
          <div className={"card-container-start-expanded"}>
            <div className={"card-name"}>{this.props.appointment.name}</div>
            <div className={"card-location"}>
              {this.props.appointment.location}
            </div>
            <div className={"card-time"}>{this.props.appointment.time}</div>
          </div>

          {cardType === "pending-card" && (
            <div className={"card-container-end-expanded"}>
              <div className={"card-icon"}>
                <Button><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></Button>
              </div>
              <div className={"card-icon"}>
                <Button><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></Button>
              </div>
              <div className={"card-status"}>
                {this.props.appointment.color}
              </div>
            </div>
          )}

          {cardType === "denied-card" && (
            <div className={"card-container-end-expanded"}>
              <div className={"card-status"}>
                {this.props.appointment.color}
              </div>
            </div>
          )}

          {cardType === "upcoming-card" && (
            <div className={"card-container-end-expanded"}>
              <div className={"card-status"}>
                {this.props.appointment.color}
              </div>
            </div>
          )}

          {cardType === "completed-card" && (
            <div className={"card-container-end-expanded"}>
              <div className={"card-status"}>
                {this.props.appointment.color}
              </div>
            </div>
          )}
          <div className={"card-container-item "}>Client Notes:</div>
          <div className={"break"}></div> 
          <div className={"client-notes"}>
            {this.props.appointment.notes}
          </div>
        </div>
      );
    }

    return <>{card}</>;
  }
}

export default MeetingCard;
