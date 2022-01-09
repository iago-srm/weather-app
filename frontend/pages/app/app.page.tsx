import * as React from 'react';
import { Canvas, CollapsibleInput, SuggestionsBox, InfoPanel } from '../../components';
import { WeatherProvider } from '../../services/weather-context.provider';
import { UIProvider } from '../../services/ui-context.provider';

const saoPauloId = 'ChIJ0WGkg4FEzpQRrlsz_whLqZs';

export const AppPage = (): JSX.Element => {

  return (
    <UIProvider>
      <WeatherProvider initialPlaceId={saoPauloId}>
          <div style={{position: 'relative', width: '100%'}}>
            <CollapsibleInput/>
            <SuggestionsBox />
            <InfoPanel />
          </div>
        <Canvas/>
      </WeatherProvider>
    </UIProvider>
  );
}
