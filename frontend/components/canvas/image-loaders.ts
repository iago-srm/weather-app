import springTree from '../../assets/spring-tree.png';
import summerTree from '../../assets/summer-tree.png';
import autumnTree from '../../assets/autumn-tree.png';
import winterTree from '../../assets/winter-tree.png';
import mountain from '../../assets/mountainCropped.png';
import cloud from '../../assets/cloud.png';
import moon from '../../assets/moonundersized.png';
import sun from '../../assets/sun.png';

export const loadMountain = (onload: () => any): HTMLImageElement => {
  const image = new Image();
  image.src = mountain;
  image.onload = onload;
  return image;
};

export const loadCloud = (onload: () => any): HTMLImageElement => {
  const image = new Image();
  image.src = cloud;
  image.onload = onload;
  return image;
};

export const loadTree = (onload: () => any, season: string): HTMLImageElement => {
  const image = new Image();
  let tree = summerTree;
  switch(season){
    case 'winter':
      tree = winterTree;
      break;
    case 'autumn':
      tree = autumnTree;
      break;
    case 'spring':
      tree = springTree;
      break;
  }
  image.src = tree;
  image.onload = onload;
  return image;
}

export const loadMoon = (onload: () => any): HTMLImageElement => {
  const image = new Image();
  image.src = moon;
  image.onload = onload;
  return image;
};

export const loadSun = (onload: () => any): HTMLImageElement => {
  const image = new Image();
  image.src = sun;
  image.onload = onload;
  return image;
};