import React, { useState } from "react";
import TableRows from "./TableRows";
import Image from "next/image";
import Link from "next/link";

const InsuranceTable = ({ data = [], props }) => {
  const { tittle = "" } = props;
  const [rowsData, setRowsData] = useState([]);

  const addTableRows = () => {
    const rowsInput = {
      image: "",
      license: "",
      date: "",
    };
    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };
  return (
    <div className="col-lg-11 row d-flex  justify-content-start gap-5 pb-3 ps-3">
      <div className="col-8 px-0 border border-1 border-primary">
        <div className="d-flex bg-gray justify-content-between  px-5 py-1">
          <h6 className="m-0">{tittle}</h6>
          <Link
            href={"#"}
            onClick={addTableRows}
            className="badge text-primary border border-primary "
          >
            <i className="bi bi-plus-lg fs-6 fw-bolder"></i>
          </Link>
        </div>

        {data?.map((item, index) => (
          <div key={index} className=" border-top border-primary py-2 px-5">
            <div className=" d-flex gap-5 align-items-center justify-content-between">
              <Image
                src={`${item.src}`}
                alt="img"
                width={50}
                height={25}
                className="object-fit-cover"
              />
              <p className="m-0">{item.lisence}</p>
              <p className="m-0">{item.date}</p>
              <Link
                href={"#"}
                className="badge text-danger border border-danger"
              >
                <i className="bi bi-dash-lg fs-6"></i>
              </Link>
            </div>
          </div>
        ))}

        <div className="w-100 d-flex flex-column gap-3  px-5 pb-3">
          <TableRows
            rowsData={rowsData}
            deleteTableRows={deleteTableRows}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default InsuranceTable;
