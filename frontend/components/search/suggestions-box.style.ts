import styled from 'styled-components';

export const SuggestionsBoxStyled = styled.div<{open: boolean}>`
  box-shadow: 0 0 10px rgba(109,207,246,.5);
  position: absolute;
  top: 55px;
  left: 20px;
  @media screen and (min-width: 900px) {
    width: 30%
  }
  @media screen and (max-width: 900px) {
    width: 45%
  }
  @media screen and (max-width: 480px) {
    width: 85%
  }
`;