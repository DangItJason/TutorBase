import React, { Component } from "react";
import "./MeetingCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import { Appointment } from "../../services/api.types";

export function MeetingCard(appt: Appointment) {
    const cardtype = appt.confirmed ? "upcoming-card" : "pending-card";
    
    return <></>;
}