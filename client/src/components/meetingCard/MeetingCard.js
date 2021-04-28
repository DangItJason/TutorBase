import React, { Component } from "react";
import "./MeetingCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";

class MeetingCard extends Component {
  constructor(props) {
    super(props);
    this.toggleCard = this.toggleCard.bind(this);
    this.acceptPendingCard = this.acceptPendingCard.bind(this);
    this.rejectPendingCard = this.rejectPendingCard.bind(this);
    this.state = {
      cardExpanded: false,
      cardType: "upcoming-card",
      cardSet: false,
      aptColor: this.props.appointment.color
    };
  }

  toggleCard = () => {
    this.setState({
      cardExpanded: !this.state.cardExpanded,
    });
  };

  acceptPendingCard = (e) => {
    this.setState({cardType: "upcoming-card", aptColor: "Upcoming"});
    var url = "http://localhost:9000/meetings/movePending";
    const request = {
      method: "POST",
      body: JSON.stringify({'name': this.props.appointment.name}),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(url, request);

  }

  rejectPendingCard = (e) => {
    this.setState({cardType: "denied-card", aptColor: "Denied"});
    var url = "http://localhost:9000/meetings/denyPending";
    const request = {
      method: "POST",
      body: JSON.stringify({'name': this.props.appointment.name}),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(url, request);
  }

  render() {
    //let cardType = "upcoming-card";

    if (this.props.appointment.color === "Completed" && !this.state.cardSet) {
      this.setState({cardType: "completed-card", cardSet: true});
    } else if (this.props.appointment.color === "Denied" && !this.state.cardSet) {
      this.setState({cardType: "denied-card", cardSet: true});
    } else if (this.props.appointment.color === "Pending" && !this.state.cardSet) {
      this.setState({cardType: "pending-card", cardSet: true});
    }

    let cardTag = (
      <>
        <div className={"card-container-end"}>
          <div className={"card-status"}>{this.state.aptColor}</div>
        </div>
      </>
    )
    if (this.state.cardType === "pending-card") {
      cardTag = (
        <div className={"card-container-end"}>
          <div className={"card-icon"}>
            <Button onClick={this.acceptPendingCard}>
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
            </Button>
          </div>
          <div className={"card-icon"}>
            <Button onClick={this.rejectPendingCard}>
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </Button>
          </div>
          <div className={"card-status"}>{this.state.aptColor}</div>
        </div>
      )
    }

    let upperCardContent = (
      <>
        <div className={"card-container-start"}>
          <div className={"card-name"}>{this.props.appointment.name}</div>
          <div className={"card-location"}>
            {this.props.appointment.location}
          </div>
          <div className={"card-time"}>{this.props.appointment.time}</div>
        </div>
        {cardTag}
      </>
    )

    let card = (
      <div className={"compressed-card " + this.state.cardType} onClick={this.toggleCard}>
        {upperCardContent}
      </div>
    );
    if (this.state.cardExpanded) {
      card = (
        <div className={"expanded-card " + this.state.cardType} onClick={this.toggleCard}>
          <div className={"card-container-start-expanded"}>
            <div className={"card-name"}>{this.props.appointment.name}</div>
            <div className={"card-location"}>
              {this.props.appointment.location}
            </div>
            <div className={"card-time"}>{this.props.appointment.time}</div>
          </div>

          {this.state.cardType === "pending-card" && (
            <div className={"card-container-end-expanded"}>
              <div className={"card-icon"}>
                <Button onClick={this.acceptPendingCard}>
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                </Button>
              </div>
              <div className={"card-icon"}>
                <Button onClick={this.rejectPendingCard}>
                  <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </Button>
              </div>
              <div className={"card-status"}>
                {this.state.aptColor}
              </div>
            </div>
          )}

          {this.state.cardType === "denied-card" && (
            <div className={"card-container-end-expanded"}>
              <div className={"card-status"}>
                {this.state.aptColor}
              </div>
            </div>
          )}

          {this.state.cardType === "upcoming-card" && (
            <div className={"card-container-end-expanded"}>
              <div className={"card-status"}>
                {this.state.aptColor}
              </div>
            </div>
          )}

          {this.state.cardType === "completed-card" && (
            <div className={"card-container-end-expanded"}>
              <div className={"card-status"}>
                {this.state.aptColor}
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
