import React, {useState} from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {faCheck, faStar} from "@fortawesome/free-solid-svg-icons";
import ReactStars from "react-stars";

export default function FeedbackForm() {
    const [formOpen, setFormOpen] = useState(false);

    return (
        <Container>
            <Button onClick={() => setFormOpen(true)}>
                Rate
                <FontAwesomeIcon icon={faStar} style={{marginLeft: '5px'}}/>
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
                    />

                    <Label style={{marginTop: '1em'}}>
                        How would you rate your session?
                    </Label>
                    <div style={{lineHeight: '0.75'}}>
                        <ReactStars size={40}/>
                    </div>
                </StyledBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={function noRefCheck(){}}
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
