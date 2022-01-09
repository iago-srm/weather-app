import * as React from 'react';
import {
  AutoCompleteError,
  LoadingAutoComplete,
  SearchResult
} from './search-result.component';
import { UIContext } from '../../services/ui-context.provider';
import { SuggestionsBoxStyled } from './suggestions-box.style';

export const SuggestionsBox = (): JSX.Element => {

  const { 
    suggestionsBoxOpen,
    searchResults,
    loading,
    hasInputValue,
    autoCompleteError 
  } = React.useContext(UIContext);

  return (
    <SuggestionsBoxStyled open={suggestionsBoxOpen}>
      {loading && <LoadingAutoComplete/>}
      {autoCompleteError && <AutoCompleteError message={autoCompleteError}/>}
      {!loading && !searchResults.length && hasInputValue && 'não encontramos sugestões :('}
      {!loading && suggestionsBoxOpen && searchResults.map((result, i) => (
        <SearchResult 
          key={i} 
          {...result}
        />
      ))}
    </SuggestionsBoxStyled>
  );
};