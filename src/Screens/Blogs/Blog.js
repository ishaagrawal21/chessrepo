import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
// import { Button, IconButton } from "@mui/material";
import apihelper from "../../common/ApiHelper";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

export default function Blog() {
  const [Blog, setBlog] = useState([]);

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "title", headerName: "TITLE", width: 200 },
    { field: "slug", headerName: "SLUG", width: 200 },
    {
      field: "product",
      headerName: "PRODUCT",
      width: 200,
      renderCell: (cell) => {
        return cell.row.product.name;
      },
    },
    // {
    //   field: "actions",
    //   headerName: "actions",
    //   width: 200,
    //   renderCell: (cell) => {
    //     return (
    //       <>
    //         <IconButton
    //           color="primary"
    //           onClick={() => {
    //             setProductDetails({
    //               name: cell.row.name,
    //               alias: cell.row.alias,
    //               _id: cell.row._id,
    //               category: cell.row.category._id,
    //             });
    //             setOpen(true);
    //           }}
    //         >
    //           <EditIcon />
    //         </IconButton>
    //         <IconButton
    //           color="error"
    //           onClick={() => {
    //             deleteProduct(cell.row._id);
    //             return;
    //           }}
    //         >
    //           <DeleteIcon />
    //         </IconButton>
    //       </>
    //     );
    //   },
    // },
  ];
const getBlogs =async ()=>{
try {
    const result=await apihelper.getBlogs()

    if(result.data && result.data.Blog){
        setBlog(result.data.Blog)
    }
} catch (error) {
    console.log(error);
}


}
  useEffect(() => {

    getBlogs()
  }, []);
  return (
    <>

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3>Blogs</h3>
          <p>Manage Your Blogs</p>
        </div>
        {/* <Button
          variant="outlined"
          onClick={() => {
            setProductDetails(ProductConstant);
            setOpen(true);
          }}
        >
          Add Product
        </Button> */}
      </div>

      <div className="row">
        <div className="col-12">
          <DataGrid
            autoHeight={true}
            rows={Blog}
            columns={columns}
            getRowId={(e) => e._id}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </div>
    </>
  );
}
