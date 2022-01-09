import styled from "styled-components";

export const ContainerStyled = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 4px solid white;
  background-color: black;
  font-family: 'Francois One', sans-serif;
  color: white;
  position: sticky;
  height: 9vh;
  z-index: 100;
`;

export const LogoContainerStyled = styled.div`
  height: 100%;
`;

interface DrawerMenuStyledProps {
  navBarHeight: number;
}

export const DrawerMenuContainerStyled = styled.div<DrawerMenuStyledProps>`
  width: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: ${p => p.navBarHeight}vh;
`;

export const RightButtonsContainerStyled = styled.div``;