import React from 'react';
import styled from 'styled-components';

interface IProps {
    title: string;
    color: string;
    checked: boolean;
    onClick: any;
}

export default function ClientFlowCard({title, color, checked, onClick}: IProps) {
    return (
        <div onClick={onClick}>
            <Container $color={color} $checked={checked}>
                <Title>{title}</Title>
            </Container>
        </div>
    )
}

interface IContainerProps {
    $color: string;
    $checked: boolean;
}

const Container = styled.div<IContainerProps>`
  &:hover {
    -webkit-transform: scale(1.2) rotate(0.2deg);
    transform: scale(1.2) rotate(0.2deg);

    filter: brightness(150%);
    
    transition: 0.5s all;
  }
  
  background-color: ${props => props.$color};

  filter: ${props => props.$checked ? "brightness(150%)" : "brightness(70%)"};
  
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  
  cursor: pointer;
  
  margin: 1em;
  
  width: 180px;
  height: 150px;
  
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 15px;

  transition: 0.5s all;
`;

const Title = styled.p`
  font-size: large;
  color: white;
`;
