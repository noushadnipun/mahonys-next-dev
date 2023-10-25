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
import { useRouter } from "next/router";
import axios from "@/helpers/axios";
// import ActionBtn from "@/components/button/ActionBtn";
// import toast from "react-hot-toast";
// import Create from "./create";



const Commodities = () => {
  const [userInfo, setUserInfos] = useState()
  const [commodities, setCommodities] = useState([])
  const [commodityTypes, setCommodityTypes] = useState()
  const commoditytype = commodityTypes && commodityTypes.map((type) => ({ 'id': type.id, 'name': type.name }))
  // const commoditytypeId = commodityTypes && commodityTypes.map((type) => (type.id))

  const organaization_id = userInfo?.organizations?.id;
  const companyId = userInfo?.companies?.find((company) => (company.id))
  const [paginates, setPaginates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const company_id = companyId?.id;

  useEffect(() => {
    getCommodities()
    getCommodityTypes()
  }, [])


  /* Add Commodity start*/
  const addCommodite = async (e) => {
    e.preventDefault();

    const payload = {
      organization_id: organaization_id,
      company_id: company_id,
      commodity_type_id: e.target.commodityType.value,
      grade: e.target.grade.value,
      unit: e.target.unit.value,
      rate: e.target.rate.value,
      action_performed_by: "5678567675"
    };
    try {
      const res = await axios.post("commodity/create", payload);

      getCommodities()
    } catch (error) {
      console.log(error);
    }
  };
  /* Add Commodity end*/

  /* Update Commodity start*/
  const updatedCommodity = async (e) => {
    e.preventDefault();

    const payload = {
      organization_id: organaization_id,
      company_id: company_id,
      id: e.target.commodityId.value,
      commodity_type_id: e.target.commodityType.value,
      grade: e.target.grade.value,
      unit: e.target.unit.value,
      rate: e.target.rate.value,
      action_performed_by: "5678567675"
    };

    try {
      const res = await axios.post("commodity/update", payload);
      getCommodities()
    } catch (error) {
      console.log(error);
    }
  };
  /* Update Commodity end*/

  const [filter, setFilter] = useState("first_name");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value)
    getCommodities(null, value, filter);

  }


  /* get All Commodity start */
  const getCommodities = async (url, search = "") => {
    const dataUrl = url != null ? `commodity/index${url}` : `commodity/index`;
    const searchUrl = `?search=${search}`;
    const res = await axios.get(`${dataUrl}${url != null ? "&" : ""}${searchUrl}&filter=${filter}`);
    setPaginates(res.data?.data?.links);
    const commodities = await res?.data?.getDatas?.data;

    // const commodity = commodities?.map(commodity => setCommodities(commodity))
    setCommodities(commodities);
  };
  /* get All Commodity end*/

  /* get All Commoditytype start */
  const getCommodityTypes = async () => {
    const res = await axios.get("commodity-type/index");
    setCommodityTypes(res?.data?.types);
  };
  /* get All Commoditytype end*/



  /*Table body */
  const tableBody = () => {
    let arr = [{}];
    commodities && commodities?.map((commodity, index) => {
      if (commodity.company_name != 'undefined') {
        let obj = {
          'commodityType': commodity.type.name,
          'company_abn': commodity.grade,
          'unit': commodity.unit,
          "rate": commodity.rate,
          'action': (
            <div className="btn-group btn-group-sm material-action-btn">
              <form onSubmit={updatedCommodity}>
                <BsModal btnName={<i className="bi bi-pencil-square fs-6 text-primary"></i>} modalTitle={"Edit Commodity"} btnVariant={"transparent"}>
                  <input type="hidden" name="commodityId" defaultValue={commodity.id} />
                  {/* Start Input */}
                  <Select
                    props={commoditytype}
                    label={"Commodity Type"}
                    name="commodityType"
                    optionlabel='name'
                    optionvalue='id'
                  />
                  <TextInput
                    props={{ label: "Grade", type: "text", name: "grade", defaultValue: commodity.grade }}
                  />
                  <TextInput props={{ label: "Unit", type: "text", name: "unit", defaultValue: commodity.unit }} />
                  <TextInput
                    props={{ label: "Rate", type: "number", name: "rate", defaultValue: commodity.rate }}
                  />

                  {/* End Input  */}
                </BsModal>
              </form>
              <Link href="organization/[company_slug]/commodities#">
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

  console.log(commodities);
  /*Table body */
  return (
    <section className="row">
      <h3 className="page-headline">{commodities?.length || 0} Commodities</h3>
      {/* Heading of Page */}
      <div className="page-filter col-lg-11 ">
        {/* Filter Start */}
        <div className="item input-group align-items-center gap-3">
          <div className="d-flex">
            <ModalBtn props={{ btnId: "commodities", btnName: "Add" }} />
            <FilterSelect props={[{
              id: 1,
              value: "type",
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
            },]} />
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
        tableHeads: ["Commodity Type", "Grade", "Unit", "Rate", "Action"],
        tableBody: tableBody(),
      }} />
      {/* pagination  */}
      <Pagination paginates={paginates} action={getCommodities} />
      {/* pagination  */}

      {/* // End of Table*/}


      {/* Add Commoditi start */}
      <form onSubmit={addCommodite}>
        <AddModal
          props={{ modalTittle: "Add Commoditie", modalId: "commodities" }}
        >
          {/* Start Input */}
          <Select
            props={commoditytype}
            label={"Commodity Type"}
            name="commodityType"
            optionlabel='name'
            optionvalue='id'
          />
          <TextInput
            props={{ label: "Grade", type: "text", name: "grade" }}
          />
          <TextInput props={{ label: "Unit", type: "text", name: "unit" }} />
          <TextInput
            props={{ label: "Rate", type: "number", name: "rate" }}
          />

          {/* End Input  */}
        </AddModal>
      </form>
      {/* Add Commoditi end */}

      {/* Update Commoditi start */}
      <form onSubmit={updatedCommodity}>
        <AddModal
          props={{ modalTittle: "Edit Commodity", modalId: "updatecommodity" }}
        >
          {/* Start Input */}

          <Select
            props={[]}
            label={"Commodity Type"}
            name="commodityType"
            optionlabel='name'
            optionvalue='id'
          />
          <TextInput
            props={{ label: "Grade", type: "text", name: "grade", defaultValue: "32423" }}
          />
          <TextInput props={{ label: "Unit", type: "text", name: "" }} />
          <TextInput
            props={{ label: "Rate", type: "number", name: "rate" }}
          />

          {/* End Input  */}
        </AddModal>
      </form>
      {/* Update Commoditi end */}
    </section>
  );
};





export default Commodities;

