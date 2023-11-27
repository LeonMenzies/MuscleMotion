import styled from 'styled-components';

/* eslint-disable-next-line */
export interface PageNotFoundProps {}

export function PageNotFound(props: PageNotFoundProps) {
  return (
    <StyledPageNotFound>
      <h1>PageNotFound</h1>
    </StyledPageNotFound>
  );
}

export default PageNotFound;

const StyledPageNotFound = styled.div`
  color: pink;
`;
