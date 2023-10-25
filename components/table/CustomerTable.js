import Link from "next/link";
import React from "react";
import ActionBtn from "../button/ActionBtn";

const CustomerTable = () => {
  return (
    <tbody>
      <tr>
        <td>AT123456</td>
        <td>Potato</td>
        <td>Canberra</td>
        <td>Melbourne</td>
        <td>300</td>
        <td>$500</td>

        <td className="text-center">
          <ActionBtn
            props={{ href1: "/smith/customers", href2: "/smith/drivers" }}
          />
          {/* <div className="btn-group btn-group-sm material-action-btn">
            <Link href="">
              <i className="bi bi-pencil-square"></i>
            </Link>
            <Link href="" className="text-dark">
              <i className="bi bi-lightbulb-off"></i>
            </Link>
          </div> */}
        </td>
      </tr>
    </tbody>
  );
};

export default CustomerTable;
