import styled from 'styled-components';

export const SearchResultStyled = styled.div`
  position: relative;
  font-family: sans-serif;
  font-weight: 600;
  width: 100%;
  padding: 15px;
  color: #555;
  cursor: pointer;
  &:hover{
    background-color: white;
  }
`;

export const LoadingBoxStyled = styled(SearchResultStyled)`
  display: flex;
  color: black;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;

export const HighlightedResultStyled = styled.span`
  color: blue;
`;
