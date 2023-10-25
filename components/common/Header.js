import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Header = ({ props }) => {
  const pathname = usePathname();
  return (
    <>
      <header>
        {/* Header Nav Area */}
        <nav className="navbar navbar-expand-lg navbar-dark py-0 header-nav row  m-0">
          <div className="col-lg-11 container-fluid">
            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" href="/smith/scheduler">
                    Scheduler
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/organization/smith/assets">
                    Assets
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/organization/smith/contracts">
                    Contracts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/organization/smith/commodities">
                    Commodities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/organization/smith/customers">
                    Contacts
                  </Link>
                </li>
              </ul>
            </div>
            {/* Right-side icons */}
            <ul className="navbar-nav d-flex flex-row align-items-center">
              <li className="nav-item dropdown">
                <Link
                  // bg-white text-danger rounded-5
                  className="nav-link notifications-badge "
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  5{/* <i className="bi bi-bell fs-5"></i> */}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="#">
                      <h6 className="fw-semibold">Smith</h6>
                      <span className="opacity-75">
                        Lorem ipsum dolor sit amet.
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <h6 className="fw-semibold">Smith</h6>
                      <span className="opacity-75">
                        Lorem ipsum dolor sit amet.
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <h6 className="fw-semibold">Smith</h6>
                      <span className="opacity-75">
                        Lorem ipsum dolor sit amet.
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/smith/notifications"}
                      className="text-primary pb-3 text-center d-inline-block d-flex justify-content-center fs-6 text-decoration-none "
                    >
                      See All Notification
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link company-badge" href="#">
                  <span className="px-2">Smith Transport</span>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link" href="#" data-bs-toggle="dropdown">
                  <i className="bi bi-gear fs-5"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="/organizations">
                      Organizations Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/organizations-companys"
                    >
                      Companys Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/organization/smith/settings/users"
                    >
                      Users Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/organization/smith/settings/insurances"
                    >
                      Insurances
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/organization/smith/settings/others"
                    >
                      Others Settings
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link profile-badge"
                  href="/organization/smith/users/profile"
                >
                  ME
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {/* End Header Nav Area  */}

        {/* <SubHeader /> */}
        <nav className="navbar navbar-expand-lg navbar-light py-0 heading-nav  row justify-content-center m-0">
          <div className="col-lg-11">
            <div>
              <ul className="navbar-nav me-auto d-flex flex-row gap-3 align-items-center">
                {props?.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className={`nav-item ${pathname === item.href ? "current" : ""
                        }`}
                    >
                      <Link className="nav-link" href={item.href}>
                        {item.li}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
        {/* End Header Nav Area */}
      </header>
    </>
  );
};

export default Header;
