import React from 'react';
import Table from "@/components/common/Table";

const CommodityList = ({ datas, onEditClick }) => {

    let tableBody =  () => {
        let data = [];
        datas.map((item, index) => {
            // console.log(item)
           let obj = {
               'commodity_type': item.type.name,
               'grade': item.grade,
               'unit': item.unit,
               'rate': item.rate,
               'action': (
                   <div className="btn-group btn-group-sm material-action-btn">
                        <button className={'btn btn-transparent text-primary btn-sm'}
                                onClick={() => onEditClick(item)}><i className="bi bi-pencil-square"></i></button>
                   </div>
               ),
           }
           data.push(obj)
        })
        return data;
    }


    return (
        <div>
            <Table props={{
                tableHeads: ["Commodity Type", "Grade", "Unit", "Rate", "Action"],
                tableBody: tableBody(),
            }} />
        </div>
    );
};

export default CommodityList;