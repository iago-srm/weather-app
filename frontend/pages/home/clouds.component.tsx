import * as React from 'react';

export interface SmallCloudProps {
  opacity: number;
  pathHeight: number;
  pathXOffset: number;
  color: number;
  animationDuration: number;
  windowWidth: number;
}

const cloudPath = `M 441.953 142.352 c -4.447 -68.872 -61.709 -123.36 -131.705 -123.36 c -59.481 0
 -109.766 39.346 -126.264 93.429 c -9.244 -3.5 -19.259 -5.431 -29.729 -5.431 c -42.84 0 -78.164 32.08 
 -83.322 73.523 c -0.309 -0.004 -0.614 -0.023 -0.924 -0.023 c -36.863 0 -66.747 29.883 -66.747 66.747 
 s 29.883 66.746 66.747 66.746 c 4.386 0 8.669 -0.436 12.819 -1.243 c 20.151 27.069 52.394 44.604 
 88.734 44.604 c 31.229 0 59.429 -12.952 79.533 -33.772 c 15.071 15.091 35.901 24.428 58.913 24.428
  c 31.43 0 58.783 -17.42 72.955 -43.127 c 11.676 5.824 24.844 9.106 38.777 9.106 c 48.047 0 86.998 
  -38.949 86.998 -86.996 C 508.738 185.895 480.252 151.465 441.953 142.352 Z`;


export const SmallCloud: React.FC<SmallCloudProps> = ({
  windowWidth, 
  opacity,
  animationDuration,
  color,
  pathHeight,
  pathXOffset
}) => {

  const [motionPath, setMotionPath] = React.useState<string>();

  // Motion path of the small clouds is an upward quadradic Bézier followed by a downward one.
  React.useEffect(() => {
    const controlPoint1X = windowWidth / 4;
    const controlPoint1Y = pathHeight - windowWidth / 8;
    
    const controlPoint2X = 3 * windowWidth / 4;
    const controlPoint2Y = pathHeight + windowWidth / 8;

    setMotionPath(`M-20,${pathHeight} Q${controlPoint1X} ${controlPoint1Y}, ${windowWidth / 2} ${pathHeight} Q${controlPoint2X} ${controlPoint2Y}, ${windowWidth} ${pathHeight}`);
  }, [pathHeight]);

  return (
    <path 
      d={cloudPath} 
      fillOpacity={opacity}
      fill={`rgb(${color},${color},${color})`} 
      transform={`translate(${pathXOffset},${pathHeight}) scale(0.1)`}
    > 
      <animateMotion 
        dur={`${animationDuration}s`}
        fill="freeze"
        repeatCount="indefinite"
        path={motionPath}
      />
    </path>
  );
};

interface BigCloudProps {
  children: any;
  xTranslate: number;
  yTranslate: number;
  scale: number;
  center: {
    x: number;
    y: number;
  }
}
export const BigCloud: React.FC<BigCloudProps> = ({
  xTranslate,
  yTranslate,
  children,
  scale,
  center
})=> {
  return (
    <React.Fragment>
      <path 
        transform={`translate(${xTranslate} ${yTranslate + 50*(1-scale)}) scale(${scale})`}
        x={center.x+"%"}
        y={center.y+"%"}
        // transform={`matrix(${scale}, 0, 0, ${scale}, ${center.x*(1-scale) + xTranslate}, ${center.y*(1-scale) + yTranslate})`}
        d={cloudPath} 
        fill='white'
        // transform="matrix(sx, 0, 0, sy, cx*(1-sx), cy-sy*cy)"
      />
      {children}
    </React.Fragment>
  );
};