import { coordinates } from './weather-context.provider';

// 'IntensityDecider' functions return intensity levels from 0 to 3
type intensity = 0 | 1 | 2 | 3;

export const rainIntensityDecider = (weatherCode: string): intensity => {
  switch(weatherCode) {
    case '500':
    case '520':
    case '200':
    case '210':
      return 1;
    case '501':
    case '511':
    case '521':
    case '531':
    case '201':
    case '221':
    case '313':
      return 2;
    case '211':
    case '502':
    case '503':
    case '504':
    case '522':
    case '314':
      return 3;
    default:
      return 0;
  }
};

export const snowIntensityDecider = (weatherCode: string): intensity => {
  switch(weatherCode) {
    case '600':
    case '612':
    case '615':
    case '620':
      return 1;
    case '601':
    case '611':
    case '613':
    case '616':
    case '621':
      return 2;
    case '602':
    case '622':
      return 3;
    default:
      return 0;
  }
};

export const thunderIntensityDecider = (weatherCode: string): intensity => {
  switch(weatherCode){
    case '210':
      return 1;
    case '200':
    case '201':
    case '202':
    case '211':
    case '221':
    case '230':
    case '231':
    case '232':
      return 2;
    case '212':
      return 3;
    default:
      return 0;
  }
};

export const drizzleIntensityDecider = (weatherCode: string): intensity => {
  switch(weatherCode){
    case '300':
    case '310':
    case '230':
      return 1;
    case '231':
    case '301':
    case '313':
    case '311':
    case '321':
    case '314':
      return 2;
    case '232':
    case '312':
    case '302':
      return 3;
    default:
      return 0;

  }
};

export const seasonDecider = (coord: coordinates): string => {
    const month = (new Date()).getMonth();
    if(coord.lat > 0) {
      if(month >= 2 && month <= 4){
        return 'spring';
      } else if(month >= 5 && month <= 7) {
        return 'summer';
      }else if(month >= 8 && month <= 10) {
        return 'autumn';
      }else if(month >= 11 || month <= 1) {
        return 'winter';
      }
    } else if(coord.lat < 0) {
      if(month >= 2 && month <= 4){
        return 'autumn';
      } else if(month >= 5 && month <= 7) {
        return 'winter';
      }else if(month >= 8 && month <= 10) {
        return 'spring';
      }else if(month >= 11 || month <= 1) {
        return 'summer';
      }
    }
  }