import Link from "next/link";

const ContactTable = () => {
  return (
    <tbody>
      <tr>
        <td>AT123456</td>
        <td>Potato</td>
        <td>Canberra</td>
        <td>Melbourne</td>
        <td>300</td>
        <td>$500</td>
        <td>$100</td>
        <td>20/09/2023</td>
        <td>100MT</td>
        <td>Lorem ispum</td>
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

export default ContactTable;
