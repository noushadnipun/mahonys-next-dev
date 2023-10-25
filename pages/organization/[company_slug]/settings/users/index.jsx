import Pagination from "@/components/common/Pagination";
import Select from "@/components/common/form/SelectInput";
import TextInput from "@/components/common/form/TextInput";
import AddModal from "@/components/modal/AddModal";
import ModalBtn from "@/components/button/Modal";
import UserTable from "@/components/table/UserSettingTable";
import PageTittle from "@/components/common/PageTittle";


const UserSettings = () => {
    return (

        <section className="row">
            {/* Page Title start */}
            <PageTittle titlte={"UserSettings"} />
            {/* Page Title start */}
            {/* Heading of Page */}
            <div className="page-filter col-lg-11 ">
                {/* Filter Start */}
                <div className="item input-group align-items-center">
                    <div>
                        <ModalBtn props={{ btnId: "userSetting", btnName: "Add" }} />
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
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Email</th>

                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    {/* tbody  */}
                    <UserTable />
                    <UserTable />
                    <UserTable />
                    <UserTable />
                    <UserTable />
                    {/* tbody  */}
                </table>
                {/* pagination  */}
                <Pagination />
                {/* pagination  */}
            </div>
            {/* // End of Table // The Modal */}
            <AddModal props={{ modalTittle: "Add User", modalId: "userSetting" }}>
                {/* Start Input */}

                <TextInput props={{ label: "First Name", type: "text" }} />
                <TextInput props={{ label: "Last Name", type: "text" }} />
                <TextInput props={{ label: "Email", type: "email" }} />
                <TextInput props={{ label: "Secondary Email", type: "email" }} />
                <TextInput props={{ label: "Primary Phone", type: "number" }} />
                <TextInput props={{ label: "Secondary Phone", type: "number" }} />
                <TextInput props={{ label: "Invoice Email", type: "email" }} />
                <TextInput props={{ label: "Secondary Email", type: "email" }} />
                <TextInput props={{ label: "Address", type: "text" }} />
                <TextInput props={{ label: "Suburb", type: "number" }} />
                <TextInput props={{ label: "State Address", type: "text" }} />
                <TextInput props={{ label: "Country", type: "text" }} />
                <Select props={["Manager", "Commodite"]} label={"Designation"} />
                {/* End Input  */}
            </AddModal>
        </section>

    );
};

export default UserSettings;
