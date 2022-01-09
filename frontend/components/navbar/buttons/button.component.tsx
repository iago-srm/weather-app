import * as React from 'react';
import styled from "styled-components";
import Link from 'next/link';

import { NavBarButtonProps } from './button-interface';

const ExpandedButtonStyled = styled.li<{active?: boolean}>`
  ${p => p.active ? 'font-weight: bold;' : null}
  cursor: pointer;
  box-sizing: border-box;
  height: 100%;
  position: relative;
  font-size: 1.5rem;
  display: inline-block;
  padding: 0.4em;
  margin: 0 0.75em;
  line-height: 1.25;
  &:hover {
    font-weight: bold;
    &::after {
      content: '';
      position: absolute;
      left:0;
      bottom:0;
      width: 100%;
      height: 5px;
      background-color:red;
    }
  }
  &::before {
    display: block;
    content: attr(title);
    font-weight: bold;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
`;

const DrawerButtonStyled = styled.li<{active?: boolean}>`
  ${p => p.active ? 'font-weight: bold;' : null}
  height: 6vh;
  text-align: center;
  font-family: 'Francois One', sans-serif;
  font-size: 1.2rem;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-block;
`;

const Anchor = styled.a` a {
  text-decoration: none;
`;

export type ButtonFactory = () => ({
  DrawerButton: React.FC<NavBarButtonProps>,
  ExpandedButton: React.FC<NavBarButtonProps>,
})

export const buttonFactory: ButtonFactory = () => {

  const DrawerButton: React.FC<NavBarButtonProps> = ({
    href,
    text,
    onClick,
    selected
  }) => {
    return (
      <DrawerButtonStyled title={text} onClick={onClick} active={selected}>
        {href && <Link href={href}>
          <Anchor>{text}</Anchor>
        </Link>}
      </DrawerButtonStyled>
    )
  }

  const ExpandedButton: React.FC<NavBarButtonProps> = ({
    href,
    text,
    onClick,
    selected
  }) => {
    return (
      <ExpandedButtonStyled title={text} onClick={onClick} active={selected}>
        {href && <Link href={href}>
          <Anchor>{text}</Anchor>
        </Link>}
      </ExpandedButtonStyled>
    )
  }

  return {
    DrawerButton,
    ExpandedButton
  }
}