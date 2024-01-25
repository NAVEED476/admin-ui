import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

export default function Home() {
  const [userData, setUserData] = useState([]);

  function handleEditButtonClick(id) {
    console.log(`Edit button clicked for ID: ${id}`);
  }

  function handleDeleteButtonClick(id) {
    console.log(`Delete button clicked for ID: ${id}`);
    let newData = userData.filter((value,index)=>{
        if(id !== value.id){

        }
    })
  }
  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((d) => d.json())
      .then((data) => setUserData(data));
  }, []);

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
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEditButtonClick(params.row.id)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleDeleteButtonClick(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "60%",
        padding: "0",
        margin: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="App"
    >
      <DataGrid
        rows={userData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
