import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import apihelper from "../../common/ApiHelper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ManageProduct from "./ManageProduct";

export default function Product() {
  const [Product, setProduct] = useState([]);
  const [Open, setOpen] = useState(false);
  const ProductConstant = {
    name: "",
    alias: "",
    category: "0",
  };
  const [ProductDetails, setProductDetails] = React.useState(ProductConstant);
  const getProduct = async () => {
    try {
      const result = await apihelper.getProduct();
      if (result.data && result.data.Product) {
        setProduct(result.data.Product);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (id) => {
    const Confirm = window.confirm("Are You Sure To Delete This Product");
    if (!Confirm) return;
    const result = await apihelper.deleteProduct(id);
    getProduct();
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "name", headerName: "NAME", width: 200 },
    { field: "alias", headerName: "ALIAS", width: 200 },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      renderCell: (cell) => {
        return cell.row.category.name;
      },
    },
    {
      field: "actions",
      headerName: "actions",
      width: 200,
      renderCell: (cell) => {
        return (
          <>
            <IconButton
              color="primary"
              onClick={() => {
                setProductDetails({
                  name: cell.row.name,
                  alias: cell.row.alias,
                  _id: cell.row._id,
                  category: cell.row.category._id,
                });
                setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                deleteProduct(cell.row._id);
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
    getProduct();
  }, []);
  return (
    <>
      <ManageProduct
        Open={Open}
        setOpen={setOpen}
        getProduct={getProduct}
        ProductDetails={ProductDetails}
        setProductDetails={setProductDetails}
      />
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3>Product</h3>
          <p>Manage Your Products</p>
        </div>
        <Button
          variant="outlined"
          onClick={() => {
            setProductDetails(ProductConstant);
            setOpen(true);
          }}
        >
          Add Product
        </Button>
      </div>

      <div className="row">
        <div className="col-12">
          <DataGrid
            autoHeight={true}
            rows={Product}
            columns={columns}
            getRowId={(e) => e._id}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </div>
    </>
  );
}
