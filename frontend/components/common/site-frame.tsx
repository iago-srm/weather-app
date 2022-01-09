import * as React from 'react';
import { SiteContainerStyled, ModeToggleContainerStyled } from './site-frame.styles';
import { SmallCloud, SmallCloudProps } from './clouds.component';
import DarkModeToggle from "react-dark-mode-toggle";
import { Navbar } from "../navbar";
import { buttonFactory, NavBarButtonProps } from '../navbar/buttons';
import { Logo } from './logo.component';

export interface IWindowSize {
  width: number;
  height: number;
}

interface IGetCloudParams {
  windowWidth?: number;
  windowHeight?: number;
}

const getCloudParams: (args: IGetCloudParams) => SmallCloudProps[] = ({
  windowWidth = 1500,
  windowHeight = 600
}) => {
  const smallCloudCount = 30;

  return  [...Array(smallCloudCount)].map(_ => {
    return {
      opacity: Math.random(),
      pathHeight: Math.random() * windowHeight,
      pathXOffset: (Math.random() * 1.5 - 0.5) * windowWidth,
      animationDuration: Math.random() * 10 + 10,
      color: Math.random() * 100 + 155,
      windowWidth,
    }
  })
}

export const SiteFrame: React.FC<{}> = ({children}) => {

  const navBarButtons: NavBarButtonProps[] = [
    {text: "O que é isto?", href: 'about'}, 
    {text: "Para desenvolvedores", href: 'developers'}, 
    {text: "Login/Cadastro", href: 'login'}
  ];

  const [isNight, setIsNight] = React.useState(false);
  const [smallClouds, setSmallClouds] = React.useState(getCloudParams({}));
  const [windowSize, setWindowSize] = React.useState<IWindowSize>({
    width: 0,
    height: 0
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setSmallClouds(getCloudParams({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      }))
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Navbar
        buttonList={navBarButtons}
        buttonFactory={buttonFactory}
        logoComponent={<Logo/>}
      />
      <SiteContainerStyled>
        <ModeToggleContainerStyled >
          <DarkModeToggle
            onChange={setIsNight}
            checked={isNight}
            size={80}
          />
        </ModeToggleContainerStyled>
        <svg width="100%" height="100%" viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}>
          {[...Array(30)].map((_,i) => i).map(i => {
            return <SmallCloud key={i} {...smallClouds[i]}/>
          })}
          {/* <style>
            {{padding: 0}}
          </style> */}
          <foreignObject width="100%" height="100%">
            {children}
          </foreignObject>
        </svg>
      </SiteContainerStyled>
    </>
  );
};
