import React, { useEffect, useState } from 'react';
import axios from "@/helpers/axios";
import CommodityList from "@/pages/organization/[company_slug]/commodities/list";
import EditModal from "@/pages/organization/[company_slug]/commodities/edit";


const Commodities = ({globalVarOutput}) => {
    const [lists, setLists] = useState([]);
    const [editList, setEditList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('commodity/index');
            setLists(response.data.getDatas.data)
        };
        fetchData();
    }, []);

    const handleEditClick = (list) => {
        setEditList(list)
    }
    console.log()
    const handleSave = () => {
        alert(1)
    }

    return (
      <>
            <CommodityList datas={lists} onEditClick={handleEditClick} />
            <EditModal
                show={editList !== null}
                onHide={() => setEditList(null)}
                data = {editList}
                onSave={handleSave}
            />

      </>
    );
}
export default Commodities;






