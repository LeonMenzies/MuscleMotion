import styled from 'styled-components';

/* eslint-disable-next-line */
export interface LoginContainerProps {}

export function LoginContainer(props: LoginContainerProps) {
  return <StyledLoginContainer>{'text'}</StyledLoginContainer>;
}

export default LoginContainer;

const StyledLoginContainer = styled.div`
  color: pink;
`;
