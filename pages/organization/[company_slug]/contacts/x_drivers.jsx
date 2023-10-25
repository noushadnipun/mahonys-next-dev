import Pagination from "@/components/common/Pagination";
import Select from "@/components/common/form/SelectInput";
import TextInput from "@/components/common/form/TextInput";
import AddModal from "@/components/modal/AddModal";
import ModalBtn from "@/components/button/Modal";
import FilterSelect from "@/components/common/form/FilterSelect";
import { useEffect, useState } from "react";
import Table from "@/components/common/Table";
import Link from "next/link";
import BsModal from "@/components/modal/BsModal";
import axios from "@/helpers/axios";

const x_drivers = () => {
    const [userInfo, setUserInfos] = useState()
    const organaization_id = userInfo?.organizations?.id;
    const companyId = userInfo?.companies?.find((company) => (company.id))
    const company_id = companyId?.id
    const [drivers, setDrivers] = useState([])
    const [paginates, setPaginates] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");


    useEffect(() => {
        getDrivers()
    }, [])

    console.log(drivers);

    /* Add Driver start */
    const addDriver = async (e) => {

        e.preventDefault();

        const payload = {
            company_id: 1, ////company_id,
            organization_id: 1, //organaization_id,
            first_name: e.target.firstName.value,
            last_name: e.target.lastName.value,
            gender: e.target.gender.value,
            birthday: e.target.dob.value,
            phone: e.target.primaryPhone.value,
            secondary_phone: e.target.secondary_phone.value,
            email: e.target.primaryEmail.value,
            secondary_email: e.target.secondaryEmail.value,
            city: e.target.city.value,
            address: e.target.address.value,
            postcode: e.target.postcode.value,
            suburb: e.target.suburb.value,
            country: e.target.country.value,
            state: e.target.state.value,
            meta_key: e.target.licenseNo.value,
            meta_value: e.target.otherIfor.value,
        };
        console.log(payload);
        try {
            const res = await axios.post("driver/create", payload);
            getDrivers();
        } catch (error) {
            console.log(error);
        }
    };
    /* Add Driver end */

    /* Update Driver start */
    const updateDriver = async (e) => {
        // const http = UseHttp();
        e.preventDefault();

        const payload = {
            company_id: company_id,
            organization_id: organaization_id,
            id: e.target.driverId.value,
            first_name: e.target.firstName.value,
            last_name: e.target.lastName.value,
            gender: e.target.gender.value,
            birthday: e.target.dob.value,
            phone: e.target.primaryPhone.value,
            secondary_phone: e.target.secondary_phone.value,
            email: e.target.primaryEmail.value,
            secondary_email: e.target.secondaryEmail.value,
            city: e.target.city.value,
            address: e.target.address.value,
            postcode: e.target.postcode.value,
            suburb: e.target.suburb.value,
            country: e.target.country.value,
            state: e.target.state.value,
            meta_key: e.target.licenseNo.value,
            meta_value: e.target.otherIfor.value,
        };
        try {
            const res = await axios.post("driver/update", payload);
            getDrivers()

        } catch (error) {
            console.log(error);
        }
    };
    /* Update Driver end */

    const [filter, setFilter] = useState("first_name");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        getDrivers(null, value, filter);
    }



    /* get All Drivers start */
    const getDrivers = async (url, search = "") => {

        const dataUrl = url != null ? `driver/index${url}` : `driver/index`;
        const searchUrl = `?search=${search}`;

        const res = await axios.get(`${dataUrl}${url != null ? "&" : ""}${searchUrl}&filter=${filter}`);
        setPaginates(res.data?.drivers?.links);
        setDrivers(res.data?.drivers?.data);


    };
    /* get All Drivers end*/

    /*Table body */
    const tableBody = () => {
        let arr = [{}];
        drivers && drivers?.map((driver, index) => {
            if (driver.company_name != 'undefined') {
                let obj = {
                    'first_name': `${driver.first_name} ${" "} ${driver.last_name}`,
                    'gender': driver.gender,
                    "phone": driver.phone,
                    "email": driver.email,
                    "lincence": driver?.meta_key,
                    "CheckWeeklyBill": "button",
                    'action': (
                        <div className="btn-group btn-group-sm material-action-btn">
                            <form onSubmit={updateDriver}>
                                <BsModal btnName={<i className="bi bi-pencil-square fs-6 text-primary"></i>} modalTitle={"Edit Driver"} btnVariant={"transparent"}>
                                    {/* Start Input */}
                                    <input type="hidden" name="driverId" defaultValue={driver.id} />
                                    <TextInput
                                        props={{ label: "First Name", type: "text", name: "firstName", defaultValue: driver.first_name }}
                                    />
                                    <TextInput
                                        props={{ label: "Last Name", type: "text", name: "lastName", defaultValue: driver.last_name }}
                                    />
                                    <Select defaultValue={driver.gender} props={[{ name: "Male", id: "Male" }, { name: "Female", id: "Female" }, { name: "Others", id: "Others" }]} label={"Gender"} name="gender" optionlabel='name'
                                        optionvalue='id' />
                                    <TextInput
                                        props={{
                                            label: "Date of Birth (D.O.B)",
                                            type: "date",
                                            name: "dob",
                                            defaultValue: driver.birthday
                                        }}
                                    />

                                    <TextInput
                                        props={{
                                            label: "Primary Phone",
                                            type: "phone",
                                            name: "primaryPhone",
                                            defaultValue: driver.phone
                                        }}
                                    />
                                    <TextInput
                                        props={{
                                            label: "Secondary Phone",
                                            type: "phone",
                                            name: "secondary_phone",
                                            defaultValue: driver.secondary_phone
                                        }}
                                    />
                                    <TextInput
                                        props={{
                                            label: "Primary Email",
                                            type: "email",
                                            name: "primaryEmail",
                                            defaultValue: driver.email
                                        }}
                                    />
                                    <TextInput
                                        props={{
                                            label: "Secondary Email",
                                            type: "email",
                                            name: "secondaryEmail",
                                            defaultValue: driver.secondary_email
                                        }}
                                    />
                                    <TextInput
                                        props={{
                                            label: "License Number",
                                            type: "numbers",
                                            name: "licenseNo",
                                            defaultValue: driver?.meta_data?.meta_key,
                                        }}
                                    />
                                    <TextInput
                                        props={{
                                            label: "PostCode",
                                            type: "numbers",
                                            name: "postcode",
                                            defaultValue: driver.postcode
                                        }}
                                    />
                                    <TextInput
                                        props={{ label: "City / Town", type: "text", name: "city", defaultValue: driver.city }}
                                    />

                                    <TextInput
                                        props={{ label: "Address", type: "text", name: "address", defaultValue: driver.address }}
                                    />
                                    <TextInput
                                        props={{ label: "Suburb", type: "number", name: "suburb", defaultValue: driver.suburb }}
                                    />
                                    <TextInput
                                        props={{ label: "State Address", type: "text", name: "state", defaultValue: driver.state }}
                                    />
                                    <TextInput
                                        props={{ label: "Country", type: "text", name: "country", defaultValue: driver.country }}
                                    />
                                    <TextInput
                                        props={{
                                            label: "Other Information",
                                            type: "text",
                                            name: "otherIfor",
                                            defaultValue: driver.meta_value
                                        }}
                                    />

                                    {/* End Input  */}
                                </BsModal>
                            </form>
                            <Link href="#">
                                <i className="bi bi-lightbulb-off fs-6 text-dark"></i>
                            </Link>

                            {/* <Link href={`${commodity.company_key}/assets`} className="text-dark">
                <i onClick={() => setOpenedCompany(commodity.company_key)} className="bi bi-play-fill fs-5"></i>
              </Link> */}
                        </div>
                    )
                }
                arr.push(obj)
            }
        })
        return arr;
    }
    /*Table body */


    return (

        <section className="row">
            <h3 className="page-headline">{drivers?.length} Drivers</h3>
            {/* Heading of Page */}
            <div className="page-filter col-lg-11 ">
                {/* Filter Start */}
                <div className="item input-group align-items-center gap-3">
                    <div className="d-flex">
                        <ModalBtn props={{ btnId: "drivers", btnName: "Add" }} />
                        <FilterSelect props={[
                            {
                                id: 1,
                                value: "first_name",
                                label: "Name"
                            },

                            {
                                id: 2,
                                value: "Phone",
                                label: "Phone"
                            },

                            {
                                id: 3,
                                value: "first_name",
                                label: "First Nmae"
                            },

                            {
                                id: 4,
                                value: "first_name",
                                label: "First Nmae"
                            },


                        ]} setFilter={setFilter} />
                    </div>
                    <div className="me-3 py-0">
                        <input
                            type="text"
                            onChange={handleSearch}
                            className="search_input "
                            value={searchQuery}
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
            {/* <Table props={{
          tableHead: [""],
          tableBody:
        }} /> */}



            {/* // Table Start */}
            <Table props={{
                tableHeads: ["FullName", "Gender", "Primary Phone", "Primary Email", "License Number", "Check Weekly Bill", "Action"],
                tableBody: tableBody(),
            }} />
            {/* pagination  */}
            <Pagination paginates={paginates} action={getDrivers} />
            {/* pagination  */}
            {/* // End of Table  */}


            {/* Add Driver start  */}
            <form onSubmit={addDriver}>
                <AddModal props={{ modalTittle: "Add Driver", modalId: "drivers" }}>
                    {/* Start Input */}

                    <TextInput
                        props={{ label: "First Name", type: "text", name: "firstName" }}
                    />
                    <TextInput
                        props={{ label: "Last Name", type: "text", name: "lastName" }}
                    />
                    <Select props={[{ name: "Male", id: "Male" }, { name: "Female", id: "Female" }, { name: "Others", id: "Others" }]} label={"Gender"} name="gender" optionlabel='name'
                        optionvalue='id' />
                    <TextInput
                        props={{
                            label: "Date of Birth (D.O.B)",
                            type: "date",
                            name: "dob",
                        }}
                    />

                    <TextInput
                        props={{
                            label: "Primary Phone",
                            type: "phone",
                            name: "primaryPhone",
                        }}
                    />
                    <TextInput
                        props={{
                            label: "Secondary Phone",
                            type: "phone",
                            name: "secondary_phone",
                        }}
                    />
                    <TextInput
                        props={{
                            label: "Primary Email",
                            type: "email",
                            name: "primaryEmail",
                        }}
                    />
                    <TextInput
                        props={{
                            label: "Secondary Email",
                            type: "email",
                            name: "secondaryEmail",
                        }}
                    />
                    <TextInput
                        props={{
                            label: "License Number",
                            type: "numbers",
                            name: "licenseNo",
                        }}
                    />
                    <TextInput
                        props={{
                            label: "PostCode",
                            type: "numbers",
                            name: "postcode",
                        }}
                    />
                    <TextInput
                        props={{ label: "City / Town", type: "text", name: "city" }}
                    />

                    <TextInput
                        props={{ label: "Address", type: "text", name: "address" }}
                    />
                    <TextInput
                        props={{ label: "Suburb", type: "number", name: "suburb" }}
                    />
                    <TextInput
                        props={{ label: "State Address", type: "text", name: "state" }}
                    />
                    <TextInput
                        props={{ label: "Country", type: "text", name: "country" }}
                    />
                    <TextInput
                        props={{
                            label: "Other Information",
                            type: "text",
                            name: "otherIfor",
                        }}
                    />

                    {/* End Input  */}
                </AddModal>
            </form>
            {/* Add Driver end */}

        </section>

    );
};

export default x_drivers;
