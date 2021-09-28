import React, { useEffect, useState } from "react";
import "./MeetingCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import { Appointment, User } from "../../services/api.types";
import { api } from "../../services/api";

export function MeetingCard(appt: Appointment) {
    let [cardType, setCardType] = useState<String>(appt.confirmed ? "upcoming-card" : "pending-card");
    let [cardStatus, setcardStatus] = useState<String>(appt.confirmed ? "Upcoming" : "Pending");
    let [cardExpanded, toggleCardExpansion] = useState<boolean>(false);
    let [clientData, setClientData] = useState<User>({
        _id: "",
        profile_img: "",
        phone: "",
        email: "",
        first_name: "",
        last_name: "",
    });

    useEffect(() => {
        const getAppointments = async () => {
            return (await api.GetUserById(appt.client_id)).data;
        }
        getAppointments().then(value => {setClientData(value[0]);})
    }); 
    
    let cardTag = (
        <div className={"card-container-end"}>
            <div className={"card-status"}>{cardStatus}</div>
        </div>
    )
    let upperCardContent = (
        <>
          <div className={"card-container-start"}>
            <div className={"card-name"}>{clientData.first_name + " " + clientData.last_name}</div>
            <div className={"card-location"}>
              {appt.location}
            </div>
            <div className={"card-time"}>{appt.start_time}</div>
          </div>
          {cardTag}
        </>
    )
    let card = (
        <div 
            className={"compressed-card " + cardType} 
            onClick={(e) => {
                toggleCardExpansion(!cardExpanded)
            }}
        >
            {upperCardContent}
        </div>
    );
    return <>{card}</>;
}