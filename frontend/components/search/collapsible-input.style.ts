import styled from "styled-components";
import { CollapsibleButtonStyled } from '../collapsible-button/collapsible-button.style';

const collapsingTransition = 400;

export const SearchBoxInputStyled = styled.input<{collapsed: boolean}>`
  padding: 0;
  position: absolute; 
  left: 15px;
  top: 10px; 
  border-color: #6dcff6;
  box-shadow: 0 0 5px rgba(109,207,246,.5);
  outline: none;
  border-radius: 10px;
  padding: 8px;
  font-size: 1rem;
  transition: all ${collapsingTransition}ms linear;
  ${props => !props.collapsed ? `
  @media screen and (min-width: 900px) {
    width: 35%;
  }
  @media screen and (max-width: 900px) {
    width: 50%;
  }
  @media screen and (max-width: 480px) {
    width: 90%;
  }
  ` : `
  width: 0;` }
`;

const deleteButtonOffset = 21;

export const DeleteButtonStyled = styled.button<{active: boolean, collapsed: boolean}>`
  position: absolute;
  top: 17px;
  transition: left ${collapsingTransition}ms linear;
  ${props => props.collapsed ? `
  left: -50px;
  ` : `@media screen and (min-width: 900px) {
    left: calc(35% - ${deleteButtonOffset}px);
  }
  @media screen and (max-width: 900px) {
    left: calc(50% - ${deleteButtonOffset}px);
  }
  @media screen and (max-width: 480px) {
    left: calc(90% - ${deleteButtonOffset}px);
  }`}
  border: none;
  background:white;
  color: #ddd;
  font-size: inherit;
  outline: none;
  &:hover{
    color: black;
    cursor: pointer;
  }
`;

const sideOffset = 6;

export const LeftCollapsibleButtonStyled = styled(CollapsibleButtonStyled)`
  background-color: white;
  border-radius: 50%;
  padding: 10px 15px;
  top: 7px;
  color: black;
  box-shadow: -1px 0 6px rgba(0,0,0,0.2);
  transition: transform 200ms ease-in;
  transition: left ${collapsingTransition}ms linear;
  &:hover{
    transform: scale(1.1);
  }
  ${props => props.collapsed ? `
  left: ${sideOffset}px;
  ` : ` @media screen and (min-width: 900px) {
    left: calc(35% + ${sideOffset}px);
  }
  @media screen and (max-width: 900px) {
    left: calc(50% + ${sideOffset}px);
  }
  @media screen and (max-width: 480px) {
    left: calc(90% + ${sideOffset}px);
  }`}
`;