import React from "react";

const Paginate = ({datas, handleAction}) =>{
    const links = datas?.links ?? []
    return (
        <>
            <div className="material-paginate">
                <ul className="pagination">
                    {datas && links?.map((item, index) => (
                        <li className={`page-item ${item.active ? 'active' : ''}`} key={index}>
                            <a className="page-link" href="#" onClick={() =>handleAction(item.url)}>
                                {item.label.replace(/&laquo;/g, "«").replace(/&raquo;/g, "»")}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Paginate