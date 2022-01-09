import styled from "styled-components";

export interface collapsibleButtonProps {
  collapsed?: boolean;
  title: string;
  onClick: any;
  children: any;
}

export const CollapsibleButtonStyled = styled.span<collapsibleButtonProps>`
  position: absolute;
  font-size: 22px;
  cursor: pointer;
`;