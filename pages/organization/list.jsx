import Link from "next/link";
import { useEffect, useState } from "react";
import { userInfos } from "@/helpers/auth";
import ModalBtn from "@/components/button/Modal";
import AddModal from "@/components/modal/AddModal";
import Table from "@/components/common/Table";
import BsModal from "@/components/modal/BsModal";
import axios from "@/helpers/axios";
import OrganizationCreate from "./create";
import {Toaster, toast} from "react-hot-toast";
const CompanySettings = () => {

    const [org, setOrg] = useState({});
    const [companies, setCompanies] = useState([]);
    const [company, setCompany] = useState({})



    useEffect(() => {
        /* get companies start*/
        const getCompanies = async () => {
            const res = await axios.get('company/index');
            setCompanies(res?.data.data);
        }
        getCompanies();
    }, []);
    /* get companies end*/

    /* Add Company start*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            company_name: e.target.name.value,
            company_abn: e.target.abn.value,
            company_email: e.target.email.value,
            company_phone: e.target.phone.value,
            organization_id: 1,//org?.id,
            company_address: {
                address: e.target.address.value,
                suburb: e.target.suburb.value,
                city: e.target.cityTown.value,
                state: e.target.state.value,
                country: e.target.country.value,
                postCode: e.target.postcode.value,
            },
        };
        const res = await axios.post("company/create", payload);
        getCompanies();
    };
    /* Add Company end */


    /* update Company start*/
    const updateCompany = async (e) => {
        e.preventDefault();

        const payload = {
            company_id: e.target.companyId.value,
            company_name: e.target.name.value,
            company_abn: e.target.abn.value,
            company_email: e.target.email.value,
            company_phone: e.target.phone.value,
            organization_id: e.target.organization_id.value,
            company_address: {
                address: e.target.address.value,
                suburb: e.target.suburb.value,
                city: e.target.cityTown.value,
                state: e.target.state.value,
                country: e.target.country.value,
                postCode: e.target.postcode.value,
            },

        };
        console.log(payload);

        try {
            const res = await axios.post("company/update", payload);
            console.log(res.data)
            setCompany(res?.data.data)
            getCompanies();
        } catch (error) {
            console.log(error)
        }
    };
    /* update Company end */




    let companyAddress = company?.company_address ? json.parse(company.company_address) : false;

    const tableBody = () => {
        let arr = [];
        {
            companies && companies.map((company, index) => {
                if (company.company_name != 'undefined') {
                    let obj = {
                        'company_name': company.company_name,
                        'company_abn': company.company_abn,
                        'action': (
                            <>
                                <div className="btn-group btn-group-sm material-action-btn">
                                    <form onSubmit={updateCompany}>
                                        <BsModal btnName={<i className="bi bi-pencil-square fs-6 text-primary"></i>} modalTitle={"Edit Company"} btnVariant={"transparent"}>
                                            <div className="">
                                                <input type="hidden" name="companyId" defaultValue={company.id} />
                                                <input type="hidden" name="organization_id" defaultValue={company.organization_id} />
                                                <div className="row">

                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="name"
                                                                placeholder="Name"
                                                                defaultValue={company.company_name}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name="abn"
                                                                placeholder="Business Number"
                                                                defaultValue={company.company_abn}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                name="email"
                                                                placeholder="Default Email"
                                                                defaultValue={company.company_email}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <input
                                                                type="phone"
                                                                className="form-control"
                                                                name="phone"
                                                                placeholder="Default Phone"
                                                                defaultValue={company.company_phone}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="address"
                                                                placeholder="Street Address"
                                                                defaultValue={companyAddress?.address}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name="suburb"
                                                                placeholder="Suburb"
                                                                defaultValue={companyAddress?.suburb}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="cityTown"
                                                                placeholder="City/Town"
                                                                defaultValue={companyAddress?.city}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name="state"
                                                                placeholder="State"
                                                                defaultValue={companyAddress?.state}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="country"
                                                                placeholder="Country"
                                                                defaultValue={companyAddress?.country}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name="postcode"
                                                                placeholder="Postcode"
                                                                defaultValue={companyAddress?.postcode}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </BsModal>
                                    </form>
                                    <Link href={`organization/${company.company_key}/assets`} className="text-dark">
                                        <i className="bi bi-play-fill fs-5"></i>
                                    </Link>
                                </div>
                            </>
                        )
                    }
                    arr.push(obj)
                }
            })

        }
        return arr;
    }




    return (
        <section className="row justify-content-center mt-5 m-0">
            <div className="col-lg-11 row justify-content-between ">
                <div className="col-lg-4 border p-5 rounded-3">
                    {OrganizationSection() }
                </div>
                <div className="col-lg-7 border p-5 rounded-3">
                    <div className="d-flex  justify-content-between">
                        <h3 className="m-0">List Of Company</h3>
                        <ModalBtn
                            props={{
                                btnName: "Add Company",
                                btnId: "company",
                            }}
                        />

                    </div>

                    {/* Company List  Table Start */}
                    <div className="mt-3">
                        <Table props={{
                            tableHeads: ["Company Name", "Company Abn", "Action"],
                            tableBody: tableBody(),
                        }} />
                    </div>
                    {/* Company List  Table end */}
                </div>
            </div>

            {/* Add Company start */}
            <form onSubmit={handleSubmit}>
                <AddModal
                    props={{
                        modalTittle: "Add Company",
                        modalId: "company",
                        modalSize: "modal-md",
                        cancelBtn: "false",
                        columns: "",
                    }}
                >
                    <div className="">
                        <div className="row ">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Name"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="abn"
                                        placeholder="Business Number"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Default Email"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <input
                                        type="phone"
                                        className="form-control"
                                        name="phone"
                                        placeholder="Default Phone"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        placeholder="Street Address"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="suburb"
                                        placeholder="Suburb"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cityTown"
                                        placeholder="City/Town"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="state"
                                        placeholder="State"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="country"
                                        placeholder="Country"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="postcode"
                                        placeholder="Postcode"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </AddModal>
            </form>
            {/* Add Company end */}


        </section>
    );
};

