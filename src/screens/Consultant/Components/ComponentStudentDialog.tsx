import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useState } from "react";
import { GET_A_CONSULTANT_TIME_TABLE } from '../gql/query';


interface detailsData {
  consultant_id: number;
  id: string;
  consultant_first_name: string;
  student_id: string;
 // student: StudentData;
  branch_class_room_id: number;
  start_hour: string;
  end_hour: string;
  session_date: string;
  branchClassRoom_name: string;
}


 const ComponentStudentDialog=({consultantTimeTableId}:{ consultantTimeTableId:any}) =>{

  const params = useParams<string>();
  const timeTableId = params.consultantTimeTableId;


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [onetimeTable, setOneTimeTable] = useState<
  detailsData
  >();

  const { fetchMore, refetch } = useQuery(GET_A_CONSULTANT_TIME_TABLE, {
    variables: {     
      id: Number(timeTableId),
    },
    onCompleted: (data) => {
      setOneTimeTable(data.getConsultantDefinitionDetail);
      
    },
    fetchPolicy: "no-cache",
  });

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        افزودن دانش آموز
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>افزودن دانش آموز</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={consultantTimeTableId}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ComponentStudentDialog;