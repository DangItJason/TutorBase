import React, { Component } from "react";
import { Button } from "reactstrap";
import "./MeetingCard.css";

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
    let cardType = 'upcoming-card';
    if(this.props.appointment.color === 'Completed') {
      cardType = 'completed-card';
    } else if(this.props.appointment.color === 'Denied') {
      cardType = 'denied-card';
    } else if(this.props.appointment.color === 'Pending') {
      cardType = 'pending-card';
    }

    let card = <div className={'compressed-card ' + cardType} onClick={this.toggleCard}></div>;
    if (this.state.cardExpanded) {
      card = <div className={'expanded-card ' + cardType} onClick={this.toggleCard}></div>;
    }
    return (<>{card}</>);
  }
}

export default MeetingCard;