const OrganizationSection = (orgData = {}) => {
    const [org, setOrg] = useState();
    useEffect(() => {
        const userData = async () => {
            let data = await userInfos();
            setOrg(data.user_info.user.organizations || false)
        }
        userData()
    }, [])
    const organizationUpdate = async (e) => {
        e.preventDefault();
        const payload = {
            org_name: e.target.name.value,
            org_abn: e.target.abn.value,
            org_email: e.target.email.value,
            org_phone: e.target.phone.value,
            org_id: org?.id,
            org_address: {
                address: e.target.address.value,
                suburb: e.target.suburb.value,
                city: e.target.cityTown.value,
                state: e.target.state.value,
                country: e.target.country.value,
                postCode: e.target.postcode.value,
            },
        };

        try {
            const res = await axios.post("organization/update", payload);
            if (res.data.status) {
                console.log(res.data.user_info.user.organizations)
                setOrg(res.data.user_info.user.organizations);
                toast.success('Successfully Updated')
            }
        } catch (error) {
            console.log(error);
        }
    };

    let orgAddress = org ? JSON.parse(org?.org_address) : false
    return (
        <>
            <Toaster />
            <div className="d-flex justify-content-between">
                <h3 className="page-headline">Setup Organization</h3>
                <ModalBtn
                    props={{
                        btnName: <i className="bi bi-pencil-square fs-6 text-primary"></i>,
                        className: 'btn-transparent mt-2',
                        btnId: "editOrg",
                    }}
                />
                {/* <Link href={"#"}>
                <i className="bi bi-pencil-square fs-5"></i>
              </Link> */}
            </div>
            <div className="d-flex flex-column gap-3">
                <p>
                    <span className="opacity-75">Name : </span>
                    <span className="text-dark">{org?.org_name}</span>
                </p>
                <p>
                    <span className="opacity-75">Business Number :</span>
                    <span className="text-dark">{org?.org_abn}</span>
                </p>
                <p>
                    <span className="opacity-75">Phone :</span>
                    <span className="text-dark">{org?.org_phone}</span>
                </p>
                <p>
                    <span className="opacity-75">Email:</span>
                    <span className="text-dark">{org?.org_email}</span>
                </p>
                <p>
                    <span className="opacity-75">Street Address :</span>
                     <span className="text-dark">{orgAddress?.address}</span>
                </p>
                <p>
                    <span className="opacity-75">Suburb :</span>
                    <span className="text-dark">{orgAddress?.suburb}</span>
                </p>
                <p>
                    <span className="opacity-75">City/Town: </span>
                    <span className="text-dark">{orgAddress?.city}</span>
                </p>
                <p>
                    <span className="opacity-75">State: </span>
                    <span className="text-dark">{orgAddress?.state}</span>
                </p>
                <p>
                    <span className="opacity-75">Country: </span>
                    <span className="text-dark">{orgAddress?.country}</span>
                </p>
                <p>
                    <span className="opacity-75">Xero Link : </span>
                    <span className="text-dark">{orgAddress?.postCode}</span>
                </p>
            </div>

            {/* Organaization Update start */}
            <form onSubmit={organizationUpdate}>
                <AddModal
                    props={{
                        modalTittle: "Edit Organaization",
                        modalId: "editOrg",
                        modalSize: "modal-md",
                        columns: "",
                    }}
                >
                    <div className="">
                        <div className="row ">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        defaultValue={org?.org_name}
                                        placeholder="Name"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="abn"
                                        defaultValue={org?.org_abn}
                                        placeholder="Business Number"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        defaultValue={org?.org_email}
                                        placeholder="Default Email"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <input
                                        type="phone"
                                        className="form-control"
                                        name="phone"
                                        defaultValue={org?.org_phone}
                                        placeholder="Default Phone"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        defaultValue={orgAddress?.address}
                                        placeholder="Street Address"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="suburb"
                                        defaultValue={orgAddress?.suburb}
                                        placeholder="Suburb"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cityTown"
                                        defaultValue={orgAddress?.city}
                                        placeholder="City/Town"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="state"
                                        defaultValue={orgAddress?.state}
                                        placeholder="State"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="country"
                                        defaultValue={orgAddress?.country}
                                        placeholder="Country"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="postcode"
                                        defaultValue={orgAddress?.postCode}
                                        placeholder="Postcode"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </AddModal>
            </form>
            {/* Organaization Update end */}
        </>
    );
}

