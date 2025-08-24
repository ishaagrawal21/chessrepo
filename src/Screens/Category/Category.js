import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import apihelper from "../../common/ApiHelper";
import EditIcon from "@mui/icons-material/Edit";
import ManageCategory from "./ManageCategory";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Category() {
  const categoryConstant = {
    name: "",
    alias: "",
  };
  const [Category, setCategory] = useState([]);
  const [CategoryDetails, setCategoryDetails] = useState(categoryConstant);
  const [Open, setOpen] = useState(false);
  const getCategory = async () => {
    try {
      const result = await apihelper.getCategory();
      if (result.data && result.data.Category) {
        setCategory(result.data.Category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    const Confirm = window.confirm("Are You Sure To Delete This Category");
    if (!Confirm) return;
    const result = await apihelper.deleteCategory(id);
    getCategory();
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "name", headerName: "NAME", width: 200 },
    { field: "alias", headerName: "ALIAS", width: 200 },
    {
      field: "action",
      headerName: "ACTIONS",
      width: 200,
      renderCell: (cell) => {
        return (
          <>
            <IconButton
              color="primary"
              onClick={() => {
                setCategoryDetails({
                  name: cell.row.name,
                  alias: cell.row.alias,
                  _id: cell.row._id,
                });
                setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                deleteCategory(cell.row._id);
                return;
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <ManageCategory
        CategoryDetails={CategoryDetails}
        setCategoryDetails={setCategoryDetails}
        Open={Open}
        setOpen={setOpen}
        getCategory={getCategory}
      />
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3>Category</h3>
          <p>Manage Your Category</p>
        </div>
        <Button
          variant="outlined"
          onClick={() => {
            setCategoryDetails(categoryConstant)
            setOpen(true);
          }}
        >
          Add Category
        </Button>
      </div>

      <div className="row">
        <div className="col-12">
          <DataGrid
            autoHeight={true}
            rows={Category}
            columns={columns}
            getRowId={(e) => e._id}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </div>
    </>
  );
}
