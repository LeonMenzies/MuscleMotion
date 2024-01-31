import styled from 'styled-components';

/* eslint-disable-next-line */
export interface IconButtonProps {}

const StyledIconButton = styled.div`
  color: pink;
`;

export function IconButton(props: IconButtonProps) {
  return (
    <StyledIconButton>
      <h1>Welcome to IconButton!</h1>
    </StyledIconButton>
  );
}

export default IconButton;