const clickMe = (param) => {
    /* update Company start*/
    const updatecompany = async (e) => {
        e.preventDefault();
        const payload = {
            company_name: e.target.name.value,
            company_abn: e.target.abn.value,
            company_email: e.target.email.value,
            company_phone: e.target.phone.value,
            organization_id: org?.id,
            company_address: {
                adress: e.target.address.value,
                suburb: e.target.suburb.value,
                city: e.target.cityTown.value,
                state: e.target.state.value,
                country: e.target.country.value,
                postCode: e.target.postcode.value,
            },
        };
        const res = await axios.post("company/create", payload);
        getCompanies();
    };
    /* update Company end */
    // console.log(param.id)
    return (

        <form form onSubmit={updatecompany} >
            <AddModal
                props={{
                    modalTittle: "Add Company",
                    modalId: param.id,
                    modalSize: "modal-md",
                    cancelBtn: "false",
                    columns: "",
                }}
            >
                <div className="">

                    <div className="row ">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Name"
                                />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="abn"
                                    placeholder="Business Number"
                                />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Default Email"
                                />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group">
                                <input
                                    type="phone"
                                    className="form-control"
                                    name="phone"
                                    placeholder="Default Phone"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    placeholder="Street Address"
                                />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="suburb"
                                    placeholder="Suburb"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="cityTown"
                                    placeholder="City/Town"
                                />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="state"
                                    placeholder="State"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="country"
                                    placeholder="Country"
                                />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="postcode"
                                    placeholder="Postcode"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </AddModal>
        </form >

    )

}

export default CompanySettings;

