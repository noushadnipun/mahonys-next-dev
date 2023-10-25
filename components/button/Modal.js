import Link from "next/link";

const ModalBtn = ({ props, children, onFunction = null }) => {
  const { btnId = "myModal", btnName, className="btn btn-primary  me-3 " } = props;
  return (
    <Link onClick={onFunction}
      className={className}
      href="#"
      type="button"
      data-bs-toggle="modal"
      data-bs-target={`#${btnId}`}
    >
      {children}
      {btnName}
    </Link>
  );
};

export default ModalBtn;
