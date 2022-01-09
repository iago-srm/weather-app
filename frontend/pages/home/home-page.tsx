import * as React from 'react';
import { HeroContainerStyled, ModeToggleContainerStyled } from './home-page.styles';
import { Title } from './title-component';
import { SmallCloud } from './clouds.component';
import DarkModeToggle from "react-dark-mode-toggle";
import { SmallCloudProps } from './clouds.component';

export interface IWindowSize {
  width: number;
  height: number;
}

interface HomePageProps {
  smallCloudsProps: SmallCloudProps[];
}

interface IGetCloudParams {
  windowWidth: number;
  windowHeight: number;
}

const getCloudParams: (args: IGetCloudParams) => SmallCloudProps[] = ({
  windowWidth,
  windowHeight
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

export const HomePage: React.FC<HomePageProps> = ({smallCloudsProps}) => {

  return (<h1>Home Page</h1>);
  // const [isNight, setIsNight] = React.useState(false);
  // const [smallClouds, setSmallClouds] = React.useState(smallCloudsProps);
  // const [windowSize, setWindowSize] = React.useState<IWindowSize>({
  //   width: 0,
  //   height: 0
  // });

  // React.useEffect(() => {
  //   const handleResize = () => {
  //     setWindowSize({
  //       width: window.innerWidth,
  //       height: window.innerHeight
  //     });
  //     setSmallClouds(getCloudParams({
  //       windowWidth: window.innerWidth,
  //       windowHeight: window.innerHeight
  //     }))
  //   };
  //   window.addEventListener("resize", handleResize);
  //   handleResize();
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // return (
    // <HeroContainerStyled>
    //   <ModeToggleContainerStyled >
    //     <DarkModeToggle
    //       onChange={setIsNight}
    //       checked={isNight}
    //       size={80}
    //     />
    //   </ModeToggleContainerStyled>
    //   <svg width="100%" height="100%" viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}>
    //     {[...Array(30)].map((_,i) => i).map(i => {
    //       return <SmallCloud key={i} {...smallClouds[i]}/>
    //     })}
    //     {/* <Title windowSize={windowSize}/> */}
    //     {/* <div
    //       style={{
    //         backgroundColor: 'pink',
    //         margin: 'auto',
    //         position: 'absolute',
    //         width: 200,
    //         zIndex: 10
    //       }}
    //     >
    //       Cu
    //     </div> */}
    //     <foreignObject x="0" y="0" width="100%" height="100%">
    //       <div style={{backgroundColor: 'pink'}}>I'm a div inside a SVG.</div>                
    //     </foreignObject>
    //   </svg>
    // </HeroContainerStyled>
  // );
};


// export function getStaticProps(): {props: {smallCloudsProps: SmallCloudProps[]}} {
  
//   const windowWidth = 1500;
//   const windowHeight = 600;

//   return {
//     props: {
//       smallCloudsProps: getCloudParams({
//         windowHeight,
//         windowWidth
//       })
//     }
//   }
// }