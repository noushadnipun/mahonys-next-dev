import React from "react";

const SubcontactorModal = ({ children, props }) => {
  const { modalId = "myModal", modalTittle } = props;
  return (
    <div className="modal fade material-modal modal-lg" id={modalId}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* // Modal Header */}
          <div className="modal-header">{modalTittle}</div>
          {/* // Modal body */}
          <div className="modal-body material-form pb-5">{children}</div>
          {/* // Modal footer */}
        </div>
      </div>
    </div>
  );
};

export default SubcontactorModal;
