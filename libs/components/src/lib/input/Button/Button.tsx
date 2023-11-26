import { MouseEventHandler } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export function Button(props: ButtonProps) {
  const { text, onClick } = props;
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
}

export default Button;

const StyledButton = styled.button`
  color: pink;
`;
