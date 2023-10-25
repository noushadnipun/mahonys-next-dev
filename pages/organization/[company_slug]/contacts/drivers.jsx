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
const Drivers = ({userDetails}) =>{

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
            first_name: target.first_name.value,
            last_name : target.last_name.value,
            gender : target.gender.value,
            meta_key : {
                license_number: target.license_number.value
            },
            email: target.email.value,
            phone: target.phone.value,
            address : {
                address : target.address.value,
                suburb : target.suburb.value,
                city : target.city.value,
                state : target.state.value,
                country : target.country.value,
            },
            organization_id: userDetails?.organization_id,
            company_id: userDetails?.company_id
        }
        let route = editData ? '/driver/update' : '/driver/create'
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
                <h3 className="page-headline">{total || 'List of '} Drivers</h3>

                <div className="page-filter col-lg-11">
                    <div className=' item input-group align-items-center gap-3'>
                        <div className="d-flex">
                            <button className={'btn btn-primary btn-sm me-3'}
                                    onClick={() => addModal()}><i className="bi bi-plus"></i> Add</button>


                            <FilterSelect action={(e) => searchFilter({filter: e.target.value})} props={[
                                {
                                    value: '',
                                    label: 'Filter'
                                },
                                {
                                    value: "first_name",
                                    label: "First Name"
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
                          modalHeader={'Edit Driver'}
                          modalHide={() => (setEditData(null))}
                />
                <FormData modalShow={addData  !== null}
                          save={handleSave}
                          modalHeader={'Add Driver'}
                          modalHide={() => (setAddData(null))}
                />
            </section>
        </>
    )
}
export default Drivers;





// Fetch Data
const fetchData  = async (filter = {}) => {
    let route = '/driver/index';
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
                    'name': item.first_name+' '+item.last_name,
                    'license_number': item?.license_number,
                    'gender': item?.gender,
                    'email': item.email,
                    'phone': item.phone,
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
                tableHeads: ["Name", "License Number", "Gender", "Email", "Phone", "Action"],
                tableBody: tableBody() ?? []
            }} />
        </>
    )
}

//Edit/Add Data
const FormData = ({data, modalShow, modalHide, save, modalHeader}) => {

    let address = data? JSON.parse(data?.address) : false;
    let gender = [
        {
            'name' : 'Male'
        },
        {
            'name' : 'Female'
        }
    ]
    return (
        <>
            <Bmodal modalShow={modalShow} modalHide={modalHide} modalHeader={modalHeader}
                    className={'material-form columns'} save={save} form={true}>
                <TextInput props={{ label: "First Name", type: "text",  name: "first_name", value: data?.first_name }} />
                <TextInput props={{ label: "Last Name", type: "text", name: "last_name", value: data?.last_name  }} />
                <TextInput props={{ label: "License Number", type: "text", name: "license_number", value: data?.license_number  }} />
                <Select
                    props={gender}
                    label={"Gender"}
                    name="gender"
                    optionlabel='name'
                    optionvalue='name'
                    selected={data?.gender}
                />
                <TextInput props={{ label: "Email", type: "email", name: "email", value: data?.email  }} />
                <TextInput props={{ label: "Phone", type: "number", name: "phone", value: data?.phone  }} />
                <TextInput props={{ label: "Address", type: "text", name: "address", value: address?.address }} />
                <TextInput props={{ label: "Suburb", type: "text", name: "suburb", value: address?.suburb }} />
                <TextInput props={{ label: "City", type: "text", name: "city", value: address?.city }} />
                <TextInput props={{ label: "State", type: "text" , name: "state", value: address?.state }} />
                <TextInput props={{ label: "Country", type: "text", name: "country", value: address?.country }} />

            </Bmodal>
        </>
    )
}



