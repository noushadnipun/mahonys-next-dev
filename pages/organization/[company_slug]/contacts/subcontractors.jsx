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
const Subcontractors = () =>{

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

    //Edit and Save Action
    const handleSave = async (e) => {
        e.preventDefault()
        let target = e.target
        let obj = {
            id : editData ? editData.id : false,
            subcontractor_id: target.subcontractor_id.value,
            company_name: target.company_name.value,
            company_abn: target.company_abn.value,
            company_email: target.company_email.value,
            company_phone: target.company_phone.value,
            contract_type: target.contract_type.value,
            rate_type: target.rate_type.value,
            rate: target.rate.value,
            address : {
                address : target.address.value,
                suburb : target.suburb.value,
                city : target.city.value,
                state : target.state.value,
                country : target.country.value,
            },
            organization_id: 1,
            company_id: 1
        }
        let route = editData ? '/subcontractor/update' : '/subcontractor/create'
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
    //Search Filter

    const searchFilter = (obj = {}) => {
        let merge = {...filter, ...obj}
        setFilter({filter : merge.filter, sort : merge.sort, search : merge.search, page: 1 })
        loadAllData(obj)
    }
    return (
        <>
            <Toaster />
            <section className="row">
                <h3 className="page-headline">{total || 'List of '} Subcontractors</h3>

                <div className="page-filter col-lg-11">
                    <div className=' item input-group align-items-center gap-3'>
                        <div className="d-flex">
                            <button className={'btn btn-primary btn-sm me-3'} onClick={() => addModal()}><i className="bi bi-plus"></i> Add</button>
                            <FilterSelect action={(e) => searchFilter({filter: e.target.value})} props={[
                                {value: '', label: 'Filter'},
                                {value: "company_abn", label: "Business Number"},
                            ]} setFilter={setFilter} />
                        </div>
                        <div className="me-3">
                            <input name="search"  type="text" className="search_input"  onKeyUp={(e) => searchFilter({search: e.target.value})}  placeholder="Search"/>
                        </div>

                        <div className="me-3">
                            <span className='me-1'>Show</span>
                            <FilterSelect  defaultValue={filter.sort} action={(e) => searchFilter({sort: e.target.value})} props={[
                                { value: "2", label: "2"},
                                { value: "5", label: "5"},
                                { value: "10", label: "10"},
                                { value: "20", label: "20"},
                            ]} setFilter={setFilter} />
                            <span className='ms-1'>entries</span>
                        </div>
                    </div>
                </div>
                <Lists datas={getData} onEditItem={handleEdit} />
                <Paginate datas={paginate} handleAction={paginateAction} />
                <FormData data={editData} modalShow={editData  !== null}  save={handleSave}  modalHeader={'Edit Subcontractor'} modalHide={() => (setEditData(null))} />
                <FormData modalShow={addData  !== null}  save={handleSave}  modalHeader={'Add Subcontractor'}  modalHide={() => (setAddData(null))} />
            </section>
        </>
    )
}
export default Subcontractors;



// Fetch Data
const fetchData  = async (filter = {}) => {
    let route = '/subcontractor/index';
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
                    'subcontractor_name': item.sub_contract.company_name,
                    'contract_type': item.contract_type,
                    'company_abn': item.sub_contract.company_abn,
                    'email': item.sub_contract.company_email,
                    'phone': item.sub_contract.company_phone,
                    'rate' : item.rate,
                    'insurance' : '',
                    'invoice': '',
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
                tableHeads: ["Subcontractor Name","Subcontractor Type", "Business Number", "Email", "Phone", "Subcontractor Rate", "Insurance", "Get Invoice", "Action"],
                tableBody: tableBody() ?? []
            }} />
        </>
    )
}



//Data Assign
let subContractorType = [
    {'name':'towhaulier', 'label' : 'Tow Haulier'},
    {'name':'normal', 'label': 'Normal'}
];
let rateType = [
    {'name':'percentage', 'label' : 'Percentage'},
    {'name': 'fixed', 'label': 'Fixed'}
];

