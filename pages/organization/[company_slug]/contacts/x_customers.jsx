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



const X_customers = () => {


    const [customers, setCustomers] = useState([])

    const [paginates, setPaginates] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getCustomers()
    }, [])



    /* Add Customer start*/
    const addCustomer = async (e) => {
        e.preventDefault();
        const payload = {
            company_id: 1,
            organization_id: 1,
            first_name: e.target.firstName.value,
            last_name: e.target.lastName.value,
            gender: e.target.gender.value,
            birthday: e.target.dob.value,
            phone: e.target.primaryPhone.value,
            secondary_phone: e.target.SecondaryPhone.value,
            email: e.target.email.value,
            secondary_email: e.target.secondaryEmail.value,
            city: e.target.city.value,
            address: e.target.address.value,
            postcode: e.target.postcode.value,
            suburb: e.target.suburb.value,
            country: e.target.country.value,
            state: e.target.state.value,
            meta_key: e.target.salesTax.value,
            meta_value: e.target.note.value,
        };
        try {
            const res = await axios.post("customer/create", payload);
            // console.log(res.data)
            getCustomers()
            // console.log(res.data);
        } catch (error) {
            // console.log(error);
        }
    };
    /* Add Customer ens*/
    /* Add Customer start*/
    const updateCustomer = async (e) => {
        e.preventDefault();

        const payload = {
            company_id: company_id,
            organization_id: organaization_id,
            first_name: e.target.firstName.value,
            last_name: e.target.lastName.value,
            gender: e.target.gender.value,
            birthday: e.target.dob.value,
            phone: e.target.primaryPhone.value,
            secondary_phone: e.target.SecondaryPhone.value,
            email: e.target.email.value,
            secondary_email: e.target.secondaryEmail.value,
            city: e.target.city.value,
            address: e.target.address.value,
            postcode: e.target.postcode.value,
            suburb: e.target.suburb.value,
            country: e.target.country.value,
            state: e.target.state.value,
            meta_key: e.target.salesTax.value,
            meta_value: e.target.note.value,
        };
        try {
            const res = await axios.post("customer/update", payload);
            getCustomers()
            // console.log(res.data);
        } catch (error) {
            // console.log(error);
        }
    };
    /* Add Customer ens*/

    /* get All Drivers start */
    const getCustomers = async (url, search = '') => {
        const dataUrl = url != null ? `customer/index${url}` : `customer/index`;
        const searchUrl = `?search=${search}`;
        const res = await axios.get(`${dataUrl}${url != null ? "&" : ""}${searchUrl}&filter=${filter}`)

        // console.log(res.data.customers.data)
        setCustomers(res.data?.customers?.data);
        setPaginates(res.data?.customers?.links)
    };
    /* get All Drivers end*/
    /*Table body */
    const tableBody = () => {
        let arr = [{}];
        customers && customers?.map((customer, index) => {
            if (customer.company_name != 'undefined') {
                let obj = {
                    'name': `${customer.first_name} ${" "} ${customer.last_name}`,
                    'code': customer.code,
                    'abn': customer.abn,
                    "phone": customer.phone,
                    "email": customer.email,
                    "getInvoice": "button",
                    'action': (
                        <div className="btn-group btn-group-sm material-action-btn">
                            <form onSubmit={updateCustomer}>
                                <BsModal btnName={<i className="bi bi-pencil-square fs-6 text-primary"></i>} modalTitle={"Edit Driver"} btnVariant={"transparent"}>
                                    {/* Start Input */}
                                    <input type="hidden" name="driverId" defaultValue={customer.id} />
                                    <input type="hidden" name="driverId" defaultValue={customer} />
                                    {/* Start Input */}

                                    <TextInput
                                        props={{ label: "Company Name", type: "text", name: "com_name" }}
                                    />
                                    <TextInput
                                        props={{ label: "Client Code", type: "text", name: "clientCode" }}
                                    />
                                    <TextInput
                                        props={{ label: "First Name", type: "text", name: "firstName", defaultValue: customer.first_name }}
                                    />
                                    <TextInput
                                        props={{ label: "Last name", type: "numbers", name: "lastName", defaultValue: customer.last_name }}

                                    />
                                    <Select defaultValue={customer.gender} props={[{ name: "Male", id: "Male" }, { name: "Female", id: "Female" }, { name: "Others", id: "Others" }]} label={"Gender"} name="gender" optionlabel='name'
                                        optionvalue='id' />
                                    <TextInput
                                        props={{
                                            label: "Date of Birth (D.O.B)",
                                            type: "date",
                                            name: "dob",
                                            defaultValue: customer.birthday
                                        }}
                                    />
                                    <TextInput
                                        props={{ label: "Phone 1", type: "number", name: "primaryPhone", defaultValue: customer.phone }}
                                    />
                                    <TextInput
                                        props={{ label: "Phone 2", type: "number", name: "SecondaryPhone", defaultValue: customer.secondary_phone }}
                                    />
                                    <TextInput
                                        props={{
                                            label: "Email",
                                            type: "email",
                                            name: "email", defaultValue: customer.email
                                        }}
                                    />
                                    <TextInput
                                        props={{
                                            label: "Secondary Email",
                                            type: "email",
                                            name: "secondaryEmail", defaultValue: customer.secondary_email
                                        }}
                                    />
                                    <TextInput
                                        props={{ label: "city", type: "text", name: "city" }}
                                    />
                                    <TextInput
                                        props={{ label: "Address", type: "text", name: "address" }}
                                    />
                                    <TextInput
                                        props={{ label: "Suburb", type: "text", name: "suburb" }}
                                    />
                                    <TextInput
                                        props={{ label: "State", type: "text", name: "state" }}
                                    />
                                    <TextInput
                                        props={{ label: "Post Code", type: "text", name: "postcode" }}
                                    />
                                    <TextInput
                                        props={{ label: "Country", type: "text", name: "country" }}
                                    />
                                    <TextInput
                                        props={{ label: "Sales Tax", type: "text", name: "salesTax" }}
                                    />
                                    <TextInput
                                        props={{
                                            label: "This note will appear in the drivers app",
                                            type: "text",
                                            name: "note",
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

    const [filter, setFilter] = useState("first_name");


    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value)
        getCustomers(null, value, filter);

    }


    return (
        <section className="row">
            <h3 className="page-headline">{customers?.length} Customers</h3>
            {/* Heading of Page */}
            <div className="page-filter col-lg-11 ">
                {/* Filter Start */}
                <div className="item input-group align-items-center gap-3">
                    <div className="d-flex">
                        <ModalBtn props={{ btnId: "customers", btnName: "Add" }} />
                        <FilterSelect props={[{
                            id: 1,
                            value: "username",
                            label: "Name"
                        },

                        {
                            id: 2,
                            value: "Phone",
                            label: "Phone"
                        },

                        {
                            id: 3,
                            value: "email",
                            label: "Email"
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


            {/* // Table Start */}
            <Table props={{
                tableHeads: ["Name", "Code", "ABN", "Phone", "Email", "Get Invoice", "Action"],
                tableBody: tableBody(),
            }} />
            {/* pagination  */}
            <Pagination paginates={paginates} action={getCustomers} />
            {/* pagination  */}
            {/* // End of Table  */}

            {/* <BsModal /> */}

            {/* Add Customer start */}
            <form onSubmit={addCustomer}>
                <AddModal
                    props={{ modalTittle: "Add Customer", modalId: "customers" }}
                >
                    {/* Start Input */}

                    <TextInput
                        props={{ label: "Company Name", type: "text", name: "com_name" }}
                    />
                    <TextInput
                        props={{ label: "Client Code", type: "text", name: "clientCode" }}
                    />
                    <TextInput
                        props={{ label: "First Name", type: "text", name: "firstName" }}
                    />
                    <TextInput
                        props={{ label: "Last name", type: "numbers", name: "lastName" }}

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
                        props={{ label: "Phone 1", type: "number", name: "primaryPhone" }}
                    />
                    <TextInput
                        props={{ label: "Phone 2", type: "number", name: "SecondaryPhone" }}
                    />
                    <TextInput
                        props={{
                            label: "Email",
                            type: "email",
                            name: "email",
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
                        props={{ label: "city", type: "text", name: "city" }}
                    />
                    <TextInput
                        props={{ label: "Address", type: "text", name: "address" }}
                    />
                    <TextInput
                        props={{ label: "Suburb", type: "text", name: "suburb" }}
                    />
                    <TextInput
                        props={{ label: "State", type: "text", name: "state" }}
                    />
                    <TextInput
                        props={{ label: "Post Code", type: "text", name: "postcode" }}
                    />
                    <TextInput
                        props={{ label: "Country", type: "text", name: "country" }}
                    />
                    <TextInput
                        props={{ label: "Sales Tax", type: "text", name: "salesTax" }}
                    />
                    <TextInput
                        props={{
                            label: "This note will appear in the drivers app",
                            type: "text",
                            name: "note",
                        }}
                    />

                    {/* End Input  */}
                </AddModal>
            </form>
            {/* Add Customer end */}
        </section>
    );
};

export default X_customers;
