import React, {useEffect, useState} from "react";
import axios from "@/helpers/axios";
import Table from "@/components/common/Table";
import Bmodal from "@/components/Bmodal";
import {Button, Form, Modal} from "react-bootstrap";
import TextInput from "@/components/common/form/TextInput";
import {toast, Toaster} from "react-hot-toast";
import Select from "@/components/common/form/SelectInput";
import ModalBtn from "@/components/button/Modal";
import Paginate from "@/components/Paginate";
import FilterSelect from "@/components/common/form/FilterSelect";
import {useRouter} from "next/router";


//All Component Assign
const Commodities = ({userDetails}) =>{
    const [getData, setData] = useState([])
    const [total, setTotal] = useState()
    const [paginate, setPaginate] = useState([])
    const [editData, setEditData] = useState(null)
    const [addData, setAddData] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [filter, setFilter] = useState({sort : 10, search: '', filter: '', page: 1});




    const loadAllData = async (obj) => {
        let merge ={...filter, ...obj}
        let res = await fetchData(merge);
        setData(res.getDatas.data)
        setTotal(res.getDatas.total)
        // console.log(res.getDatas)
        setPaginate( {
            'links' : res.getDatas.links,
        })
    }

    useEffect( () => {
        loadAllData()
    }, [setData, setPaginate])


    function handleEdit(list){ //Edit Modal
        setEditData(list)
    }

    function addModal() { // add modal Function
        setAddData(true)
    }


    const handleSave = async (e) => {
        e.preventDefault()
        let target = e.target
        let obj = {
            id : editData ? editData.id : false,
            commodity_type_id: target.commodity_type_id.value,
            unit : target.unit.value,
            grade: target.grade.value,
            rate: target.rate.value,
            organization_id: userDetails?.organization_id,
            company_id: userDetails?.company_id
        }
        console.log(obj)
        let route = editData ? '/commodity/update' : '/commodity/create'
        let res = await axios.post(route, obj)
            res = res.data;
            if(res.status){
                setEditData(null) //modal
                setAddData(null)
                setData(loadAllData()) //reload All Data
                toast.success('Successfully Updated')
            }else {
                if(res.message.length > 0){
                    res.message.map((message, index) => {
                        toast.error(message)
                    })
                }
            }
    }

    const paginateAction = (url) =>{
        const paginateLink = url ? url.split('?page=') : ''
        loadAllData({page : paginateLink[1]})
    }

    const searchFilter = (obj = {}) => {
        let merge = {...filter, ...obj}
        setFilter({
            filter : merge.filter,
            sort : merge.sort,
            search : merge.search,
            page: 1
        })
        loadAllData(obj)
    }


    return (
        <>
            <Toaster />
            <section className="row">
                <h3 className="page-headline">{total || 'List of '} Commodities</h3>

                <div className="page-filter col-lg-11">
                    <div className=' item input-group align-items-center gap-3'>
                        <div className="d-flex">
                            <button className={'btn btn-primary btn-sm me-3'}
                                    onClick={() => addModal()}><i className="bi bi-plus"></i> Add</button>


                            <FilterSelect  action={(e) => searchFilter({filter: e.target.value})} props={[
                                        {
                                            value: '',
                                            label: 'Filter'
                                        },
                                        {
                                            value: "grade",
                                            label: "Grade"
                                        },
                                        {
                                            value: "unit",
                                            label: "unit"
                                        },

                                    ]} setFilter={setFilter} />


                            </div>
                            <div className="me-3">
                                <input
                                    name="search"
                                    type="text"
                                    className="search_input"
                                    onKeyUp={(e) => searchFilter({search: e.target.value})}
                                    placeholder="Search"
                                />
                            </div>

                            <div className="me-3">
                                <span className='me-1'>Show</span>
                                <FilterSelect  defaultValue={filter.sort} action={(e) => searchFilter({sort: e.target.value})} props={[
                                    {
                                        value: "2",
                                        label: "2"
                                    },

                                    {
                                        value: "5",
                                        label: "5"
                                    },
                                    {
                                        value: "10",
                                        label: "10"
                                    },
                                    {
                                        value: "20",
                                        label: "20"
                                    },

                                ]} setFilter={setFilter} />
                                <span className='ms-1'>entries</span>
                            </div>


                    </div>
                </div>

                <Lists datas={getData} onEditItem={handleEdit} />

                <Paginate datas={paginate} handleAction={paginateAction} />

                <FormData data={editData}
                      modalShow={editData  !== null}
                      save={handleSave}
                      modalHeader={'Edit Commodity'}
                      modalHide={() => (setEditData(null))}
                />
                <FormData modalShow={addData  !== null}
                      save={handleSave}
                      modalHeader={'Add Commodity'}
                      modalHide={() => (setAddData(null))}
                />
            </section>
        </>
    )
}
export default Commodities;





// Fetch Data
const fetchData  = async (filter = {}) => {
    let route = '/commodity/index';
    let defaults  ={page : '', search: '', sort: 2, filter: ''}
    let merge ={...defaults, ...filter}
    let res = await axios.get(`${route}?page=${merge.page}&&filter=${merge.filter}&&search=${merge.search}&&sort=${merge.sort}`)
    res = res.data;
    return res;
}
const Lists = ({datas, onEditItem}) => {
    let tableBody =  () => {
    let data = [];
        if(datas.length > 0){
            datas.map((item, index) => {
                // console.log(item)
                let obj = {
                    'commodity_type': item.type.name,
                    'grade': item.grade,
                    'unit': item.unit,
                    'rate': item.rate,
                    'action': (
                        <div className="btn-group btn-group-sm material-action-btn">
                            <button className={'btn btn-transparent text-primary btn-sm'}
                                    onClick={() => onEditItem(item)}><i className="bi bi-pencil-square"></i></button>
                        </div>
                    ),
                }
                data.push(obj)
            })
        }
        return data;
    }

    return (
        <>
            <Table props={{
                tableHeads: ["Commodity Type", "Grade", "Unit", "Rate", "Action"],
                tableBody: tableBody() ?? []
            }} />
        </>
    )
}

//Edit/Add Data
const FormData = ({data, modalShow, modalHide, save, modalHeader}) => {
    const [commodityType, setCommodityType] = useState([]);

    useEffect(() => {
        const loadCommodityType = async () => {
            let types = await getCommodityTypes();
            setCommodityType(types)
        }
        loadCommodityType()
    }, [setCommodityType])

    return (
        <>
            <Bmodal modalShow={modalShow} modalHide={modalHide} modalHeader={modalHeader}
                    className={'material-form columns'} save={save} form={true}>
                    <Select
                        props={commodityType}
                        label={"Commodity Type"}
                        name="commodity_type_id"
                        optionlabel='name'
                        optionvalue='id'
                        selected={data?.commodity_type_id }
                    />
                    <TextInput
                        props={{ label: "Grade", type: "text", name: "grade", value: data?.grade }}
                    />
                    <TextInput props={{ label: "Unit", type: "text", name: "unit",  value: data?.unit }} />
                    <TextInput
                        props={{ label: "Rate", type: "number", name: "rate", value: data?.rate }}
                    />
            </Bmodal>
        </>
    )
}



//Get Commodty Type
export const getCommodityTypes = async () => {
    let res = await axios.get("commodity-type/index/?sort=all");
    // console.log(res)
        res = res.data.getDatas.data
    let data = [];
        res.map((item) => {
            let obj = {
                'id': item.id, 'name': item.name
            }
            data.push(obj)
        })

    return data;
};