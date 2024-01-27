import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Search from "../components/Search";

export default function Home() {
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editedUserName, setEditedUserName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");

  const handleEditButtonClick = (id) => {
    console.log(`Edit button clicked for ID: ${id}`);
    setSelectedUserId(id);
    setEditDialogOpen(true);
    setEditedUserName(userData.find((user) => user.id === id)?.name || "");
    setEditEmail(userData.find((user) => user.id === id)?.email || "");
    setEditRole(userData.find((user) => user.id === id)?.role || "");
  };

  const handleDeleteButtonClick = (id) => {
    console.log(`Delete button clicked for ID: ${id}`);
    setUserData((prevData) => prevData.filter((user) => user.id !== id));
    console.log(`User with ID ${id} deleted successfully.`);
  };
  const handleSearch = (filteredData) => {
    setUserData(filteredData);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
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

  const columns = [
    { field: "id", headerName: "ID", width: 70, sortable: true },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: (params) => (
        <div>
          <button
            className="edit"
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEditButtonClick(params.row.id)}
          >
            Edit
          </button>
          <button
            className="delete"
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleDeleteButtonClick(params.row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((d) => d.json())
      .then((data) => setUserData(data));
  }, []);

  return (
    <div
      style={{
        width: "60%",
        padding: "0",
        margin: "0px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
      className="App"
    >
      <Search data={userData} onSearch={handleSearch} />
      <DataGrid
        rows={userData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 8]}
        checkboxSelection
      />

      <div
        open={isEditDialogOpen}
        onClose={handleEditDialogClose}
        style={{
          width: "500px",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <div>
          {" "}
          <button onClick={handleEditDialogSave} style={{ width: "100px" }}>
            Save
          </button>
          <button onClick={handleEditDialogClose} style={{ width: "100px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
