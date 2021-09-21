import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { actions } from "../../../store/clientData";
import { Container, Row, ListGroup, ListGroupItem } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./meetings.css";
import MeetingCard from "../../../components/meetingCard/MeetingCard";
import { selectClientFlowData } from "../../../store/ClientFlowData/selectors";
import {actions as clientDataActions} from "../../../store/ClientData/slice";
import { Appointment } from "../../../services/api.types";
import { api } from "../../../services/api";
import { selectClientData } from "../../../store/ClientData/selectors";

export const Meetings = () => {
    let clientFlowData = useSelector(selectClientFlowData);
    let clientData = useSelector(selectClientData);
    let [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    let [dropdownValue, setDropdownValue] = useState<String>("All");
    let [appointments, setAppointments] = useState<Array<Appointment>>([]);
    let dispatch = useDispatch();

    useEffect(() => {
        const getAppointments = async () => {
            return (await api.GetClientAppointments(clientFlowData.clientId)).data;
        }

        getAppointments().then(value => {
                setAppointments(value);
                dispatch(clientDataActions.setAppointment(value));
            }
        )
    }, [dispatch])

    console.log(appointments)

    return <></>;
}