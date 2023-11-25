import { ChangeEventHandler } from "react";
import styled from "styled-components";

interface TText {
  title: string;
  type: string;
  placeholder?: string;
  value: string;
  required: boolean;
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
  margin: 0.2rem 0;
  background: #dbdbdb;

  .text-input-label {
    font-size: 1rem;
    padding: 0.1rem;
  }

  .text-input {
    padding: 0.1rem;
    font-size: 1rem;
    border-radius: 5px;
    border: none;
    background: none;
  }

  input:focus {
    outline: none;
  }
`;

const Text = ({ title, type, placeholder, value, required, id, onChange }: TText) => {
  return (
    <StyledText>
      <label className={"text-input-label"} htmlFor={id}>
        {title}
      </label>
      <input
        className={"text-input"}
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
      />
    </StyledText>
  );
};

export default Text;
