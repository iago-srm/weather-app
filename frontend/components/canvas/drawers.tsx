import { MutableRefObject } from 'react';
import {
  cloudParams,
  precipitationParticle
} from './canvas.component';
import { Mountains, Trees, ITrees } from '../../assets/paths';
import { timeStamp } from 'console';

const treeScale = 0.5;
const horizonLine = 0.3;

interface drawerParams {
  context: CanvasRenderingContext2D;
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
}

interface imageDrawerParams extends drawerParams {
  img: HTMLImageElement;
}

interface loadingScreenDrawerParams extends drawerParams {
  message: string;
  percentage: number;
}

interface skyDrawerParams extends drawerParams {
  sunPosition: number;
}

interface sunDrawerParams extends imageDrawerParams {
  sunPosition: number;
}

interface cloudDrawerParams extends imageDrawerParams {
  clouds: MutableRefObject<cloudParams[]>;
  deltaTime: number;
}

export const drawBorder = (context: CanvasRenderingContext2D): void => {
  context.strokeStyle = 'blue';
  context.lineWidth = 5;
  context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
};

export const drawHorizon = ({context, canvasRef}: drawerParams): void => {
  const horizon = canvasRef.current.height * horizonLine;
  context.beginPath();
  context.moveTo(0, horizon);
  context.lineTo(canvasRef.current.width, horizon);
  context.strokeStyle = 'black';
  context.stroke();
};

export const drawRain = (
  {context, canvasRef}: drawerParams, 
  rainParticlesDrops: MutableRefObject<precipitationParticle[]>, 
  rainParticlesLong: MutableRefObject<precipitationParticle[]>, 
  deltaTime: number,
  day: boolean
): void => {

  const rainColor = day ? '0,0,0' : '255,255,255';

  rainParticlesLong.current.forEach(p => {
    // draw
    context.beginPath();
    const grd = context.createLinearGradient(0, p.y, 0, p.y + p.l);
    grd.addColorStop(0, `rgba(${rainColor},0)`);
    grd.addColorStop(1, `rgba(${rainColor},` + p.opacity + ")");
    context.fillStyle = grd;
    context.fillRect(p.x, p.y, 1, p.l);
    context.fill();

    // update
    if (p.y >= canvasRef.current.height) {
      p.y = canvasRef.current.height - p.y - p.l * 5;
    } else {
      p.y += 100;
    }
  });

  rainParticlesDrops.current.forEach(p => {

    // draw
    context.beginPath();
    context.moveTo(p.x, p.y);
    context.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
    const grd = context.createLinearGradient(0, p.y, 0, p.y + p.l);
    grd.addColorStop(0, `rgba(${rainColor},0)`);
    grd.addColorStop(1, `rgba(${rainColor},` + p.opacity + ")");
    context.strokeStyle = grd;
    context.lineWidth = 1;
    context.lineCap = 'round';
    context.stroke();

    // update
    p.x += p.xs * (deltaTime / 10);
    p.y += p.ys * (deltaTime / 20);
    if(canvasRef.current){
      if(p.x > canvasRef.current.width || p.y > canvasRef.current.height) {
        p.x = Math.random() * canvasRef.current.width;
        p.y = -40;
      }
    }
  });
};

export const drawCloud = ( 
  {context, canvasRef, img, clouds, deltaTime}: cloudDrawerParams, 
  ): void => {

  //draw
  clouds.current.forEach(cloud => {
    context.globalAlpha = cloud.opacity;
    context.drawImage(
      img,
      cloud.x, 
      cloud.y, 
      img.width * cloud.widthPercentage,
      img.height * cloud.heightPercentage
    );

    cloud.x += cloud.xs * (deltaTime / 10);
    if(canvasRef.current){
      if(cloud.x > canvasRef.current.width) {
        cloud.x = -300;
      }
    }
  });
  context.globalAlpha = 1;
};

export const drawTree = ({context, canvasRef, img}: imageDrawerParams): void => {
  context.drawImage(
    img, 
    canvasRef.current ? canvasRef.current.width / 2 - img.width*treeScale / 2: 0, 
    canvasRef.current ? canvasRef.current.height * 0.9 - img.width*treeScale : 0, 
    img.width*treeScale, 
    img.height*treeScale
  );
};

