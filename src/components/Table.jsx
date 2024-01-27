import React, { useState } from "react";
import "./style.css";
import TableRow from "./Row";
import Pagination from "./Pagination"

const Table = ({ data, setUserData }) => {
  const [editedUserName, setEditedUserName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = data.slice(startIndex, endIndex);


  return (<>
    <div>
      <div className="table-cont">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <TableRow
                key={user.id}
                user={user}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
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
    <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        handlePagination={handlePagination}
      />
  </>);
};

export default Table;
