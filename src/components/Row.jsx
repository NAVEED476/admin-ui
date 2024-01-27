import React from "react";
import "./style.css";
const TableRow = ({
  user,
  selected,
  handleEdit,
  handleDelete,
}) => {
  return (
    <tr className={selected ? "selected" : ""}>
      <td>
        <input
          type="checkbox"
          checked={selected}
        />
      </td>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td className="btns">
        <button onClick={() => handleEdit(user.id)}>
            Edit
        </button>
        <button onClick={() => handleDelete(user.id)}>
            Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
