import React from "react";

const TableRows = ({ rowsData, deleteTableRows, handleChange }) => {
  return rowsData.map((data, index) => {
    const { image, license, date } = data;
    return (
      <div
        key={index}
        className="d-flex gap-5 justify-content-between align-items-center  border-top border-primary pt-3"
      >
        <div>
          <input
            type="file"
            value={image}
            onChange={(evnt) => handleChange(index, evnt)}
            name="image"
            className=""
          />
        </div>
        <div>
          <input
            type="text"
            value={license}
            onChange={(evnt) => handleChange(index, evnt)}
            name="license"
            className="py-1 px-3 border border-primary focus-ring focus-ring-primary"
          />{" "}
        </div>
        <div>
          <input
            type="date"
            value={date}
            onChange={(evnt) => handleChange(index, evnt)}
            name="date"
            className="py-1 px-3 border border-primary focus-ring focus-ring-primary"
          />{" "}
        </div>
        <div>
          <button
            className="badge text-bg-danger border-0"
            onClick={() => deleteTableRows(index)}
          >
            <i className="bi bi-dash-lg fs-5"></i>
          </button>
        </div>
      </div>
    );
  });
};

export default TableRows;
