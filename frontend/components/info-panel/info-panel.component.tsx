import * as React from 'react';
import { InfoPanelStyled, RightCollapsibleButtonStyled } from './info-panel.style';
import { UIContext } from '../../services/ui-context.provider';
import { WeatherContext } from '../../services/weather-context.provider';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  PlaceTitleStyled,
  LocalTimeStyled,
  WeatherIconStyled,
  WeatherDescriptionStyled,
  TemperatureStyled
} from './info-panel.style';

export const InfoPanel = (): JSX.Element => {

  const { 
    infoPanelCollapsed,
    setinfoPanelCollapsed,
    selectedSearch
  } = React.useContext(UIContext);
  const {
    infoPanel,
    infoPanelDetails
  } = React.useContext(WeatherContext);

  return (
    <InfoPanelStyled collapsed={infoPanelCollapsed}>
      <RightCollapsibleButtonStyled 
        title={infoPanelCollapsed ? 'Expandir painel de informações' : 'Encolher painel de informações'} 
        onClick={() => setinfoPanelCollapsed(prev => !prev)}
      >
        <FontAwesomeIcon icon={infoPanelCollapsed ? faChevronLeft : faChevronRight}/>
      </RightCollapsibleButtonStyled>
      <PlaceTitleStyled>{selectedSearch}</PlaceTitleStyled>
      <LocalTimeStyled>{infoPanel?.localTime.split('T')[1].substr(0,5)}</LocalTimeStyled>
      {infoPanel?.descriptions.map((descr, i) => (
        <>
          <WeatherIconStyled key={i} src={`http://openweathermap.org/img/wn/${infoPanel?.icons[i]}@2x.png`}></WeatherIconStyled>
          <WeatherDescriptionStyled key={i + 500}>{descr}</WeatherDescriptionStyled>
        </>
      ))}
      <TemperatureStyled>{infoPanel?.temperature}</TemperatureStyled>
      
      {JSON.stringify(infoPanelDetails)}
    </InfoPanelStyled>
  );
}