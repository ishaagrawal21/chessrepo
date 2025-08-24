import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apihelper from "../../common/ApiHelper";

export default function ManageCategory(props) {
  const { Open, setOpen, getCategory, CategoryDetails, setCategoryDetails } =
    props;

  const handleClose = () => {
    setOpen(false);
  };
  const AddCategory = async () => {
    try {
      if(!CategoryDetails.name){
        alert("name is required")
      }
      if(!CategoryDetails.alias){
        alert("alias is required")
      }
      const result = await apihelper.addCategory(CategoryDetails);
      getCategory();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateCategory = async () => {
    if(!CategoryDetails.name){
      alert("name is required")
    }
    if(!CategoryDetails.alias){
      alert("alias is required")
    }
    const result = await apihelper.updateCategory(CategoryDetails);
    getCategory();
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={Open} onClose={handleClose}>
        <DialogTitle>
          {CategoryDetails._id ? "Update Category" : "Add Category"}
        </DialogTitle>
        <hr className="my-0" />
        <DialogContent>
          <TextField
            onChange={(e) =>
              setCategoryDetails({
                ...CategoryDetails,
                name: e.target.value,
              })
            }
            value={CategoryDetails.name}
            autoFocus
            margin="dense"
            id="name"
            placeholder="Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            onChange={(e) =>
              setCategoryDetails({
                ...CategoryDetails,
                alias: e.target.value,
              })
            }
            value={CategoryDetails.alias}
            autoFocus
            margin="dense"
            id="alias"
            placeholder="Alias"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={CategoryDetails._id ? UpdateCategory : AddCategory}>
            {CategoryDetails._id ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
