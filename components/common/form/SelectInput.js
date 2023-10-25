import {useState} from "react";

const SelectInput = ({ props, label, forRef, name = "", optionlabel = "", optionvalue = "", defaultValue = "", selected = '', required=false }) => {
  let value = selected
  return (
    <div className="form-group">
      <label className="legend" htmlFor={forRef}>
        {label}
      </label>
      <select
        className="form-control"
        required={required}
        aria-label="Default select example"
        name={name}
        defaultValue={value || false}
        onChange={(e) => value = e.target.value}
      >
        {props?.map((option, index) => {
          return (
            <option  value={option[optionvalue]}  className="form-control" key={index}>
              {option[optionlabel]}
            </option>
          );
        })}
      </select>
    </div >
  );
};

export default SelectInput;
