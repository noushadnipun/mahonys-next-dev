import { useState } from "react";

const SearchInput = ({ props }) => {
  const {
    label,
    placeholder = "",
    forRef = "",
    type = "text",
    name = "",
    value = "",
    readonly = false
  } = props;

  const [inputValue, setInputValue] = useState(props.value || '');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="form-group ">
      <label className="legend" htmlFor={forRef}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        readOnly = {readonly}
        className="form-control"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchInput;
