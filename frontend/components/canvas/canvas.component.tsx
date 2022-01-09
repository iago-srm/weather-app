import * as React from 'react';
import { CanvasStyled } from './canvas.style';
import { WeatherContext } from '../../services/weather-context.provider'; 
import { UIContext } from '../../services/ui-context.provider'; 
import { loadTree, loadCloud, loadMountain, loadSun, loadMoon } from './image-loaders';
import { 
  drawRain, 
  drawTree, 
  drawMountain, 
  drawCloud,
  drawLoadingScreen,
  drawSky,
  drawSun,
  drawMoon,
  drawHorizon,
  Drawer
} from './drawers';
import { useDebouncedCallback } from 'use-debounce';

export interface precipitationParticle {
  x: number;
  y: number;
  l: number;
  opacity?: number;
  xs: number;
  ys: number;
}
export interface cloudParams {
  x: number;
  y: number;
  widthPercentage: number;
  heightPercentage: number;
  opacity?: number;
  xs: number;
}

export const Canvas = (): JSX.Element => {

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { season, weather, placeId, locale } = React.useContext(WeatherContext);
  const { setFocusedOnCanvas, setinfoPanelCollapsed } = React.useContext(UIContext);
  const rainParticlesDrops = React.useRef<precipitationParticle[]>([]);
  const rainParticlesLong = React.useRef<precipitationParticle[]>([]);
  const clouds = React.useRef<cloudParams[]>([]);
  const [loadedMountain, setLoadedMountain] = React.useState(false);
  const [loadedTree, setLoadedTree] = React.useState(false);
  const [loadedCloud, setLoadedCloud] = React.useState(false);
  const [loadedMoon, setLoadedMoon] = React.useState(false);
  const [loadedSun, setLoadedSun] = React.useState(false);


  const handleCanvasResize = useDebouncedCallback(() => {
    if(canvasRef.current){
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  }, 50);

  const handleCanvasClick = React.useCallback(() => {
    setFocusedOnCanvas(true);
    setinfoPanelCollapsed(() => true);
  }, [setinfoPanelCollapsed, setFocusedOnCanvas]);

  React.useEffect(() => {
    if(canvasRef.current) {
      canvasRef.current.addEventListener('click', handleCanvasClick);
    }
  }, [canvasRef, handleCanvasClick]);

  React.useEffect(() => {
    if(weather?.rainIntensity) {
      const rainDrops = [];
      const rainLong = [];
      if(canvasRef.current){
        for(let i = 0; i < weather.rainIntensity * canvasRef.current.width / 2; i++){
          rainDrops.push({
            x: Math.random() * canvasRef.current.width,
            y:  Math.random() * canvasRef.current.height,
            opacity: Math.random() * 0.2,
            l: Math.random() * 1,
            xs: -4 + Math.random() * 8 + 2,
            ys: Math.random() * 7 + 10
          });
          rainLong.push({
            x: Math.random() * canvasRef.current.width,
            y: Math.random() * canvasRef.current.height,
            l: Math.floor(Math.random() * 830 + 1),
            opacity: Math.random() * 0.2,
            xs: Math.random() * 2 -2,
            ys: Math.random() * 5 + 10
          });
        }
       
      }
      rainParticlesDrops.current = rainDrops;
      rainParticlesLong.current = rainLong;
    }
  }, [weather?.rainIntensity]);

  React.useEffect(() => {
    if(weather?.cloudCover) {
      const thisClouds = [];
      const cloudCount = weather.cloudCover / 3;
      for(let i = 0; i < cloudCount; i ++) {
        thisClouds.push({
          x: Math.random() * canvasRef.current.width,
          y: Math.random() * canvasRef.current.height / 2,
          opacity: Math.random() * 0.6,
          xs: Math.random() * weather.windSpeed / 5,
          widthPercentage: Math.random() * 0.7 + 0.3,
          heightPercentage: Math.random() * 0.7 + 0.3
        });
      }
      clouds.current = thisClouds;
    }
  }, [weather?.cloudCover, weather?.windSpeed]);

  React.useEffect(() => {
    if(placeId) {
      const context = canvasRef.current?.getContext('2d');
      drawLoadingScreen({
        context, 
        canvasRef, 
        message: 'obtendo informações do local', 
        percentage: 50
      });
    }
  });

  React.useEffect(() => {
    if(locale) {
      const context = canvasRef.current?.getContext('2d');
      drawLoadingScreen({
        context, 
        canvasRef, 
        message: 'obtendo condições climáticas', 
        percentage: 100
      });
    }
  }, [locale]);

  React.useEffect(() => {
    // parameters that control animation flow
    let requestId: number;
    let lastRender: number;

    //the context we draw with
    const context = canvasRef.current?.getContext('2d');

    //pre-loading images
    const cloud = loadCloud(() => setLoadedCloud(true));
    // const mountain = loadMountain(() => setLoadedMountain(true));
    // const tree = loadTree(() => setLoadedTree(true), season);
    const moon = loadMoon(() => setLoadedMoon(true));
    const sun = loadSun(() => setLoadedSun(true));

    //the animation loop
    const animate = (currentTime: number) => {
      const drawer = new Drawer({canvasRef, context});

      const deltaTime = currentTime - lastRender;
      
      if(context && canvasRef && deltaTime > 100){

        lastRender = currentTime;

        let loading = false;
        
        if(placeId || locale) {
          loading = true;
        }

        if(!loading) {
          context.clearRect(0,0,window.innerWidth, window.innerHeight);

          if(weather?.sunPosition) drawSky({context, canvasRef, sunPosition: weather.sunPosition});
          drawHorizon({context, canvasRef});
          if(weather?.sunPosition && loadedSun) {
            drawSun({context, canvasRef, img: sun, sunPosition: weather.sunPosition});
          } else if(!weather.sunPosition && loadedMoon) {
            drawMoon({context, canvasRef, img: moon});
          }
          if(loadedCloud) {
            drawCloud({context, canvasRef, img: cloud, clouds, deltaTime});
          }
          // if(loadedMountain) {
          //   drawMountain({context, canvasRef, img: mountain});
          // }
          drawer.drawMountain();
          drawer.drawTree(season);
          // if(loadedTree) {
          //   drawTree({context, canvasRef, img: tree});
          // }
          const day = weather.sunPosition ? true : false;
          drawRain(
            {context, canvasRef}, 
            rainParticlesDrops,
            rainParticlesLong, 
            deltaTime,
            day
          );
        }
        
      }
      //set this to cancel animation when we need it to end
      requestId = requestAnimationFrame(animate);
    }
    //start animation
    lastRender = 0;
    animate(performance.now());

    //clean-up
    return () => cancelAnimationFrame(requestId);
  }, [
    locale, 
    placeId, 
    season, 
    weather?.sunPosition,
    loadedCloud, loadedMountain, loadedTree, loadedMoon, loadedSun]);
  
  React.useEffect(() => {
    handleCanvasResize.callback();
    window.addEventListener("resize", handleCanvasResize.callback);
  }, [handleCanvasResize]);

  return <CanvasStyled ref={canvasRef}/>
}