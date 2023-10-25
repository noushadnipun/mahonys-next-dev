import React from "react";

const SmModalBtn = ({ props }) => {
  const { btnId = "", btnName = "", ModalBtnId = "" } = props;
  return (
    <>
      <div className="btn-group btn-group-sm ">
        <button
          className="btn bg-gray rounded-2 py-1 me-3"
          type="button"
          data-bs-toggle="modal"
          data-bs-target={`#${btnId}`}
        >
          {btnName}
        </button>

        <button
          className="badge text-bg-primary border-0 focus-ring focus-ring-light me-3"
          type="button"
          data-bs-toggle="modal"
          data-bs-target={`#${ModalBtnId}`}
        >
          <i className="bi bi-plus fs-5 p-0"></i>
        </button>
      </div>

      {/* <div className="btn-group btn-group-sm material-action-btn">
        <Link href="#">
          <span className="btn btn-gray btn-sm">Combinatioan</span>
        </Link>

        <Link className="" href="/smith/assets#">
          <i className="bi bi-plus btn btn-primary p-0"></i>
        </Link>
      </div> */}
    </>
  );
};

export default SmModalBtn;
