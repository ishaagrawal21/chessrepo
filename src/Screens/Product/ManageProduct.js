import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apihelper from "../../common/ApiHelper";
import { MenuItem, Select } from "@mui/material";

export default function ManageProduct(props) {
  const { Open, setOpen, getProduct, ProductDetails, setProductDetails } =
    props;
  const [category, setcategory] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
  };
  const addProduct = async () => {
    try {
      if (!ProductDetails.name) {
        alert("name is required");
      }
      if (!ProductDetails.alias) {
        alert("name is required");
      }
      if (!ProductDetails.category || ProductDetails.category === "0") {
        alert("please select Category");
      }
      const result = await apihelper.addProduct(ProductDetails);
      getProduct();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const updateProduct = async () => {
    try {
      if (!ProductDetails.name) {
        alert("name is required");
      }
      if (!ProductDetails.alias) {
        alert("name is required");
      }
      if (!ProductDetails.category || ProductDetails.category === "0") {
        alert("please select Category");
      }
      const result = await apihelper.updateProduct(ProductDetails);
      getProduct();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCategory = async () => {
    try {
      const result = await apihelper.getCategory();
      if (result.data && result.data.Category) {
        setcategory(result.data.Category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div>
      <Dialog open={Open} onClose={handleClose}>
        <DialogTitle>
          {ProductDetails._id ? "Update Product" : "Add Product"}
        </DialogTitle>
        <hr className="my-0" />
        <DialogContent>
          <TextField
            onChange={(e) =>
              setProductDetails({
                ...ProductDetails,
                name: e.target.value,
              })
            }
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={ProductDetails.name}
          />
          <TextField
            onChange={(e) =>
              setProductDetails({
                ...ProductDetails,
                alias: e.target.value,
              })
            }
            value={ProductDetails.alias}
            autoFocus
            margin="dense"
            id="alias"
            label="Alias"
            type="text"
            fullWidth
            variant="outlined"
          />
          <Select
            className="mt-2"
            fullWidth
            id="demo-simple-select"
            value={ProductDetails.category}
            onChange={(e) => {
              setProductDetails({
                ...ProductDetails,
                category: e.target.value,
              });
            }}
          >
            <MenuItem value="0">
              <i> --Select Category--</i>
            </MenuItem>
            {category.map((item) => {
              return (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={ProductDetails._id ? updateProduct : addProduct}>
            {ProductDetails._id ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
