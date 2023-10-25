import Link from "next/link";
const PayrollTable = () => {
  return (
    <tbody>
      <tr>
        <td>AT123456</td>
        <td>Potato</td>
        <td>Canberra</td>
        <td>Melbourne</td>

        <td className="text-center">
          <div className="btn-group btn-group-sm material-action-btn">
            <Link
              href={"/smith/drivers/payroll"}
              className="btn btn-success btn-sm "
            >
              Completed
            </Link>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default PayrollTable;
