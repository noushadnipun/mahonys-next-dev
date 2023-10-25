const CheckBox = ({ props, title }) => {
  return (
    <div className="material-form">
      <h5 className="fw-semibold">{title}</h5>
      {props?.map((item, index) => (
        <div className="" key={index}>
          <div className="form-group m-0 gap-3">
            <input type="checkbox" name={item.name} id={item.id} />
            <label className="ps-3">{item.label}</label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
