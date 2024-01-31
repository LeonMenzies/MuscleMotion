import styled from 'styled-components';
import { ChangeEventHandler } from 'react';

export interface DropDownProps {
  options: {
    label: string;
    id: string | number;
  }[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string | number;
}

export function DropDown(props: DropDownProps) {
  const { options, onChange, value } = props;

  return (
    <StyledDropDown value={value} onChange={onChange}>
      <option value="">Select an option</option>
      {options.map((option, index) => (
        <option key={option.label + index} value={option.id}>
          {option.label}
        </option>
      ))}
    </StyledDropDown>
  );
}

export default DropDown;

const StyledDropDown = styled.select`
  padding: 15px;
  border-radius: 5px;
  border: none;
  background-color: #d0d0d0;
  color: #343434;

  &:focus {
    outline: none;
    border: none;
  }
`;
