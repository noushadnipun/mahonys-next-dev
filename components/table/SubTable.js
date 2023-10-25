import Link from "next/link";
import React from "react";

const SubTable = () => {
  return (
    <tbody>
      <tr>
        <td>AT123456</td>
        <td>Potato</td>
        <td>Canberra</td>
        <td>Melbourne</td>
        <td>300</td>
        <td>
          <Link
            href={"/smith/subcontractors/insurance"}
            className="btn btn-primary btn-sm"
          >
            Insurance
          </Link>
        </td>
        <td>
          <Link
            href={"/smith/subcontractors/invoice"}
            className="btn btn-success btn-sm"
          >
            Invoice
          </Link>
        </td>
        <td className="text-center">
          <div className="btn-group btn-group-sm material-action-btn">
            <Link href="">
              <i className="bi bi-pencil-square"></i>
            </Link>
            <Link href="" className="text-dark">
              <i className="bi bi-lightbulb-off"></i>
            </Link>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default SubTable;
