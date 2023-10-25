import Link from "next/link";

const AdminHead = () => {
  return (
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
                <Link className="nav-link" href="/admin/organizations">
                  Organizations
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/admin/combinations">
                  Combinations
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                <Link className="nav-link" href="/admin/commodity-types">
                  Commodity Types
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/admin/assets">
                  Assets
                </Link>
              </li>
            </ul>
          </div>
          {/* Right-side icons */}
        </div>
      </nav>
      {/* End Header Nav Area  */}
    </header>
  );
};

export default AdminHead;
