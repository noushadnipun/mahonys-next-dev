import React, {useEffect, useState} from 'react'
import {toast, Toaster} from "react-hot-toast";
import ManageHoliday from './segments/manage_holiday';
import ScheduleTable from './segments/schedule_table';
import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";
import Bmodal from '@/components/Bmodal';
import axios from "@/helpers/axios";
import SubHeader from "@/components/common/SubHeader";
import ContractInfo from "./segments/contract_info";


const DATAS = [
    {
        id: "1",
        name: "Mathmozo",
        items: "Butter",
        thumb: "1",
        tint: 1,
    },
    {
        id: "2",
        name: "Muktodhara",
        items: "Milk",
        thumb: "2",
        tint: 2,
    },
    {
        id: "3",
        name: "Tech Learnopedia",
        items: "Soil",
        thumb: "3",
        tint: 3,
    },
];


const contractList = async () => {
    let res = await axios.get('/contracts/index?sort=all');
    res = res.data;
    return res.getDatas.data;
}


const Scheduler = ({subHeaders = 'dlkdlsk'}) => {
    const [scheduleData, myScheduleData] = useState();
    const [stores, setStores] = useState([]) //useState(DATAS);


    useEffect(() => {
        const loadData = async () => {
            let res = await contractList();
            //console.log(res)
            setStores(res);
        }

        loadData()
        //console.log(stores)
    }, [setStores]);


    const handleDragDrop = (results) => {
        const {source, destination, type} = results;

        // console.log(DATAS[results.source.index]);
        myScheduleData(
            {
                'destination': destination,
                'data': stores[results.source.index]
            }
        )

        if (destination.droppableId === 'SCHEDULE_TABLE') {
            addModal();
        }

        console.log(source);
        //console.log(type);
        console.log(destination);


    }
    const [addData, setAddData] = useState(null)
    const addModal = () => {
        setAddData(true)
    }


    return (
        <>
            <Toaster/>
            <section className='h-100'>
                <div className="row justify-content-between ">
                    <DragDropContext onDragEnd={handleDragDrop}>
                        <Droppable droppableId="ROOT" type="group">
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <div className="row mt-0 justify-content-between p-0">
                                        <div className="col-lg-2_5 pe-4 mt-2 pt-5">
                                            <div className=" w-100 xborder rounded-3 shadow  py-2" style={{height: '80vh'}}>
                                                <h5 className='fw-bold px-2'>Contracts</h5>
                                                <div className="py-2 w-100 bg-white shadow-sm px-2">
                                                    <input className='w-100 border px-2 py-1  border-primary'
                                                           type="text" placeholder='Seasrch Contracts'/>
                                                </div>

                                                <ManageHoliday></ManageHoliday>
                                                <div className="list-group flush">
                                                    {stores.map((store, idx) => (
                                                        <Draggable key={`"${store.id}"`} draggableId={`"${store.id}"`}
                                                                   index={idx}>
                                                            {(provided, snapshot) => (
                                                                <div className="list-group-item list-group-item-action"
                                                                     ref={provided.innerRef}
                                                                     {...provided.draggableProps}
                                                                     {...provided.dragHandleProps}
                                                                >
                                                                    <ContractInfo store={store}></ContractInfo>
                                                                </div>
                                                            )}
                                                        </Draggable>

                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-9_5">
                                            <Droppable droppableId="SCHEDULE_TABLE" type="group">
                                                {(provided, snapshot) => (
                                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                                        <ScheduleTable></ScheduleTable>
                                                    </div>
                                                )}
                                            </Droppable>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </Droppable>
                    </DragDropContext>
                </div>
            </section>
            {/*
            <button className={'btn btn-primary btn-sm me-3'}
                onClick={() => addModal()}>
                <i className="bi bi-plus"></i> Add
            </button> */}
            <LoadModal
                data={scheduleData}
                modalShow={addData !== null}
                modalHeader={'Add '}
                modalHide={() => (setAddData(null))}
            />
        </>
    )
}

export default Scheduler

const LoadModal = ({data, modalShow, modalHide, save, modalHeader}) => {
    return (
        <>
            <Bmodal modalShow={modalShow} modalHide={modalHide} modalHeader={modalHeader}
                    className={'material-form columns'} save={save} form={true}>
                {JSON.stringify(data)}
            </Bmodal>
        </>
    )
}
