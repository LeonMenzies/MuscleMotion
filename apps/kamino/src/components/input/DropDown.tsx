import { ChangeEventHandler } from "react";

interface TDropDown {
  options: {
    label: string;
    id: string;
  }[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
}

const Dropdown = ({ options, onChange, value }: TDropDown) => {
  return (
    <select value={value} onChange={onChange}>
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option.label} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
