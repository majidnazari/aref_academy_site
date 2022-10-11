import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useState, forwardRef } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddStudentQuikly = ({ reloadList }: { reloadList: Function }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          position: "fixed",
          right: "10px",
          bottom: "10px",
        }}
      >
        <Fab
          color="secondary"
          aria-label="add"
          onClick={() => {
            setOpen(true);
          }}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setOpen(false);
        }}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
      >
        <DialogTitle>{"ویرایش - "}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
                        
                    </DialogContentText> */}
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              //   updateCourseStudentHandler();
            }}
          >
            ذخیره
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            انصراف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AddStudentQuikly;
