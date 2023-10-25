import React, {useEffect, useState} from 'react';
import Bmodal from "@/components/Bmodal";
import TextInput from "@/components/common/form/TextInput";
import Select from "@/components/common/form/SelectInput";
import Table from "@/components/common/Table";
import axios from "@/helpers/axios";
import Link from "next/link";
import {toast, Toaster} from "react-hot-toast";

function Combination(props) {
    const [addData, setAddData] = useState(null)
    const[listData, setListData] = useState(null)

    function addModal() { // add modal Function
        setAddData(true)
    }

    return (
        <>
            <Toaster />
            <div className={"btn-group btn-group-sm material-action-btn"}>
                <button onClick={() => setListData(true)} className={'btn btn-sm btn-gray py-0'}>Combintion</button>
                <button className={'btn btn-sm btn-primary py-0'}
                        onClick={() => addModal()}
                >+</button>
            </div>
            <Lists modalShow={listData  !== null}
                      modalHeader={'Combination List'}
                      modalHide={() => (setListData(null))}
            />
            <FormData data={props.assetInfo} modalShow={addData  !== null}
                      modalHeader={'Add Combination'}
                      modalHide={() => (setAddData(null))}
            />

        </>
    );
}

export default Combination;





const Lists = ({modalShow, modalHide, modalHeader}) => {
    const [datas, setDatas] = useState([]);

    const remove = async (id) => {
        let res = await axios.post('/assets/combination-remove', {'id' : id});
           res = res.data;
           if(res.status){
               toast.success(res.message)
               lists()
           }
    }

    const lists = async () => {
        let res = await axios.post('/assets/combination-list')
        res = res.data;
        res = res.getDatas;
        let tableBody = [];
        res.map((item) => {
            let obj = {
                'combination_name' : item.combination_name,
                'action' : (
                    <button onClick={() => remove(item.id)} className={'badge alert alert-danger text-dark py-1 mb-0'}>Remove</button>
                )
            }
            tableBody.push(obj)
        })
        setDatas(tableBody);
    }
    useEffect(() => {
        lists()
    }, []);

    return (
        <>
            <Bmodal modalShow={modalShow} modalHide={modalHide} modalHeader={modalHeader}
                    modalSize={'md'} className={''} saveBtn={false} cancelBtn={false}>
                <Table className={'secondary'} props={{
                    tableHeads: ["Combination Name", "Action"],
                    tableBody: datas ?? []
                }} />

            </Bmodal>
        </>
    )
}





const FormData = ({data, modalShow, modalHide, modalHeader}) => {
    const [datas, setDatas] = useState([]);
    const search = async (e) => {
        e.preventDefault();
        let value = e.target.value;
        let route = '/combination/index';
        let res = await axios.get(`${route}?&&filter=combination_type_name&&search=${value}&&sort=all`)
        res = res.data;
        res = res.getDatas.data;
        let tableBody = [];
        res.map((item) => {
            let obj = {
                'combination_type_name' : (
                    <TextInput onChange={(e) => item.combination_type_name= e.target.value}
                               props={{className: 'form-control-sm', name: 'combination_type_name', value: item.combination_type_name}} />
                ),
                'combination_fleet_code' : item.combination_fleet_code,
                'action' : (
                    <button className={'badge alert alert-success text-dark py-1 mb-0'}
                            onClick={() => addAction(item)}>Add</button>
                )
            }
            tableBody.push(obj)
        })
        setDatas(tableBody);
    }

    const addAction = async (item) => {
       let obj = {
           'asset_id' : data.id,
           'combination_id' : item.id,
           'combination_name' : item.combination_type_name,
           'company_id' : 1,
           'organization_id' : 1
       }
       let res = await axios.post('/assets/combination-store', obj);
       toast.success(res.data.message);
    }

    return (
        <>
            <Bmodal modalShow={modalShow} modalHide={modalHide} modalHeader={modalHeader}
                    modalSize={'md'} className={''} saveBtn={false} cancelBtn={false}>
                <div className="form-group has-search mb-3">
                    <span className="bi bi-search form-control-feedback"></span>
                    <input type="text" className="form-control" placeholder="Search"  onChange={search} defaultValue={''} />
                </div>

                <Table className={'secondary'} props={{
                    tableHeads: ["Combination Name", "Fleet Code", "Action"],
                    tableBody: datas ?? []
                }} />

            </Bmodal>
        </>
    )
}

