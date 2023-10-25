import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import AddModal from '@/components/modal/AddModal';
import Select from "@/components/common/form/SelectInput";
import TextInput from "@/components/common/form/TextInput";
import ModalBtn from '@/components/button/Modal';
import axios from '@/helpers/axios';
import { Toaster, toast } from "react-hot-toast";

const Create = (props) => {
    const { id, data } = props;
    let commodityTypes = data.commodity_type;
    let values = data.values ?? [];

    const handler = async (e) => {
        e.preventDefault();
        const payload = {
            organization_id: 1,
            company_id: 1,
            commodity_type_id: e.target.commodityType.value,
            grade: e.target.grade.value,
            unit: e.target.unit.value,
            rate: e.target.rate.value,
            action_performed_by: 1,
            id: id || false,
        };

        try {
            let route = values ? 'update' : 'create';
            const res = await axios.post(`commodity/${route}`, payload);
            console.log(res.data)
            toast.success(res.data.message);
        } catch (error) {

        }

    };

    return (
        <>
            <Toaster />
            <div className="btn-group btn-group-sm material-action-btn">
                <Link href="organization/[company_slug]/commodities#" data-bs-toggle="modal" data-bs-target={`#editItemModal${id}`}>
                    <i className="bi bi-pencil-square"></i>
                </Link>
                <Link href="organization/[company_slug]/commodities#" className="text-dark">
                    <i className="bi bi-lightbulb-off"></i>
                </Link>
            </div>

            <form onSubmit={handler}>
                <AddModal props={{ modalTittle: "Edit Commodity", modalId: "editItemModal" + id }}>
                    {/* Start Input */}
                    <Select
                        props={commodityTypes}
                        label={"Commodity Type"}
                        name="commodityType"
                        optionlabel='name'
                        optionvalue='id'
                        selected={values?.commodity_type_id}
                    />
                    <TextInput props={{ label: "Grade", type: "text", value: values?.grade, name: "grade" }} />
                    <TextInput props={{ label: "Unit", type: "text", value: values?.unit, name: "unit", }} />
                    <TextInput props={{ label: "Rate", type: "number", value: values?.rate, name: "rate", }} />
                    {/* End Input  */}
                </AddModal >
            </form >
        </>
    );
};



export default Create;


