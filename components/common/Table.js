import Link from "next/link";

const Table = ({ props, className }) => {
  const { tableHeads, tableBody } = props;
  //   const tableHeads = props.tableHeads;
  //   console.log(tableHeads); //

  return (
    <div className="table-responsive fle">
      {" "}
      {/* // Table Start */}
      <table className={`table material-table ${className}`}>
        <thead>
          <tr>
            {tableHeads?.map((item, i) => (
              <th key={i}>{item}</th>
            ))}
          </tr>
        </thead>
        {/* tbody  */}
        {tableBody ?
          <tbody>
            {tableBody.map((items, index) => {
              return (
                <tr key={index}>
                  {Object.keys(items).map(function (item, index) {
                    return <td key={index}>{Object.values(items)[index]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
          : false}
        {/* tbody  */}
      </table>
      {/* pagination  */}
      {/* pagination  */}
    </div>
  );
};

export default Table;
