import Link from 'next/link';
import React from "react";

const ManageHoliday = () => {
    return (
        <>
            <div className=" d-flex gap-2 px-2 pt-2 page-filter">
                <Link href={"#"} className='btn btn-primary btn-sm me-3'>Holiday</Link>
                <Link href={"#"} className='btn btn-info btn-sm me-3'>Appointment</Link>
            </div>
        </>
    );
}

export default ManageHoliday;
