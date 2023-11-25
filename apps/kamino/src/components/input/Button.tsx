import styled from 'styled-components';

interface TButton {
  text: string;
  onClick: any;
}

const StyledButton = styled.button``;

const Button = ({ text, onClick }: TButton) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default Button;
