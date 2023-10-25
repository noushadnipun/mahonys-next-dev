import { useState } from "react";

const TextInput = ({ props, onChange }) => {
  const {
    label,
    placeholder = "",
    forRef = "",
    type = "text",
    className ="",
    name = "",
    value = "",
    readonly = false,
  } = props;

  const [inputValue, setInputValue] = useState(props.value || '');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
 let dNone =  type=='hidden' ? 'd-none' : ''
  return (
    <div className={`form-group ${dNone}`}>
        {label ? (
            <label className="legend" htmlFor={forRef}>
                {label}
            </label>
        ) : false}

      <input
        type={type}
        name={name}
        readOnly = {readonly}
        className={`form-control ${className}`}
        placeholder={placeholder}
        // value={inputValue}
        // onChange={handleInputChange}
        onChange = {onChange}
        defaultValue = {value}
      />
    </div>
  );
};

export default TextInput;
