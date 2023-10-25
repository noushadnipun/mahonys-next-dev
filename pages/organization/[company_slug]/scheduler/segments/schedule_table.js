import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import axios from "@/helpers/axios";
import {log} from "next/dist/server/typescript/utils";

const ScheduleTable = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [my_assets, setMyAssets] = useState([{}]);
    const [subcontractor_assets, setSubContractorAssets] = useState([{}]);

    useEffect(() => {
        const getMyAssets = async () => {
            let res = await axios.get('/scheduler/get-asset');
                res = res.data.getDatas
                let own = res.own;
                setMyAssets(own);

                let scres = res.dhur;
                setSubContractorAssets(scres);
        }
        getMyAssets();
    }, [setMyAssets, setSubContractorAssets]);


    const displayDates = () => {
        const dates = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};
            dates.push(
                date.toLocaleDateString('en-US', options)
            );
        }
        return dates

    }

    const showPrevious = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(startDate.getDate() - 7);
        setStartDate(newStartDate);
    }

    const showNext = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(startDate.getDate() + 7);
        setStartDate(newStartDate);
    }
    const fristMonthDate = displayDates()[0].split(", ")
    const secondMonthDate = displayDates()[6].split(", ")

    //console.log(subcontractor_assets)

    return (
        <>
            <div className="col-lg-2"></div>
            <div className="col-lg-12 d-flex justify-content-between align-items-center pb-3">
                <div className="left d-flex align-items-center">
                    <button onClick={showPrevious} className='border-0 bg-transparent fs-4'>
                        <i className="bi bi-caret-left"></i> {fristMonthDate[1]}
                    </button>
                    <span className='fw-bold'><i className="bi bi-dash fs-3"></i></span>
                    <button onClick={showNext} className='border-0 bg-transparent fs-4'>{secondMonthDate[1]}
                        <i className="bi bi-caret-right"></i>
                    </button>
                </div>
                <div className="right d-flex gap-3">
                    {/* <Link href={"#"} className='btn btn-sub'>Subcontractor Assets</Link> */}
                    <Link href={"#"} className='btn btn-success'>My Assets</Link>
                    <Link href={"#"} className='btn btn-tow'>Tow Haulier</Link>
                    <Link href={"#"} className='btn btn-assign'>Assign All</Link>
                </div>
            </div>


            <div className="w-100 h-100 rounded-3 p-3 shadow schedule">
                <table className={'table-bordered w-100 text-center'}>
                    <thead>
                    <tr>
                        <td>Search truck</td>
                        {
                            displayDates()?.map((date, i) => {
                                const dataArray = date.split(", ")
                                const day = dataArray[1].split(" ")
                                return (
                                    <td key={i}>
                                        {/*<span>{dataArray[0]}</span><span className='fs-4 ps-5'>{day[1]}</span>*/}
                                        <span className='font-weight-600'>
                                            <span className={ 'd-block fs-6' }>{dataArray[0]}</span>
                                            <span className={ 'd-block fs-3' }>{day[1]}</span>
                                        </span>
                                    </td>
                                )
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    <tr className={ 'groupTr' } key="234">
                        <td colSpan='8'>My Assets</td>
                    </tr>
                    {
                        my_assets.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td className={ 'innerTd' }>{item.registration_no}</td>
                                    {
                                        displayDates()?.map((date, i) => {
                                            const dataArray = date.split(", ")
                                            const day = dataArray[1].split(" ")
                                            return (
                                                <td className={ 'innerTd' } key={i} data-truck-fleet={item.registration_no}>
                                                    <span className='fs-4 ps-5'>

                                                    </span>
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    <tr className={ 'groupTr' } key="2345">
                        <td className={ 'p-0 m-0' } colSpan='8'>Subcontractor Assets</td>
                    </tr>
                    {
                        (subcontractor_assets) &&
                        subcontractor_assets.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td className={ 'innerTd' }>{item.registration_no}</td>
                                    {
                                        displayDates()?.map((date, i) => {
                                            const dataArray = date.split(", ")
                                            const day = dataArray[1].split(" ")
                                            return (
                                                <td className={ 'innerTd' } key={i} data-truck-fleet={item.fleet_code}>
                                                    <span className='fs-4 ps-5'></span>
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>

            <div className="d-flex gap-3 mt-3">
                <div className="d-flex gap-2 align-items-center">
                    <span className='round plan'></span>
                    <span>Planing Stage (350MT)</span>
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <span className='round allocated'></span>
                    <span>Allocated truck/driver (250MT)</span>
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <span className='round loading'></span>
                    <span>Loading in progress (70MT)</span>
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <span className='round delivered'></span>
                    <span>Delivered (300MT)</span>
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <span className='round declined'></span>
                    <span>Declined (20MT)</span>
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <span className='round temporary'></span>
                    <span>Temporary Showing (80 MT)</span>
                </div>
            </div>
        </>
    );
}

export default ScheduleTable;
