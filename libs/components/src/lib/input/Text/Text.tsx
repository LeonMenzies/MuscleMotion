import { ChangeEventHandler } from 'react';
import styled from 'styled-components';

export interface TextProps {
  title: string;
  type: string;
  placeholder?: string;
  value: string | number;
  required?: boolean;
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function Text(props: TextProps) {
  const { title, type, placeholder, value, required, id, onChange } = props;

  return (
    <StyledText>
      <label className={'text-input-label'} htmlFor={id}>
        {title}
      </label>
      <StyledInput
        className={'text-input'}
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
      />
    </StyledText>
  );
}

export default Text;

const StyledText = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: column;
  margin: 5px;
`;

const StyledInput = styled.input`
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  background-color: #d0d0d0;
  color: #343434;

  &:focus {
    outline: none;
    border: none;
  }
`;
