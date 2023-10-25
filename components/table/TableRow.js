import Link from "next/link";

const TableRow = () => {
  return (
    <tbody>
      <tr>
        <td>AT123456</td>
        <td>#Fleet Code</td>
        <td>TATA Motors</td>
        <td>Jason Memoya</td>
        <td>3 Subcontractor</td>
        <td>3500-Feight Sales</td>
        <td>200MT</td>
        <td>3 Combination</td>
        <td>Truck Division</td>
        <td className="text-center">
          <div className="btn-group btn-group-sm material-action-btn">
            <Link href="">
              <i className="bi bi-pencil-square"></i>
            </Link>
            <Link href="" className="text-dark">
              <i className="bi bi-lightbulb-off"></i>
            </Link>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default TableRow;
