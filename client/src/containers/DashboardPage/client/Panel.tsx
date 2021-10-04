import React from "react";
import classNames from "classnames";
import {Button, Navbar} from "reactstrap";
import {FormParent} from "../../../components/clientFlow/FormParent";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../../store/ClientFlowData/slice";
import {selectClientFlowData, selectSidebarToggled} from "../../../store/ClientFlowData/selectors";
import { useParams } from "react-router-dom";
import Meetings from "./meetings";
import {Helmet} from 'react-helmet';
import styled from "styled-components";

interface IParams {
    panelContent: string;
}

export const Panel = () => {
    let dispatch = useDispatch();
    let sidebarToggled = useSelector(selectSidebarToggled);
    let clientFlowData = useSelector(selectClientFlowData);
    let steps = ["Subject", "Class", "Tutor", "Time", "Notes"];

    let params: IParams = useParams();

    let body = <FormParent />;
    if (params.panelContent === 'meetings') {
        body = <Meetings />;
    }

    const renderSteps = () => {
       let flow = [];
       flow.push(<FlowText>Schedule a tutoring session {"→"} &nbsp;</FlowText>);

       steps.forEach((step, index) => {
           if(clientFlowData.currentStep === index)
               flow.push(<FlowText><b style={{color: 'black'}}> {step} </b></FlowText>)
           else
               flow.push(<FlowText> {step} </FlowText>)

           if(index != 4)
               flow.push(<FlowText> &nbsp; {"→"} &nbsp;</FlowText>)
       })

        return flow;
    }

    return (
        <div id="panel-wrapper">
            <Helmet>
                <meta charSet="utf-8" />
                <title>TutorBase - Dashboard</title>
            </Helmet>

            <Navbar className={classNames("navbar-expand-lg", "navbar-light", "bg-light", "border-bottom", "shadow")}>
                <Button className="btn-red" id="menu-toggle" onClick={() => {
                    dispatch(actions.toggleSidebar());
                }} style={{marginLeft: '0.5em'}}>
                    ☰
                </Button>

                {params.panelContent !== "meetings" && (
                    <Container>
                        {renderSteps().map((component, index) => (
                            <React.Fragment key={index}>
                                { component }
                            </React.Fragment>
                        ))}
                    </Container>
                )}
            </Navbar>

            <div className="container-fluid">{body}</div>
        </div>
    );
}

export default Panel;

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const FlowText = styled.p`
    color: gray;
    font-size: 20px;
`
