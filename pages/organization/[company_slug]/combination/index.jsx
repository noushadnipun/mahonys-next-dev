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


//All Component Assign
const Combination = () =>{
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
            'first_page_url' : res.getDatas.first_page_url,
            'links' : res.getDatas.links,
            'last_page_url' : res.getDatas.last_page_url
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
            combination_type_name : target.combination_type_name.value,
            combination_fleet_code : target.combination_fleet_code.value,
            gml : target.gml.value,
            cml : target.cml.value,
            hml : target.hml.value,
            net_qty_per_load : target.net_qty_per_load.value,
            description: target.description.value,
        }
        let route = editData ? '/combination/update' : '/combination/create'
        let res = await axios.post(route, obj)
        res = res.data;
        if(res.status){
            setEditData(null) //modal
            setAddData(null)
            setData(loadAllData()) //reload All Data
            toast.success('Successfully Updated')
        }else {
            if(res.message && res.message.length > 0){
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
                <h3 className="page-headline">{total || 'List of '} Combination</h3>

                <div className="page-filter">
                    <div className="d-flex">
                        <button className={'btn btn-primary btn-sm me-3'}
                                onClick={() => addModal()}><i className="bi bi-plus"></i> Add</button>
                        <FilterSelect action={(e) => searchFilter({filter: e.target.value})} props={[
                            {
                                value: '',
                                label: 'Filter'
                            },
                            {
                                value: "name",
                                label: "Name"
                            },

                        ]} setFilter={setFilter} />
                        <div className="mx-3 py-0">
                            <input
                                name="search"
                                type="text"
                                className="search_input"
                                onKeyUp={(e) => searchFilter({search: e.target.value})}
                                placeholder="Search"
                            />
                        </div>

                        <div className="me-3 py-0">
                            <span className='me-1'>Show</span>
                            <FilterSelect defaultValue={filter.sort} action={(e) => searchFilter({sort: e.target.value})} props={[
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
                          modalHeader={'Edit Combination'}
                          modalHide={() => (setEditData(null))}
                />
                <FormData modalShow={addData  !== null}
                          save={handleSave}
                          modalHeader={'Add Combination'}
                          modalHide={() => (setAddData(null))}
                />
            </section>
        </>
    )
}
export default Combination;





// Fetch Data
const fetchData  = async (filter = {}) => {
    let route = '/combination/index';
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
                    'combination_type_name': item.combination_type_name,
                    'combination_fleet_code': item.combination_fleet_code,
                    'description': item.description,
                    'gml': item.gml,
                    'cml': item.cml,
                    'hml': item.hml,
                    'net_qty_per_load': item.net_qty_per_load,
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
                tableHeads: ["Name of Combination Type", "Combination Fleet Code", "Description", "gml", "cml", "hml", "net_qty_per_load",  "Action"],
                tableBody: tableBody() ?? []
            }} />
        </>
    )
}

//Edit/Add Data
const FormData = ({data, modalShow, modalHide, save, modalHeader}) => {
    return (
        <>
            <Bmodal modalShow={modalShow} modalHide={modalHide} modalHeader={modalHeader}
                    className={'material-form columns'} save={save} form={true}>
                <TextInput
                    props={{ label: "Name of Combination Type", type: "text", name: "combination_type_name", value: data?.combination_type_name }}
                />
                <TextInput
                    props={{ label: "Combination Fleet Code", type: "text", name: "combination_fleet_code", value: data?.combination_fleet_code }}
                />
                <TextInput props={{ label: "Description", type: "text", name: "description",  value: data?.description }} />
                <TextInput props={{ label: "General Mass Limit", type: "text", name: "gml",  value: data?.gml }} />
                <TextInput props={{ label: "Concessional Mass Limit", type: "text", name: "cml",  value: data?.cml }} />
                <TextInput props={{ label: "Higher Mass Limit", type: "text", name: "hml",  value: data?.hml }} />
                <TextInput props={{ label: "Net Qty Per Load", type: "text", name: "net_qty_per_load",  value: data?.net_qty_per_load }} />
            </Bmodal>
        </>
    )
}
