import React, { useState } from 'react';
import {Form, Modal} from "react-bootstrap";

const Bmodal = ({ children, modalShow, modalHide, className, modalHeader,save, form=false, searchBox=false, modalSize="lg", saveBtn=true, cancelBtn=true  }) => {

    const body = (
           <>
               <div className={className}>
                   {children}
               </div>
               {(saveBtn) ? <button type="submit" className="btn success ms-0 shadow" onClick={form ? null : save}>Submit</button> : false}

               {(cancelBtn) ? <button type="button" className="btn cancel shadow" onClick={modalHide}>Close</button> : false}
           </>
    )

    return (
        <>
            <Modal backdrop={'static'} centered={true}  className={'material-modal'} size={modalSize} show={modalShow} onHide={modalHide}>
                <div className="modal-header font-weight-600">
                    {modalHeader}
                    <button type="button" className="btn-close" aria-label="Close"  onClick={modalHide}></button>
                </div>
                <div className={'modal-body'}>
                {searchBox}
                {form ? <form onSubmit={save}> {body} </form> : body}
                </div>
                <div className="modal-footer">

                </div>
            </Modal>
        </>
    );
};

export default Bmodal;