export const drawMountain = ({context, canvasRef, img}: imageDrawerParams): void => {
  // const transformedImgHeight = img.height / 2;
  // context.drawImage(
  //   img,
  //   0, 
  //   canvasRef.current.height * horizonLine - transformedImgHeight,
  //   canvasRef.current ? canvasRef.current.width : 0, 
  //   transformedImgHeight
  // );
  // console.log(canvasRef.current.width + ' ' + canvasRef.current.height);
  
};

export const drawLoadingScreen = ({context, canvasRef, message, percentage}: loadingScreenDrawerParams): void => {
  context.clearRect(0,0,window.innerWidth, window.innerHeight);
  context.font = '30px serif';
  context.strokeText(message, 100, canvasRef.current.height / 2);
}

export const drawSky = ({context, canvasRef, sunPosition}: skyDrawerParams): void => {
  const getSunriseSunsetGradient = (color: string) => {
    const grad = context.createLinearGradient(0,0,0,canvasRef.current.height * horizonLine);
    grad.addColorStop(0, color);
    grad.addColorStop(0.6, 'white');
    grad.addColorStop(0.8, '#f88');
    return grad;
  }

  const nightSky = '#222';
  const blueSky = '#88f';
  
  if(!sunPosition) {
    context.fillStyle = nightSky;
  } else if(sunPosition <= 15) {
    context.fillStyle = getSunriseSunsetGradient(blueSky);
  } else if(sunPosition >= 165) {
    context.fillStyle = getSunriseSunsetGradient(nightSky);
  } else {
    context.fillStyle = blueSky;
  }
  context.fillRect(0,0,canvasRef.current.width, canvasRef.current.height * horizonLine); 
}

export const drawMoon = ({context, canvasRef, img}: imageDrawerParams): void => {
  context.drawImage(
    img,
    0,
    0, 
    img.width,
    img.height
  );
}

export const drawSun = ({context, canvasRef, img, sunPosition}: sunDrawerParams): void => {

  const horizonCenterY = canvasRef.current.height * horizonLine;
  const horizonCenterX = canvasRef.current.width / 2;
  const pathRayX = horizonCenterX * 0.9;
  const pathRayY = horizonCenterY * 0.9;

  const degreeToRadian = Math.PI/180;

  context.drawImage(
    img,
    horizonCenterX + pathRayX * Math.cos(sunPosition * degreeToRadian), 
    horizonCenterY - pathRayY * Math.sin(sunPosition * degreeToRadian), 
    img.width,
    img.height
  );
}

export class Drawer {

  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  scaler: number;

  constructor(args: drawerParams) {
    const {canvasRef, context} = args;
    this.canvasRef = canvasRef;
    this.context = context;
    this.scaler = canvasRef.current.height / 625;
  }

  drawMountain = (): void => {
    const mountain = Mountains.m1;
    this.context.save();
    
    this.context.translate(
      mountain.xOffset,
      this.canvasRef.current.height * mountain.yOffsetMultiplier
    );
    const scale = mountain.scale * this.scaler;
    this.context.scale(scale, scale);
    this.context.strokeStyle = 'black';
    this.context.stroke(new Path2D(mountain.path));
    
    this.context.restore();
  }

  drawTree = (season: string): void => {
    const tree = Trees[season as keyof ITrees];
    this.context.save();
      
    const xTranslate = this.canvasRef.current.width * 0.5;
    const yTranslate = this.canvasRef.current.height * 0.3;
    this.context.translate(
      xTranslate, yTranslate
    );
    const scale = 0.45 * this.scaler;
    this.context.scale(scale, scale);
    this.context.fillStyle = 'pink';
    tree.forEach(path => {
      this.context.fill(new Path2D(path));
    });
    this.context.restore();
    this.context.save();
    this.context.translate(xTranslate, yTranslate)
    this.context.scale(scale, scale);
    // this.context.scale(0.9, 0.9);
    this.context.fillStyle = 'black';
    tree.forEach(path => {
      this.context.fill(new Path2D(path));
    });
    this.context.restore();
  }
}