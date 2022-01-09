import * as React from 'react'; 
import { SearchResult as SearchResultType } from '../../services/ui-context.provider';
import Loader from 'react-loader-spinner'
import {
  LoadingBoxStyled,
  SearchResultStyled,
  HighlightedResultStyled
} from './search-result.style';
import { WeatherContext } from '../../services/weather-context.provider'; 
import { UIContext } from '../../services/ui-context.provider';

export const AutoCompleteError = (props: {message: string;}): JSX.Element => {
  return (
    <LoadingBoxStyled>
      {props.message}
    </LoadingBoxStyled>
  );
};

export const LoadingAutoComplete = (): JSX.Element => {
  return (
    <LoadingBoxStyled>
      Buscando sugestões...
      <Loader type="TailSpin" height={40} width={40} color="grey"/>
    </LoadingBoxStyled>
  );
}

export const SearchResult = (props: SearchResultType): JSX.Element => {

  const { setPlaceId } = React.useContext(WeatherContext);
  const { setSuggestionsBoxOpen, setSelectedSearch } = React.useContext(UIContext);

  const handleResultSelection = () => {
    setPlaceId(props.placeId);
    setSuggestionsBoxOpen(false);
    setSelectedSearch(props.result)
  };

  return (
    <SearchResultStyled onClick={handleResultSelection}>
      {props.result.substring(0,props.substrings[0].offset)}
      <HighlightedResultStyled>{props.result.substr(props.substrings[0].offset,props.substrings[0].length)}</HighlightedResultStyled>
      {props.result.substring(props.substrings[0].length)}
    </SearchResultStyled>
  );
}