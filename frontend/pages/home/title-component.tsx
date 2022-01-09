import * as React from 'react';
import { BigCloud } from './clouds.component';
import { IWindowSize } from './home-page';
import { HeroTitle } from './home-page.styles';

interface ITitleProps {
  windowSize: IWindowSize;
}

const titleCenter = {
  cloud: {
    x: 20,
    y: 60
  },
  words : {
    x: 5,
    y: 80
  }
}

export const Title: React.FC<ITitleProps> = ({
  windowSize
}) => {

  const [mousePosition, setMousePosition] = React.useState({x: 0, y: 0});
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({x: e.pageX, y: e.pageY});
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  React.useEffect(() => {
    setScale(0.4 + (windowSize.width/2500))
  }, [windowSize]);

  return (
    <>
      <BigCloud
        xTranslate={(windowSize.width - 5*mousePosition.x)/100}
        yTranslate={(windowSize.height - 5*mousePosition.y)/100}
        center={{
          x: windowSize.width * titleCenter.cloud.x/100,
          y: windowSize.height * titleCenter.cloud.y/100,
        }}
        scale={scale}
      >
        <HeroTitle 
        transform={`translate(${(windowSize.width - 3*mousePosition.x)/100} ${(windowSize.height - 3*mousePosition.y)/100}) scale(${scale})`} 
        x={`${titleCenter.words.x/100}%`} y={`${titleCenter.words.y/100}%`}
      >
        O tempo
      </HeroTitle>
      </BigCloud>
      
    </>
  )
};