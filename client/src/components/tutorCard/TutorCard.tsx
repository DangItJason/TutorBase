import React, { Component } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import legoDude from "../../assets/lego_dude.jpg";
import { actions } from "../../store/ClientFlowData/slice";

interface IProps {
    tutor: any;
    checked: boolean;
}

// this.props.data.profile_img
// this.props.data.first_name
// this.props.data.last_name
export default function TutorCard({tutor, checked}: IProps){
    console.log("== DEBUG == Tutor Date: ", tutor);

    let dispatch = useDispatch();

    const selectTutor = () => {
        dispatch(actions.setSelectedTutor(tutor._id));
        dispatch(actions.incrementStep());
    }

    return (
        <Container $checked={checked} onClick={() => selectTutor()}>
            <TutorName>{tutor.first_name} {tutor.last_name}</TutorName>
            <TutorImg>
                <img src={legoDude} width={150} height={150} alt="Tutor"></img>
            </TutorImg>
        </Container>
    );
}

interface IContainer {
    $checked: boolean;
}

const Container = styled.div<IContainer>`
  &:hover {
    transform: scale(1.15);
    transition: all 0.5s;

    //filter: brightness(150%);
    background-color: #C93642;
    z-index: 1000;
  }

  transition: all 0.5s;

  display: flex;
  flex-direction: column;
  width: 200px;
  height: 200px;
  
  margin: 0.5em;
  padding: 0.2em;
  
  //border: lightcoral solid 4px;
  border-radius: 0.5em;

  background-color: ${props => props.$checked ? '#C93642' : '#8C252E'};
  
  // DEBUG STYLES //
  //border: red solid 5px;
`;

const TutorName = styled.div`
  color: white;
  
  padding: 0.25em;
  
  width: 100%;
  text-align: center;
  font-size: large;
`;

const TutorImg = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
