import Link from "next/link";

const UserTable = () => {
  return (
    <tbody>
      <tr>
        <td>AT123456</td>
        <td>Potato</td>
        <td>Canberra</td>
        <td>Melbourne</td>
        <td>300</td>

        <td className="text-center">
          <div className="btn-group btn-group-sm material-action-btn">
            <Link href="#">
              <i className="bi bi-pencil-square"></i>
            </Link>
            <Link href={"/organization/smith/settings/users/permission"}>
              <i class="bi bi-shield-lock-fill"></i>
            </Link>
            <Link href="#" className="text-dark">
              <i className="bi bi-lightbulb-off"></i>
            </Link>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default UserTable;
