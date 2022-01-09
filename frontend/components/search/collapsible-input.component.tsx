/* eslint-disable react/display-name */
import * as React from 'react';
import {
  SearchBoxInputStyled,
  DeleteButtonStyled,
  LeftCollapsibleButtonStyled
} from './collapsible-input.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UIContext } from '../../services/ui-context.provider';
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { autocompleteAPI } from '../../services/apis';
import { useDebouncedCallback } from 'use-debounce';
import { SearchResult } from '../../services/ui-context.provider';

export const CollapsibleInput = (): JSX.Element => {

  const inputRef = React.useRef<HTMLInputElement>(null);
  const { 
    setSuggestionsBoxOpen, 
    setInputCollapsed, 
    inputCollapsed,
    setLoading, 
    setSearchResults,
    setHasInputValue,
    selectedSearch,
    setAutoCompleteError,
    focusedOnCanvas,
    setFocusedOnCanvas
  } = React.useContext(UIContext);

  const handleDeleteButton = () => {
    if(inputRef && inputRef.current.value) {
      inputRef.current.value = '';
      inputRef.current.focus();
      setSuggestionsBoxOpen(false);
    }
  }
  
  const handleCollapseButton = () => {
    setInputCollapsed((prev: boolean) => !prev);
    if(inputCollapsed) inputRef.current.focus();
  };

  const handleInputChange = useDebouncedCallback(() => {
    if(inputRef.current?.value) {
      setHasInputValue(true);
      setLoading(true);
      setSuggestionsBoxOpen(true);
      autocompleteAPI(inputRef.current?.value).then(result => {
        const results: SearchResult[] = [];
        result.data.forEach((prediction: any) => {
          if(prediction.types.includes('locality')){
            results.push({
              result: prediction.description,
              substrings: prediction.matched_substrings,
              placeId: prediction.place_id
            });
          }
        });
        setSearchResults(results);
        setSuggestionsBoxOpen(true);
        setLoading(false);
        setAutoCompleteError(undefined);
      }).catch(err => {
        console.log('houve um erro: '+err);
        setAutoCompleteError(err);
      });
    } else {
      setHasInputValue(false);
    }
  }, 500);

  React.useEffect(() => {
    if(inputRef.current){
      inputRef.current.oninput = handleInputChange.callback;
      inputRef.current.onfocus = () => setFocusedOnCanvas(false);
    }
  });

  React.useEffect(() => {
    if(selectedSearch) {
      inputRef.current.value = selectedSearch;
    }
  }, [selectedSearch]);

  React.useEffect(() => {
    if(focusedOnCanvas) inputRef.current.value = selectedSearch;
  }, [focusedOnCanvas, selectedSearch]);

  return (
    <>
      <SearchBoxInputStyled ref={inputRef} type="text" collapsed={inputCollapsed}/>
        <DeleteButtonStyled 
          collapsed={inputCollapsed}
          active={inputRef.current?.value ? true : false} 
          onClick={handleDeleteButton}
        >
        <FontAwesomeIcon icon={faTimes} size='lg'/>
      </DeleteButtonStyled>
      <LeftCollapsibleButtonStyled 
          title={inputCollapsed ? 'Expandir caixa de pesquisa' : 'Encolher caixa de pesquisa'}
          onClick={handleCollapseButton}
          collapsed={inputCollapsed}
        >
          <FontAwesomeIcon icon={inputCollapsed ? faChevronRight : faChevronLeft}/>
      </LeftCollapsibleButtonStyled>
    </>
  );
}