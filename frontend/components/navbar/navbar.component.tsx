import * as React from "react";
import { HamburguerButton } from './hamburguer-button.component';
import { ButtonFactory } from './buttons/button.component';
import { NavBarButtonProps } from './buttons/button-interface';
import {
  ContainerStyled,
  DrawerMenuContainerStyled,
  LogoContainerStyled,
  RightButtonsContainerStyled
} from './navbar.component.style';

const navBarHeight = 9; // vh
const responsiveBreakpoint = 760; //px

interface NavBarProps {
  buttonList: NavBarButtonProps[];
  logoComponent?: React.ReactNode;
  buttonFactory: ButtonFactory;
}

export const Navbar = (props: NavBarProps): JSX.Element => {
    
  const {
    ExpandedButton,
    DrawerButton
  } = props.buttonFactory();
  
  const [selectedButtonIndex, setSelectedButtonIndex] = React.useState<number | undefined>(undefined);
  const [drawerMenuOpen, setDrawerMenuOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState<number>(0);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if(windowWidth > responsiveBreakpoint) setDrawerMenuOpen(false);
  }, [windowWidth]);

  const onClickWrapper = (index: number, cb?: (args?: any) => any) => {
    return () => {
      setSelectedButtonIndex(index);
      cb && cb();
    }
  }

  type buttonType = typeof DrawerButton | typeof ExpandedButton;
  const getButtons = (Component: buttonType) => {
    return props.buttonList.map((b,i) => {
      let selected = false;
      if(selectedButtonIndex == i || '/'+b.href == location.pathname) selected = true;
      return (
        <Component selected={selected} key={i} onClick={onClickWrapper(i,b.onClick)} text={b.text} href={b.href}/>
      )
    })
  }
  return (
    <ContainerStyled >
      <LogoContainerStyled>
        {props.logoComponent}
      </LogoContainerStyled>
      {windowWidth < responsiveBreakpoint &&
      <HamburguerButton 
        navBarHeight={navBarHeight}
        drawerMenuOpen={drawerMenuOpen}
        setDrawerMenuOpen={setDrawerMenuOpen}
      />}
      {windowWidth < responsiveBreakpoint && drawerMenuOpen &&
        <DrawerMenuContainerStyled
          navBarHeight={navBarHeight}
        > 
          {getButtons(DrawerButton)}
        </DrawerMenuContainerStyled>}
      {windowWidth > responsiveBreakpoint &&
      <RightButtonsContainerStyled> 
        {getButtons(ExpandedButton)}
      </RightButtonsContainerStyled>}
    </ContainerStyled>
  );
};
