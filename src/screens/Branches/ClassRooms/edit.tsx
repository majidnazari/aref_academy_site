import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { EDIT_BRANCH_CLASS_ROOM } from "./gql/mutation";
import { GET_A_BRANCHE_CLASS_ROOM } from "./gql/query";
import {  
  GET_BRANCHES,
} from "../gql/query";

import { useMutation, useQuery } from "@apollo/client";
// import { showSuccess } from "../../utils/swlAlert";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from "@mui/material/FormHelperText";
// import { typesObject, educationLevelsObject } from "../../constants";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import { showSuccess } from "utils/swlAlert";

interface ErrorData {
  name?: string;
  description?: string;   
  branchId?: string;  
}

interface ClassRoomData {
  id: number;
  branch_id: number;
  name: string;
  description: number;
}

const BranchesClassRoomEditScreen = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");  
  const [branchId, setBranchId] = useState<string>(""); 
  const [branchName, setBranchName] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorData>({});
  const [editClassRoom] = useMutation(EDIT_BRANCH_CLASS_ROOM);
  const params = useParams<string>();
  const classRoomsId = params.classRoomsId;

  const { data: classRoom } = useQuery(GET_A_BRANCHE_CLASS_ROOM, {
    variables: {
     id:classRoomsId
    },
    onCompleted(data){
        setName(data.getBranchClassRoom.name);
        setDescription(data.getBranchClassRoom.description);
        setBranchId(data.getBranchClassRoom.branch.id);
    }
  });  

  const { data: branches } = useQuery(GET_BRANCHES, {
    variables: {
      first: 1000,
      page: 1,
      orderBy: [
        {
          column: "id",
          order: "DESC",
        },
      ],
    },
  });  

  const handleChangeBranch = (event: SelectChangeEvent<string>) => {
    setBranchId(event.target.value);
  };

  const editClassRoomHandler = () => {
    if (!validateForm()) return;
    setLoading(true);
    editClassRoom({
      variables: {
        id: Number(classRoomsId),
        name: name,  
        description: description,
        branch_id: Number(branchId)       
      },
    })
      .then(() => {
        showSuccess("ویرایش با موفقیت انجام شد");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validateForm = () => {
    let out = true;
    let result: ErrorData = {};
    setError({});
    if (!name) {
      result = { ...result, name: " نام کلاس را وارد کنید." };
      out = false;
    }
    // if (!description) {
    //   result = { ...result, description: " توضیحات را وارد کنید." };
    //   out = false;
    // }
   
    if (!branchId) {
      result = { ...result, branchId: "شعبه را وارد کنید." };
      out = false;
    }
   
    setError(result);
    return out;
  };
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography
        component={"div"}
        sx={{ fontSize: 18, fontWeight: "bold", my: 3 }}
      >
       ویرایش کلاس
      </Typography>

      <Grid container component={Paper} sx={{ p: 2 }} spacing={2}>
        <Grid item xs={12} md={4} lg={4}>
          <TextField
            fullWidth
            label="نام درس"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            error={error.name ? true : false}
            helperText={error.name ? error.name : ""}
            variant="filled"
          />
        </Grid>
        
        <Grid item xs={12} md={4} lg={4}>
          <TextField
            fullWidth
            label="توضیحات"
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            error={error.description ? true : false}
            helperText={error.description ? error.description : ""}
            variant="filled"
          />
        </Grid>
       
        <Grid item xs={12} md={4} lg={4}>
          <FormControl sx={{ width: "100%" }}>
            <Select
              defaultValue=""
              value={branches ? branchId || "" : ""}
              onChange={handleChangeBranch}
              error={error.branchId ? true : false}
              variant="filled"
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>شعبه</em>
              </MenuItem>
              {branches &&
                branches.getBranches.data.map((branch: any) => {
                  return (
                    <MenuItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </MenuItem>
                  );
                })}
            </Select>
            {error.branchId ? (
              <FormHelperText error>{error.branchId}</FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
        </Grid>
        
      </Grid>
      <Box mt={2}>
        <Button
          sx={{ float: "left" }}
          variant="contained"
          startIcon={<SaveIcon />}
          color="primary"
          onClick={editClassRoomHandler}
          disabled={loading}
        >
          ثبت تغییرات
          {loading ? <CircularProgress size={15} color="primary" /> : null}
        </Button>

        <Button
          sx={{ float: "right" }}
          variant="contained"
          color="secondary"
          onClick={() => navigate('/branches')}
          disabled={loading}
        >
          <ArrowBackIcon />
          بازگشت
        </Button>
      </Box>
    </Container>
  );
};

export default BranchesClassRoomEditScreen;
