import ModalBtn from "@/components/button/Modal";
import PageTittle from "@/components/common/PageTittle";
import Pagination from "@/components/common/Pagination";
import Table from "@/components/common/Table";
import FilterSelect from "@/components/common/form/FilterSelect";
import SelectInput from "@/components/common/form/SelectInput";
import TextInput from "@/components/common/form/TextInput";
import AddModal from "@/components/modal/AddModal";
import BsModal from "@/components/modal/BsModal";


import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "@/helpers/axios";

const CommoditiTypes = () => {
  const [commodityTypes, setCommodityTypes] = useState([])
  const [paginates, setPaginates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    getCommodityTypes()
    tableBody()
  }, [])

  /* Add commodityType Start */
  const addCommodityType = async (e) => {
    e.preventDefault();
    const payload = {
      name: e.target.CommoditiTypes.value,
      description: e.target.description.value
    }
    try {
      const res = await axios.post("commodity-type/create", payload);
      getCommodityTypes()
      console.log(type);
    } catch (error) {
      console.log(error);
    }
  }
  /* Add commodityType End */

  console.log(commodityTypes);

  /* update commodityType Start */
  const updateCommodityType = async (e) => {
    e.preventDefault();
    const payload = {
      id: e.target.commoditytypeId.value,
      name: e.target.CommoditiTypes.value,
      description: e.target.description.value
    }
    try {
      const res = await axios.post("commodity-type/update", payload);
      getCommodityTypes()

      console.log(type);
    } catch (error) {
      console.log(error);
    }
  }
  /* update commodityType End */

  const [filter, setFilter] = useState("first_name");

  /* get All Commoditytype start */
  const getCommodityTypes = async (url, search = "") => {

    const dataUrl = url != null ? `commodity-type/index${url}` : `commodity-type/index`;
    const searchUrl = `?search=${search}`;
    const res = await axios.get(`${dataUrl}${url != null ? "&" : ""}${searchUrl}&filter=${filter}`);
    console.log(res.data)
    setCommodityTypes(res.data?.types);
  };
  /* get All Commoditytype end*/

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value)
    getCommodities(null, value, filter);

  }


  console.log(commodityTypes)

  /*Table body */
  const tableBody = () => {
    let arr = [{}];
    commodityTypes && commodityTypes?.map((commodityType, index) => {
      if (commodityTypes.company_name != 'undefined') {
        let obj = {
          'types': commodityType.name,
          'description': commodityType.description,
          'action': (
            <div className="btn-group btn-group-sm material-action-btn">
              <form onSubmit={updateCommodityType}>
                <BsModal btnName={<i className="bi bi-pencil-square fs-6 text-primary"></i>} modalTitle={"Edit Commodity Type"} btnVariant={"transparent"}>
                  <input type="hidden" name="commoditytypeId" defaultValue={commodityType.id} />
                  {/* Start Input */}

                  <TextInput props={{ label: "Commodities Name", type: "text", name: "CommoditiTypes", defaultValue: commodityType.name }} />
                  <TextInput props={{ label: "Drescriptions", type: "text", name: "description", defaultValue: commodityType.description }} />

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
      <PageTittle titlte={"Commodities types"} />
      {/* Heading of Page */}
      <div className="page-filter col-lg-11 ">
        {/* Filter Start */}
        <div className="item input-group align-items-center gap-3">
          <div className="d-flex">
            <ModalBtn props={{ btnId: "commodities", btnName: "Add" }} />
            <FilterSelect props={["Filter", "Fleet Code", "Who is using"]} />
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
        tableHeads: ["Name", "Drescriptions", "Action"],
        tableBody: tableBody(),
      }} />
      {/* pagination  */}
      <Pagination paginates={paginates} action={getCommodityTypes} />
      {/* pagination  */}

      {/* // End of Table*/}


      {/* Add Commodity Types modal start */}
      <form onSubmit={addCommodityType}>
        <AddModal
          props={{ modalTittle: "Add Commoditie", modalId: "commodities" }}
        >
          {/* Start Input */}

          <TextInput props={{ label: "Commodities Name", type: "text", name: "CommoditiTypes" }} />
          <TextInput props={{ label: "Drescriptions", type: "text", name: "description" }} />

          {/* End Input  */}
        </AddModal>
      </form>
      {/* Add Commodity Types modal end */}


      {/* update Commodity Types modal start */}
      <form onSubmit={updateCommodityType}>
        <AddModal
          props={{ modalTittle: "Add Commoditie", modalId: "updatecommodity" }}
        >
          {/* Start Input */}

          <TextInput props={{ label: "Commodities Name", type: "text", name: "CommoditiTypes" }} />
          <TextInput props={{ label: "Drescriptions", type: "text", name: "description" }} />

          {/* End Input  */}
        </AddModal>
      </form>
      {/* update Commodity Types modal end */}
    </section>
  );
};

export default CommoditiTypes;
