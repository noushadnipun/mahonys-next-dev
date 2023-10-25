import React from "react";

const FilterSelect = ({ props, setFilter, action, defaultValue }) => {

  return (
    <select
      // onChange={e => setFilter(e.target.value)}
      onChange={action}
      className="filter-select border border-primary focus-ring focus-ring-light "
      aria-label="Default select example"
      defaultValue={defaultValue}
    >
      {props?.map((option, index) => {
        return (
          <option key={index} className="form border" value={option.value} >
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default FilterSelect;
