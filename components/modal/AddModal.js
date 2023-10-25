"use Client";

const AddModal = ({ children, props }) => {
  const {
    modalId = "myModal",
    modalTittle,
    modalSize = "modal-lg",
    css = "",
    columns = "columns",
    footerText = false,
    submitBtn = true,
    cancelBtn = true,
  } = props;

  return (
    <div className={`modal fade material-modal ${modalSize}`} id={modalId}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* // Modal Header */}
          <div className="modal-header">{modalTittle}</div>
          {/* // Modal body */}
          <div className={`modal-body material-form ${columns} ${css}`}>
            {children}
          </div>
          {/* // Modal footer */}

          <div className="modal-footer">
            {footerText}
            {submitBtn === true ? (
              <button
                type="submit"
                className="btn success"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            ) : (
              false
            )}
            {cancelBtn === true ? (
              <button
                type="button"
                className="btn cancel"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            ) : (
              false
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;

