import React, {useState} from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import ReactStars from "react-stars";
import {useSelector} from "react-redux";
import {selectClientData} from "../../store/ClientData/selectors";
import {api} from "../../services/api";

interface IProps {
    apptTutorId: string;
}

export default function FeedbackForm({apptTutorId}: IProps) {
    const [formOpen, setFormOpen] = useState(false);
    const clientData = useSelector(selectClientData);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [rating, setRating] = useState(0);

    const submitFeedback = async () => {
        let clientId = clientData.clientId;
        let tutorId = apptTutorId;

        setFormOpen(false)

        await api.SubmitFeedback({
            clientId: clientId,
            tutorId: tutorId,
            message: feedbackMessage,
            rating: rating
        });

        // TODO: Show some Toast UI confirming that the rating was submitted
    }

    return (
        <Container>
            <Button onClick={(e) => {
                setFormOpen(true);
                e.stopPropagation();
            }}
                    style={{
                        minWidth: '60px',
                        lineHeight: '1',
                        position: "relative",
                    }}>
                <div style={{
                    fontSize: "clamp(8px, 1vw, 12px)"
                }}>
                    Rate
                    <FontAwesomeIcon icon={faStar} style={{marginLeft: '5px'}}/>
                </div>
            </Button>

            <Modal
                isOpen={formOpen}
                toggle={() => setFormOpen(!formOpen)}
            >
                <ModalHeader toggle={() => setFormOpen(!formOpen)}>
                    Please give feedback on your session below.
                </ModalHeader>
                <StyledBody>
                    <Label for="exampleText">
                        What did you think of your session?
                    </Label>
                    <Input
                        id="exampleText"
                        name="text"
                        type="textarea"
                        value={feedbackMessage}
                        onChange={(element) => setFeedbackMessage(element.target.value)}
                    />

                    <Label style={{marginTop: '1em'}}>
                        How would you rate your session?
                    </Label>
                    <div style={{lineHeight: '0.75'}}>
                        <ReactStars size={40} value={rating} onChange={new_rating => setRating(new_rating)}/>
                    </div>
                </StyledBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => submitFeedback()}
                    >
                        Submit
                    </Button>
                    {' '}
                    <Button onClick={() => setFormOpen(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}

const Container = styled.div`
  //flex: 1;
  //height: 100%;
  //width: 100%;

  margin: 0.5em;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;

  // DEBUG STYLES //
  //border: red solid 5px;
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledBody = styled(ModalBody)`

  // DEBUG STYLES //
  //border: red solid 5px;
`
