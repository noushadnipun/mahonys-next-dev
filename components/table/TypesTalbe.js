import Link from "next/link";

Link;

const TypesTalbe = () => {
  return (
    <tbody>
      <tr>
        <td>AT123456</td>
        <td>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere,
          distinctio.
        </td>
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

export default TypesTalbe;
