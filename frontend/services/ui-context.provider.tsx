import * as React from "react";

export interface SearchResult {
  result: string;
  substrings: {
    offset: number;
    length: number;
  }[];
  placeId: string;
}

interface UIContextState {
  suggestionsBoxOpen: boolean;
  setSuggestionsBoxOpen: (arg: boolean) => void;
  inputCollapsed: boolean;
  setInputCollapsed: (arg: ((prevState: boolean) => boolean)) => void;
  infoPanelCollapsed: boolean;
  setinfoPanelCollapsed: (arg: ((prevState: boolean) => boolean)) => void;
  loading: boolean;
  setLoading: (arg: boolean) => void;
  searchResults: SearchResult[];
  setSearchResults: (arg: SearchResult[]) => void;
  hasInputValue: boolean;
  setHasInputValue: (arg: boolean) => void;
  selectedSearch: string;
  setSelectedSearch: (arg: string) => void;
  autoCompleteError: string;
  setAutoCompleteError: (arg: string) => void;
  focusedOnCanvas: boolean;
  setFocusedOnCanvas: (arg: boolean) => void;
}

export const UIContext = React.createContext<UIContextState | undefined>(undefined);

interface UIProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const UIProvider: React.FC<UIProviderProps> = (props: UIProviderProps) => {

  const [suggestionsBoxOpen, setSuggestionsBoxOpen] = React.useState<boolean>(false);
  const [inputCollapsed, setInputCollapsed] = React.useState(false);
  const [infoPanelCollapsed, setinfoPanelCollapsed] = React.useState(true);
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [hasInputValue, setHasInputValue] = React.useState(false);
  const [selectedSearch, setSelectedSearch] = React.useState<string>(undefined);
  const [loading, setLoading] = React.useState(false);
  const [focusedOnCanvas, setFocusedOnCanvas] = React.useState(false);
  const [autoCompleteError, setAutoCompleteError] = React.useState<string>(undefined);

  React.useEffect(() => {
    if(inputCollapsed) {
      setSuggestionsBoxOpen(false);
    }
  }, [inputCollapsed]);

  React.useEffect(() => {
    const storedVarName = 'weatherApp-selectedSearch';
    if(!selectedSearch) {
      const storedSearchResult = localStorage.getItem(storedVarName);
      if(storedSearchResult) {
        setSelectedSearch(storedSearchResult);
      } else {
        setSelectedSearch("São Paulo, SP, Brasil");
      }
    } else {
      localStorage.setItem(storedVarName, selectedSearch);
    }
  }, [selectedSearch]);
  
  return (
    <UIContext.Provider value={{ 
      suggestionsBoxOpen,
      setSuggestionsBoxOpen,
      inputCollapsed,
      setInputCollapsed,
      searchResults,
      setSearchResults,
      loading,
      setLoading,
      hasInputValue,
      setHasInputValue,
      selectedSearch,
      setSelectedSearch,
      infoPanelCollapsed,
      setinfoPanelCollapsed,
      autoCompleteError,
      setAutoCompleteError,
      focusedOnCanvas,
      setFocusedOnCanvas
    }}>
      {props.children}
    </UIContext.Provider>
  );
}