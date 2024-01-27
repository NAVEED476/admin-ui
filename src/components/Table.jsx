import React, { useState } from "react";
import "./style.css";

const Table = ({ data, setUserData }) => {
  const [editedUserName, setEditedUserName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleEdit = (id) => {
    console.log(`Edit button clicked for ID: ${id}`);
    setSelectedUserId(id);
    setEditDialogOpen(true); // Open the edit modal
    setEditedUserName(data.find((user) => user.id === id)?.name || "");
    setEditEmail(data.find((user) => user.id === id)?.email || "");
    setEditRole(data.find((user) => user.id === id)?.role || "");
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false); // Close the edit modal
    setSelectedUserId(null);
  };

  const handleEditDialogSave = () => {
    setUserData((prevData) =>
      prevData.map((user) =>
        user.id === selectedUserId
          ? { ...user, name: editedUserName, email: editEmail, role: editRole }
          : user
      )
    );
    handleEditDialogClose();
  };

  const handleDelete = (id) => {
    console.log(`Delete button clicked for ID: ${id}`);
    setUserData((prevData) => prevData.filter((user) => user.id !== id));
    console.log(`User with ID ${id} deleted successfully.`);
  };

  return (
    <div>
      <div className="table-cont">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="action-btn">
                  <button onClick={() => handleEdit(user.id)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditDialogOpen && (
        <div className="editDialogue">
          <div className="edit-modal">
            <input
              style={{ marginTop: "10px", width: "300px" }}
              label="Name"
              fullWidth
              value={editedUserName}
              onChange={(e) => setEditedUserName(e.target.value)}
            />
            <input
              style={{ marginTop: "10px", width: "300px" }}
              label="Email"
              fullWidth
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
            <input
              style={{ marginTop: "10px", width: "300px" }}
              label="Role"
              fullWidth
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
            />
          </div>
          <div className="btns">
            <button onClick={handleEditDialogSave} style={{ width: "100px" }}>
              Save
            </button>
            <button onClick={handleEditDialogClose} style={{ width: "100px" }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
