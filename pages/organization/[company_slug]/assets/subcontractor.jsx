import React, {useEffect, useState} from 'react';
import Bmodal from "@/components/Bmodal";
import TextInput from "@/components/common/form/TextInput";
import Select from "@/components/common/form/SelectInput";
import axios from "@/helpers/axios";
import {toast, Toaster} from "react-hot-toast";
import Table from "@/components/common/Table";

function Subcontractor(props) {
    const [addData, setAddData] = useState(null)
    const [listData, setListData] = useState(null)
    const {assetInfo} = props
    function addModal() { // add modal Function
        setAddData(true)
    }

    const assetSubContractorList = () => {
        setListData(true)
    }
    const loadDataInLists = async () => {
        await load();
    }
    return (
        <>
            <Toaster />

            <div className={"btn-group btn-group-sm material-action-btn"}>
                <button onClick={() => assetSubContractorList()} className={'btn btn-sm btn-gray py-0'}>Subcontractor</button>
                <button className={'btn btn-sm btn-primary py-0'}
                        onClick={() => addModal()}
                >+</button>
            </div>
            <Lists assetInfo={assetInfo} data={loadDataInLists}  modalShow={listData  !== null}
                   modalHeader={'Subcontractor List'}
                   modalHide={() => (setListData(null))}
            />
            <FormData assetInfo={assetInfo} data={props.assetInfo} modalShow={addData  !== null}
                      modalHeader={'Add Subcontractor'}
                      modalHide={() => (setAddData(null))}
            />

        </>
    );
}

export default Subcontractor;



const Lists = ({assetInfo, data, modalShow, modalHide, modalHeader}) => {
    const [datas, setDatas] = useState([]);

    const remove = async (id) => {
        let res = await axios.post('/assets/subcontractor-remove', {'id' : id});
        res = res.data;
        if(res.status){
            toast.success(res.message)
            load()
        }
    }
    const load = async () => {
        let res = await axios.post('/assets/get-asset-subcontractor-list', {asset_id : assetInfo?.id})
        res = res.data;
        res = res.getDatas;
        let tableBody = [];
        res.map((item) => {
            let obj = {
                'company_name' : item.company_name,
                'action' : (
                    <button onClick={() => remove(item.id)} className={'badge alert alert-danger text-dark py-1 mb-0'}>Remove</button>
                )
            }
            tableBody.push(obj)
        })
        setDatas(tableBody)
    }
    useEffect(() => {
        load()
    }, []);

    return (
        <>
            <Bmodal modalShow={modalShow} modalHide={modalHide} modalHeader={modalHeader}
                    modalSize={'md'} className={''} saveBtn={false} cancelBtn={false}>
                <Table className={'secondary'} props={{
                    tableHeads: ["Subcontractor Name", "Action"],
                    tableBody: datas ?? []
                }} />

            </Bmodal>
        </>
    )
}





const FormData = ({assetInfo, data, modalShow, modalHide, modalHeader}) => {
    const [datas, setDatas] = useState([]);
    const search = async (value ='') => {
        // let value = value;
        let route = '/assets/get-subcontractor-list';
        let res = await axios.post(route, {
            'search': value
        })
        res = res.data;
        res = res.getDatas
        let tableBody = [];
        res.map((item) => {
            let obj = {
                'company_name' : item.company_name,
                'action' : (
                    <button className={'badge alert alert-success text-dark py-1 mb-0'}
                            onClick={() => addAction(item)}>Add</button>
                )
            }
            tableBody.push(obj)
        })
        setDatas(tableBody);
    }
    useEffect(() => {
        search()
    }, []);

    const addAction = async (item) => {
        let obj = {
            'asset_id' : data.id,
            'subcontractor_id' : item.id,
            'company_id' : 1,
            'organization_id' : 1
        }
        let res = await axios.post('/assets/subcontractor-store', obj);
        search()
        toast.success(res.data.message);
    }

    return (
        <>
            <Bmodal modalShow={modalShow} modalHide={modalHide} modalHeader={modalHeader}
                    modalSize={'md'} className={''} saveBtn={false} cancelBtn={false}>
                <div className="form-group has-search mb-3">
                    <span className="bi bi-search form-control-feedback"></span>
                    <input type="text" className="form-control" placeholder="Search"  onChange={(e) => search(e.target.value)} defaultValue={''} />
                </div>

                <Table className={'secondary'} props={{
                    tableHeads: ["Subcontractor Name", "Action"],
                    tableBody: datas ?? []
                }} />

            </Bmodal>
        </>
    )
}

