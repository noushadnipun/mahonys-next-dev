import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from "@/components/common/Table";
import { useRouter } from 'next/router';
import axios from '@/helpers/axios';
import FilterSelect from "@/components/common/form/FilterSelect";
import Paginate from "@/components/Paginate";
import Bmodal from "@/components/Bmodal";
import TextInput from "@/components/common/form/TextInput";
import {toast} from "react-hot-toast";
import Select from "@/components/common/form/SelectInput";
import Subcontractor from "@/pages/organization/[company_slug]/assets/subcontractor";
import Combination from "@/pages/organization/[company_slug]/assets/combination";
import Radio from "@/components/common/form/Radio";

const Assets = ({userDetails}) => {
    const router = useRouter();
    const [getData, setData] = useState([])
    const [total, setTotal] = useState()
    const [paginate, setPaginate] = useState([])
    const [editData, setEditData] = useState(null)
    const [addData, setAddData] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [filter, setFilter] = useState({sort : 10, search: '', filter: '', page: 1, company_id: userDetails?.compnay_id});

    const loadAllData = async (obj) => {
        let merge ={...filter, ...obj}
        let res = await fetchData(merge);
        setData(res.getDatas.data)
        setTotal(res.getDatas.total)
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
            registration_no: target.registration_no.value,
            fleet_code : target.fleet_code?.value,
            general_load_capacity: target.general_load_capacity.value,
            linked_equipment: target.linked_equipment.value,
            driver_id: target.driver_id?.value,
            vehicle_type: target.vehicle_type.value,
            who_owns : target.who_owns.value,
            organization_id: userDetails?.organization_id,
            company_id: userDetails?.company_id
        }
        let route = editData ? '/assets/update' : '/assets/create'
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

    return (
        <section className="row">
            <h3 className="page-headline">{total || 'List of '} Assets</h3>
            <div className="page-filter col-lg-11">
                <div className=' item input-group align-items-center gap-3'>
                    <div className="d-flex">
                        <button className={'btn btn-primary btn-sm me-3'}
                                onClick={() => addModal()}><i className="bi bi-plus"></i> Add</button>


                        <FilterSelect  action={(e) => searchFilter({filter: e.target.value})} props={[
                            {value: '', label: 'Filter'},
                            {value: "fleet_code", label: "Fleet Code"},
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
                            {value: "2", label: "2"},
                            {value: "5", label: "5"},
                            {value: "10", label: "10"},
                            {value: "20", label: "20"},
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
                      modalHeader={'Edit Asset'}
                      modalHide={() => (setEditData(null))}
            />
            <FormData modalShow={addData  !== null}
                      save={handleSave}
                      modalHeader={'Add Asset'}
                      modalHide={() => (setAddData(null))}
            />
        </section>
    );
};


export default Assets;


// Fetch Data
const fetchData  = async (filter = {}) => {
    let route = '/assets/index';
    let defaults  ={page : '', search: '', sort: 2, filter: '', company_id: ''}
    let merge ={...defaults, ...filter}
    let res = await axios.get(`${route}?page=${merge.page}&&filter=${merge.filter}&&search=${merge.search}&&sort=${merge.sort}&&company_id=${merge.company_id}`)
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
                    'registration_no': item.registration_no,
                    'fleet_code': item.fleet_code,
                    'assigned_driver': item.driver_id ? item.first_name+ ' '+item.last_name : '',
                    //'asset_of': item.who_owns,
                    'subcontractor': item.who_owns == 'subcontractor' ? Subcontractor({assetInfo : item}) : '',
                    'vehicle_type': item.vehicle_type,
                    'general_load_capacity': item.general_load_capacity,
                    'linked_equipment' : item.linked_equipment,
                    'combination': Combination({assetInfo : item}),
                    'xero_division': "",
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
                tableHeads: ["Registration No", "Fleet Code", "Assigned Driver", "Subcontractor", "Vehicle Type", "GLC", 'Linked Equipment', 'Combination', "Xero Division", "Action"],
                tableBody: tableBody() ?? []
            }} />
        </>
    )
}


//Edit/Add Data
const FormData = ({data, modalShow, modalHide, save, modalHeader}) => {
    const [assignedDrivers, setAssignedDrivers] = useState([]);
    const [assetOf, setAssetOf] = useState();
    useEffect(() => {
        const loadDrivers = async () => {
            let driver = await getDrivers();
            setAssignedDrivers(driver)
        }
        loadDrivers()

        setAssetOf(data?.who_owns ?? 'own')

    }, [setAssignedDrivers, setAssetOf, data])

    let assetOfObj = [
        {'name': 'own', 'label' : 'Own'},
        {'name':'subcontractor', 'label':'Subcontractor'},
    ];
    const selectAssetOf =  (value) => {
        // console.log(value)
        setAssetOf(value)
    }
    return (
        <>
            <Bmodal modalShow={modalShow} modalHide={modalHide} modalHeader={modalHeader}
                    className={''} save={save} form={true}>

                <Radio required={true} checked={assetOf} onChange={(e) => selectAssetOf(e.target.value)} props={assetOfObj} name={'who_owns'} optionlabel={'label'} optionvalue ={'name'} />
                <div className="material-form columns">
                    <TextInput
                        props={{ label: "Registration Number", type: "text", name: "registration_no", value: data?.registration_no }}
                    />
                    {assetOf == 'own' ? (
                        <>
                            <TextInput props={{ label: "Fleet Code", type: "text", name: "fleet_code",  value: data?.fleet_code }} />
                            <Select
                                props={assignedDrivers}
                                label={"Assign Driver"}
                                name="driver_id"
                                optionlabel='name'
                                optionvalue='id'
                                selected={data?.driver_id }
                            />
                        </>
                    ) : ''}

                    <TextInput
                        props={{ label: "GLC", type: "text", name: "general_load_capacity", value: data?.general_load_capacity }}
                    />
                    <TextInput
                        props={{ label: "Linked Equipment", type: "text", name: "linked_equipment", value: data?.linked_equipment }}
                    />

                    <TextInput
                        props={{ label: "Vehicle Type", type: "text", name: "vehicle_type", value: data?.vehicle_type }}
                    />
                </div>
            </Bmodal>
        </>
    )
}

//Get Driver
export const getDrivers = async () => {
    let res = await axios.get("driver/index/?sort=all");
    res = res.data.getDatas.data
    let data = [];
    res.map((item) => {
        let obj = {
            'id': item.id,
            'name': item.first_name+ ' '+item.last_name
        }
        data.push(obj)
    })

    return data;
};