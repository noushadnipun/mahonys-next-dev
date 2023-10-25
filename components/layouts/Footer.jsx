import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer row mx-auto footer-shadow m-0 mt-5">
      <div className="col-lg-11 mx-auto footer-menu flex justify-content-between">
        <ul className="list-unstyled">
          <li>
            <Link href={""} className="btn btn-danger rounded-5">
              H
            </Link>
          </li>
        </ul>
        <ul className="d-flex footer-menu  footer-text">
          <li>
            <Link href="#">Terms and Conditions</Link>
          </li>
          <li>
            <Link href="#" className="text-decoration-none">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
