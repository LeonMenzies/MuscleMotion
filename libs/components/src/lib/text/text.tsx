import styled from 'styled-components';

/* eslint-disable-next-line */
export interface TextProps {}

const StyledText = styled.div`
  color: pink;
`;

export function Text(props: TextProps) {
  return (
    <StyledText>
      <h1>Welcome to Text!</h1>
    </StyledText>
  );
}

export default Text;
