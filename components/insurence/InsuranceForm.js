import Image from "next/image";

const InsuranceForm = ({ data = [], props }) => {
  const { tittle } = props;
  return (
    <div className="col-lg-11 row d-flex  justify-content-center gap-5 pb-3">
      <div className="col-8 px-0 justify-content-center">
        <div className=" border border-primary border-bottom-0 px-5 py-2">
          <h5 className="m-0">{tittle}</h5>
        </div>
        <div className="border px-5 py-3">
          <div className=" d-flex gap-5 justify-content-between">
            <input type="file" className="py-1 " />
            <input
              type="number"
              placeholder="Insurance Number"
              className="py-1 px-3 border border-primary focus-ring focus-ring-primary"
            />
            <input
              type="date"
              className="py-1 px-3 border border-primary focus-ring focus-ring-primary"
            />
            <button className="badge text-bg-primary border-0 ">
              <i className="bi bi-plus-lg fs-5"></i>
            </button>
          </div>
          {data?.map((item, index) => (
            <div key={index} className="mt-3 border-top pt-3">
              <div className=" d-flex gap-5 align-items-center justify-content-between">
                <Image
                  src={`${item.src}`}
                  alt="img"
                  width={50}
                  height={25}
                  className="object-fit-cover"
                />
                <p className="m-0">{item.lisence}</p>
                <p className="m-0">{item.date}</p>
                <button className="badge text-bg-danger border-0">
                  <i className="bi bi-dash-lg fs-5"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsuranceForm;
