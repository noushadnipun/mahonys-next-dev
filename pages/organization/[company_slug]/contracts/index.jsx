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
const Contracts = ({userDetails}) =>{

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
            customer_id: target.customer_id.value,
            commodity_type_id: target.commodity_type_id.value,
            commodity_id: 24,
            pickup_location: target.pickup_location.value,
            dropoff_location: target.dropoff_location.value,
            total_kms : target.total_kms.value,
            contract_rate: target.contract_rate.value,
            subcontractor_rate: target.subcontractor_rate.value,
            start_date: target.start_date.value,
            end_date: target.end_date.value,
            estimated_tonnage: target.estimated_tonnage.value,
            note_for_driver: target.note_for_driver.value,
            note_for_admin: target.note_for_admin.value,
            organization_id: userDetails?.organization_id,
            company_id: userDetails?.company_id


        }
        let route = editData ? '/contracts/update' : '/contracts/create'
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
                <h3 className="page-headline">{total || 'List of '} Contracts</h3>

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
                                    value: "user_companies.company_name",
                                    label: "Customer Company"
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
export default Contracts;





// Fetch Data
const fetchData  = async (filter = {}) => {
    let route = '/contracts/index';
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
                    'customer_id': item.customer_company_name,
                    'commodity_type_id': item.commodity_type_name,
                    'pickup_location': item.pickup_location,
                    'dropoff_location': item.dropoff_location,
                    'total_kms': item.total_kms,
                    'contract_rate': item.contract_rate,
                    'subcontractor_rate': item.subcontractor_rate,
                    'start_date': item.start_date,
                    'end_date': item.end_date,
                    'estimated_tonnage' : item.estimated_tonnage,
                    'note_for_driver' : item.note_for_driver,
                    'note_for_admin' : item.note_for_admin,
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
                tableHeads: ["Company", "Commodity", "Pickup", "Drop-off", "Total KM", "Rate", "Sub Contractor Rate", "Start Date", "End Date", "Quantity", "Driver Notes", "Admin Notes",  "Action"],
                tableBody: tableBody() ?? []
            }} />
        </>
    )
}

//Edit/Add Data
const FormData = ({data, modalShow, modalHide, save, modalHeader}) => {
    const [commodityType, setCommodityType] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const load = async () => {
            let types = await getCommodityTypes();
            let customers = await getCustomer();
            setCommodityType(types)
            setCustomers(customers)
        }
        load()
    }, [setCommodityType, setCustomers])

    return (
        <>
            <Bmodal modalShow={modalShow} modalHide={modalHide} modalHeader={modalHeader}
                    className={'material-form columns'} save={save} form={true}>
                <Select
                    props={customers}
                    label={"Customers"}
                    name="customer_id"
                    optionlabel='name'
                    optionvalue='id'
                    selected={data?.customer_id }
                />

                <Select
                    props={commodityType}
                    label={"Commodity Type"}
                    name="commodity_type_id"
                    optionlabel='name'
                    optionvalue='id'
                    selected={data?.commodity_type_id }
                />
                <TextInput
                    props={{ label: "Pickup Location", type: "text", name: "pickup_location", value: data?.pickup_location }}
                />
                <TextInput props={{ label: "Drop-Off Location", type: "text", name: "dropoff_location",  value: data?.dropoff_location }} />
                <TextInput
                    props={{ label: "Total KMS", type: "text", name: "total_kms", value: data?.total_kms }}
                />
                <TextInput
                    props={{ label: "Contract Rate", type: "text", name: "contract_rate", value: data?.contract_rate }}
                />
                <TextInput
                    props={{ label: "Subcontractor Rate", type: "text", name: "subcontractor_rate", value: data?.subcontractor_rate }}
                />
                <TextInput
                    props={{ label: "Delivery Start Date", type: "date", name: "start_date", value: data?.start_date }}
                />
                <TextInput
                    props={{ label: "Delivery End Date", type: "date", name: "end_date", value: data?.end_date }}
                />
                <TextInput
                    props={{ label: "Estimated Tonnage", type: "text", name: "estimated_tonnage", value: data?.estimated_tonnage }}
                />
                <TextInput
                    props={{ label: "Note for Driver", type: "text", name: "note_for_driver", value: data?.note_for_driver }}
                />
                <TextInput
                    props={{ label: "Note for Admin", type: "text", name: "note_for_admin", value: data?.note_for_admin }}
                />
            </Bmodal>
        </>
    )
}



//Get Customer
export const getCustomer = async () => {
    let res = await axios.get("customer/index/?sort=all");
    console.log(res)
    res = res.data.getDatas.data
    let data = [];
    res.map((item) => {
        let obj = {
            'id': item.id, 'name': item.company_name
        }
        data.push(obj)
    })

    return data;
};


//Get Commodty Type
export const getCommodityTypes = async () => {
    let res = await axios.get("commodity-type/index/?sort=all");
    console.log(res)
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