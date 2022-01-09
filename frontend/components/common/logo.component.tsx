import * as React from 'react';
import styled from "styled-components";

const NavBarLogoText = styled.text`
  font-family: 'Francois One', sans-serif;
  font-size: 1.2rem;
  fill: white;
`;

export const Logo: React.FC = () => {
  return (
    <svg height='100%' width='90px'>
      <NavBarLogoText y='50%'>O tempo</NavBarLogoText>
    </svg>
  );
};