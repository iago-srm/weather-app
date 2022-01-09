import * as React from 'react';
import styled from 'styled-components';

interface ModalProps {
  onClose: () => void;
  children: any;
}

const ModalStyled = styled.div<ModalProps>`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalContentStyled = styled.div`
  border-radius: 10px;  
  padding: 15px;
  background-color: white;
  position: relative;
  opacity: 1;
  width: 50%;
  @media(max-width: 900px) {
    width: 60%;
  }
  @media(max-width: 760px) {
    width: 75%;
  }
  @media(max-width: 550px) {
    width: 90%;
  }
`;

const buttonSize = '25px';

const CloseButtonContainerStyled = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: ${buttonSize};
  height: ${buttonSize};
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const CloseButtonStyled = styled.div`
  margin: 0 auto;
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 5px;
    height: ${buttonSize};
    background-color: #333;
    border-radius: 2px;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;

export const Modal = (props: ModalProps): JSX.Element => {

  const handleOutsideClick = (e: any) => {
    if(e.target.id == 'outside') props.onClose();
  };

  return (
    <ModalStyled {...props} id='outside' onClick={handleOutsideClick}>
      <ModalContentStyled >
        <CloseButtonContainerStyled onClick={props.onClose}>
          <CloseButtonStyled/>
        </CloseButtonContainerStyled>
        {props.children}
      </ModalContentStyled>
    </ModalStyled>
  );
};