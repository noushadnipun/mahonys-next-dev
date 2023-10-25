import Pagination from "@/components/common/Pagination";
import Select from "@/components/common/form/SelectInput";
import TextInput from "@/components/common/form/TextInput";
import SubTable from "@/components/table/SubTable";
import AddModal from "@/components/modal/AddModal";
import ModalBtn from "@/components/button/Modal";
import AuthLayout from "@/components/layouts/AuthLayout";
import useCompany from "@/hooks/useCompany";
import { useState } from "react";
import Table from "@/components/common/Table";

const Subcontractors = () => {
  const [paginates, setPaginates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { openedCompany, } = useCompany();
  return (
    <AuthLayout
      props={[
        { li: "Customers", href: `/${openedCompany}/customers`, },
        { li: "Drivers", href: `/${openedCompany}/drivers` },
        { li: "Subcontractors", href: `/${openedCompany}/subcontractors` },
      ]}
    >
      <section className="row">
        <h3 className="page-headline">90 Subcontractors</h3>
        {/* Heading of Page */}
        <div className="page-filter col-lg-11 ">
          {/* Filter Start */}
          <div className="item input-group align-items-center">
            <div>
              <ModalBtn props={{ btnId: "subcontractors", btnName: "Add" }} />
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
        {/* // Table Start */}
        {/* <Table props={{
          tableHeads: ["Subcontractors Name", "Subcontractors Type", "Business Number", "Primary Phone", "Email", "Subcontractor Rate", "Insurance", "Get Invoice", "Action"],
          tableBody: tableBody(),
        }} /> */}
        {/* pagination  */}
        {/* <Pagination paginates={paginates} action={getCustomers} /> */}
        {/* pagination  */}
        {/* // End of Table  */}
        {/* // End of Table // The Modal */}
        <AddModal
          props={{
            modalTittle: "Add Subcontractor",
            modalId: "subcontractors",
          }}
        >
          {/* Start Input */}

          <TextInput props={{ label: "Connect with company", type: "text" }} />
          <TextInput props={{ label: "Business Number", type: "text" }} />
          <TextInput props={{ label: "Primary Phone", type: "text" }} />
          <TextInput props={{ label: "Secondary Phone", type: "numbers" }} />
          <TextInput props={{ label: "Street Address", type: "number" }} />
          <TextInput props={{ label: "Suburb", type: "number" }} />
          <TextInput props={{ label: "City/Town", type: "date" }} />
          <TextInput
            props={{
              label: "State",
              type: "number",
            }}
          />
          <TextInput props={{ label: "Country", type: "number" }} />
          <TextInput props={{ label: "Postcode", type: "text" }} />
          <Select props={["Tow Haulier", "Normal"]} label={"Contact Type"} />
          <Select
            props={["Rate", "Percentage"]}
            label={"Subcontractor Rate Calculation Type (Optional)"}
          />

          <TextInput
            props={{ label: "Subcontractor Rate (Optional)", type: "text" }}
          />

          {/* End Input  */}
        </AddModal>
      </section>
    </AuthLayout>
  );
};

export default Subcontractors;
