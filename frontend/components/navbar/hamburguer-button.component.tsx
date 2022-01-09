import * as React from 'react';
import styled, { css } from "styled-components";

const HamburguerContainerStyled = styled.div`
  cursor: pointer;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const hamburguerBars = css`
  width: 50px;
  height: 6px;
  border-radius: 5px;
  transition: all .5s ease-in-out;
  background-color: white;
`;

interface HamburguerButtonStyledProps {
  drawerMenuOpen: boolean;
  linesGap: number;
}

const HamburguerButtonStyled = styled.div<HamburguerButtonStyledProps>`
  ${hamburguerBars}
  ${props => props.drawerMenuOpen ? `
    background: transparent;
    transform: translateX(-50px);
  ` : ''}
  &::before {
    content: '';
    position: absolute;
    ${hamburguerBars}
    transform: translateY(-${p => p.linesGap}vh);
    ${props => props.drawerMenuOpen ? `
      transform: rotate(45deg) translate(35px, -35px);
    ` : ''}
  }
  &::after {
    content: '';
    position: absolute;
    ${hamburguerBars}
    transform: translateY(${p => p.linesGap}vh);
    ${props => props.drawerMenuOpen ? `
      transform: rotate(-45deg) translate(35px, 35px);
    ` : ''}
  }
`;

interface HamburguerButtonProps{
  navBarHeight: number;
  drawerMenuOpen: boolean;
  setDrawerMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const HamburguerButton: React.FC<HamburguerButtonProps> = ({
  navBarHeight,
  drawerMenuOpen,
  setDrawerMenuOpen
}) => {

  const linesGap = navBarHeight / 4;

  return (
    <HamburguerContainerStyled 
      onClick={() => setDrawerMenuOpen((s: boolean) => !s)}
    >
      <HamburguerButtonStyled drawerMenuOpen={drawerMenuOpen} linesGap={linesGap}/>
    </HamburguerContainerStyled>
  );
};