//Edit/Add Data
const FormData = ({data, modalShow, modalHide, save, modalHeader}) => {
    const [formData, setFormData] = useState(data);
    const [typingTimeout, setTypingTimeout] = useState(null);
    useEffect(() => {
        setFormData(data);
    }, [data]);
    const address = formData && formData.sub_contract && formData.sub_contract.company_address   ? JSON.parse(formData?.sub_contract?.company_address) : false;

    let [msg, setMsg]  = useState(false)

    //Search method
    const searchAbn = async (e) => {
        e.preventDefault()
        let value = e.target.value
        clearTimeout(typingTimeout);

        if(value.trim() === '') {
            setMsg(false)
        }else{
            const timeoutId = setTimeout(async () => {
            let res = await axios.post('/subcontractor/single_search', {
                'search_key': 'company_abn',
                'search_keyword': value
            });
            if (res.data.status) {
                setMsg(<span className={'text-success'}>ABN matched</span>)
                let companyData = res.data.getDatas
                setFormData({
                    subcontractor_id : companyData.id,
                    sub_contract :{
                        company_address : companyData.company_address,
                        company_abn : companyData.company_abn,
                        company_name : companyData.company_name,
                        company_email : companyData.company_email,
                        company_phone : companyData.company_phone,
                    }
                });
            } else {
                setFormData({});
                setMsg('ABN not match');
            }
            }, 500); // Delay state update by 500 milliseconds after user stops typing
            setTypingTimeout(timeoutId);
        }
    }//End Search method
    // console.log(formData)
    return (
        <>
            <Bmodal modalShow={modalShow} modalHide={modalHide} modalHeader={modalHeader}  className={''} save={save} form={true}>
                <div className="form-group has-search mb-3">
                    <span className="bi bi-search form-control-feedback"></span>
                    <input type="text" className="form-control w-75" placeholder="Search"  onChange={searchAbn} defaultValue={''} />
                    <div className={'text-danger'}>{msg}</div>
                </div>

                <div className={'material-form columns'}>
                    <TextInput props={{ label: "Subcontrcator ID", placeholder: "Subcontractor ID", type: "text", readonly: true,  name: "subcontractor_id", value: formData?.subcontractor_id}} />
                    <TextInput props={{ label: "Company ABN", placeholder: "Subcontractor ABN", type: "text", readonly: true,  name: "company_abn", value: formData?.sub_contract?.company_abn }} />
                    <TextInput props={{ label: "Subcontractor Name", readonly: true, type: "text",  name: "company_name", value: formData?.sub_contract?.company_name }} />
                    <TextInput props={{ label: "Email", type: "email",  readonly: true, name: "company_email", value: formData?.sub_contract?.company_email  }} />
                    <TextInput props={{ label: "Phone", type: "number",  readonly: true, name: "company_phone", value: formData?.sub_contract?.company_phone  }} />
                    <TextInput props={{ label: "Street Address", type: "text",  readonly: true, name: "address", value: address?.address }} />
                    <TextInput props={{ label: "Suburb", type: "text", name: "suburb",  readonly: true, value: address?.suburb }} />
                    <TextInput props={{ label: "City", type: "text",  readonly: true, name: "city", value: address?.city }} />
                    <TextInput props={{ label: "State", type: "text" ,  readonly: true, name: "state", value: address?.state }} />
                    <TextInput props={{ label: "Country", type: "text",  readonly: true, name: "country", value: address?.country }} />
                    <Select props={subContractorType}  label={"Contract Type"}  name="contract_type"  optionlabel='label'  optionvalue='name' selected={data?.contract_type} />
                    <Select props={rateType} label={"Subcontractor Rate Calculation Type (Optional)"} name="rate_type"  optionlabel='label' optionvalue='name'  selected={data?.rate_type } />
                    <TextInput props={{ label: "Subcontractor Rate (Optional)", type: "text",  name: "rate", value: data?.rate }} />
                </div>

            </Bmodal>
        </>
    )
}
