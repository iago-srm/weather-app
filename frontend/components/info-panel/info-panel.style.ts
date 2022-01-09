import styled from "styled-components";
import { CollapsibleButtonStyled } from '../collapsible-button/collapsible-button.style';

const collapsingTransition = 400;

export const InfoPanelStyled = styled.div<{collapsed: boolean}>`
  transition: transform ${collapsingTransition}ms linear;
  border: 7px solid pink;
  border-radius: 10px;
  background-color: #eee;
  top: 10px;
  position: absolute;
  height: 90vh;
  left: 99%; 
  ${props => props.collapsed ? 
  'transform: none;' : 'transform: translateX(-100%);'}
  @media screen and (min-width: 900px) {
    width: 40%
  }
  @media screen and (max-width: 900px) {
    width: 55%
  }
  @media screen and (max-width: 480px) {
    width: 85%
  }
`;

const sideOffset = 2;

export const RightCollapsibleButtonStyled = styled(CollapsibleButtonStyled)`
  top: 20px;
  background-color: pink;
  color: white;
  border-radius: 5px;
  padding: 10px 7px;
  right: calc(100% + ${sideOffset}px);
`;

export const PlaceTitleStyled = styled.h1``;

export const LocalTimeStyled = styled.span``;

export const WeatherIconStyled = styled.img``;

export const WeatherDescriptionStyled = styled.p``;

export const TemperatureStyled = styled.div``;