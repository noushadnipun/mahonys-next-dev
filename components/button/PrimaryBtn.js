import Link from "next/link";
import React from "react";

const PrimaryBtn = ({ props }) => {
  const { name, href, css } = props;
  return (
    <Link href={href} className={`btn btn-primary ${css ?? false} `}>
      {name}
    </Link>
  );
};

export default PrimaryBtn;
