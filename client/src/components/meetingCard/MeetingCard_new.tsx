import React, { useEffect, useState } from "react";
import "./MeetingCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import { Appointment, User } from "../../services/api.types";
import { api } from "../../services/api";

interface IProps {
    appt: Appointment,
}

const monthMap = new Map([
    [1, "January"],
    [2, "February"],
    [3, "March"],
    [4, "April"],
    [5, "May"],
    [6, "June"],
    [7, "July"],
    [8, "August"],
    [9, "September"],
    [10, "October"],
    [11, "November"],
    [12, "December"],
])

function BreakDownTime(standard_time: String): Array<String> {
    let date_time = standard_time.split("T")

    let date_arr = date_time[0].split("-")
    let month = monthMap.get(Number(date_arr[1])) ? monthMap.get(Number(date_arr[1])) : " ";
    let date = month + " " + date_arr[2] + ", " + date_arr[0]

    let time_arr = date_time[1].split(":");
    let meridian = " AM"
    let hour = Number(time_arr[0])
    if (hour > 12) {
        hour -= 12
        meridian = " PM"
    }
    let time = String(hour) + ":" + time_arr[1] + meridian;
    console.log(time)
    return [date,time];
}

function CapitalizeFirstLetter(str:String): String {
    let string_arr = str.split(" ");
    let new_arr:string[] = []
    for (const word of string_arr) {
        new_arr.push(word.charAt(0).toUpperCase() + word.slice(1))
    }
    return new_arr.join(" ");
}

export function MeetingCard(props: IProps) {
    let { appt } = props;
    let [cardType] = useState<String>(appt.confirmed ? "upcoming-card" : "pending-card");
    let [cardStatus] = useState<String>(appt.confirmed ? "Upcoming" : "Pending");
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
        const getUser = async () => {
            return (await api.GetUserById(appt.client_id)).data;
        }
        getUser().then(value => {setClientData(value[0]);})
    }, [appt.client_id]);

    let name = CapitalizeFirstLetter(clientData.first_name + " " + clientData.last_name);
    let location = CapitalizeFirstLetter(appt.location);
    let date_time = BreakDownTime(appt.start_time);
    
    let cardTag = <div className={"card-status"}>{cardStatus}</div>;
    if (cardStatus === "Pending") {
        cardTag = (
            <>
                <div className={"card-icon"}>
                    <Button color="success">
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                </div>
                <div className={"card-status"}>
                    {cardStatus}
                </div>
            </>
        );
    }

    let upperCardContent = (
        <>
            <div className={"card-name"}>{name}</div>
            <div className={"card-location"}>{location}</div>
            <div className={"card-time"}>{date_time[0] + " at " + date_time[1]}</div>
        </>
    );
    let card = (
        <div 
            className={"compressed-card " + cardType} 
            onClick={(e) => {
                toggleCardExpansion(!cardExpanded)
            }}
        >
            <div className={"card-container-start"}>{upperCardContent}</div>
            <div className={"card-container-end"}>{cardTag}</div>
        </div>
    );

    if(cardExpanded) {
        card = (
            <div 
                className={"expanded-card " + cardType} 
                onClick={(e) => {
                    toggleCardExpansion(!cardExpanded)
                }}
            >
                <div className={"card-container-start-expanded"}>{upperCardContent}</div>
                <div className={"card-container-end-expanded"}>{cardTag}</div>

                <div className={"card-container-item "}>Client Notes:</div>
                <div className={"break"}></div> 
                <div className={"client-notes"}>{appt.notes}</div>
            </div>
        );
    }
    return <>{card}</>;
}