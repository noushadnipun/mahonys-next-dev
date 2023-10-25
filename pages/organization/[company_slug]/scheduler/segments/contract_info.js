import React from "react";


const ContractInfo = ({store}) => {
    return (
        <>
            <div className="list-item-line">
                <div className="d-flex justify-content-between">
                    <div className="content-section">
                        <div className="line">
                            <span className="heading">{store.customer_company_name}</span>
                            <span className="text"></span>
                        </div>
                        <div className="line">
                            <span className="heading">Start Date: </span>
                            <span className="text">{store.start_date} </span>
                        </div>
                        <div className="line">
                            <span className="heading"> End Date: </span>
                            <span className="text">{store.end_date}</span>
                        </div>
                        <div className="line">
                            <span className="heading">Commodity: </span>
                            <span className="text">{store.commodity_type_name}</span>
                        </div>
                        <div className="line">
                            <span className="heading">Tonnage: </span>
                            <span className="text">{store.estimated_tonnage} MT</span>
                        </div>
                        <div className="line">
                            <span className="heading">Pickup Location:</span>
                            <span className="text">{store.pickup_location}</span>
                        </div>
                        <div className="line">
                            <span className="heading">Dropoff Location:</span>
                            <span className="text">{store.dropoff_location}</span>
                        </div>
                    </div>
                    <div className="action-section">

                    </div>
                </div>
            </div>
        </>
    )
}

export default ContractInfo;
