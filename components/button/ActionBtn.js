import Link from "next/link";
import React from "react";

const ActionBtn = ({ props }) => {
  const { href1, href2 } = props;
  return (
    <div className="btn-group btn-group-sm material-action-btn">
      <Link href={href1}>
        <i className="bi bi-pencil-square"></i>
      </Link>
      <Link href={href2} className="text-dark">
        <i className="bi bi-lightbulb-off"></i>
      </Link>
    </div>
  );
};

export default ActionBtn;
