import AuthLayout from "@/components/layouts/AuthLayout";
import ModalBtn from "@/components/button/Modal";
import PageTittle from "@/components/common/PageTittle";
import Pagination from "@/components/common/Pagination";
import TextInput from "@/components/common/form/TextInput";
import AddModal from "@/components/modal/AddModal";
import PayrollTable from "@/components/table/PayrollTable";
import InsurenceTable from "@/components/table/InsurenceTable";

const Insurance = () => {
  return (
    <AuthLayout
      props={[
        { li: "All", href: "/smith/subcontractors/insurance" },
        { li: "Subcontractors", href: "/smith/subcontractors" },
      ]}
    >
      <section className="row">
        <PageTittle titlte={"Insurances of Vector Transport "} />
        {/* Heading of Page */}
        <div className="page-filter col-lg-11 ">
          {/* Filter Start */}
          <div className="item input-group align-items-center">
            <div>
              <ModalBtn props={{ btnId: "commodities", btnName: "Add" }} />
              <button className="btn btn-outline-primary  me-3">
                <i className="bi bi-filter"></i>
                Filter
              </button>
            </div>
            <div className="me-3 py-0">
              <input
                type="text"
                className="search_input "
                value=""
                placeholder="Search"
              />
            </div>
            <div className="me-3 py-0">
              Show
              <select className="length">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              entries
            </div>
          </div>
        </div>{" "}
        {/* // End Filter */}
        <div className="table-responsive">
          {" "}
          {/* // Table Start */}
          <table className="table material-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>File</th>
                <th>Insurances Number</th>

                <th className="text-center">Expair Date</th>
              </tr>
            </thead>
            {/* tbody  */}
            <InsurenceTable />
            <InsurenceTable />
            <InsurenceTable />
            <InsurenceTable />
            <InsurenceTable />
            {/* tbody  */}
          </table>
          {/* pagination  */}
          <Pagination />
          {/* pagination  */}
        </div>
        {/* // End of Table // The Modal */}
        <AddModal
          props={{ modalTittle: "Add Commoditie", modalId: "commodities" }}
        >
          {/* Start Input */}

          <TextInput props={{ label: "Commodities Name", type: "text" }} />
          <TextInput props={{ label: "Drescriptions", type: "text" }} />

          {/* End Input  */}
        </AddModal>
        {/* <ModalBtn
          props={{ btnName: "Send To Xero", btnId: "sendxero" }}
          className="w-25"
        /> */}
      </section>
    </AuthLayout>
  );
};

export default Insurance;
