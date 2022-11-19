import { useState } from 'react';
import Container from '@mui/material/Container';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { UPDATE_CONSULTANT_TEST } from './gql/mutation';
import { GET_A_COSULTANT_TEST } from './gql/query';
import { useMutation, useQuery } from '@apollo/client';
import { showSuccess } from "../../utils/swlAlert";
import { Grid } from '@mui/material';
import {
    useParams
} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import {
    useNavigate
} from "react-router-dom";

interface ErrorData {
    code?: string;
    lessonId?: string;
    level?: TestLevel;
    subject?: string;    
  }
  export enum TestLevel{
    A,
    B,
    C,
    D
}

const ConsultantTestEditScreen = () => {
    const [code, setCode] = useState<string>("");
    const [lessonId, setLessonId] = useState<string>("");
    const [level, setLevel] = useState<TestLevel>(TestLevel.A);    
    const [subject, setSubject] = useState<string>("");   
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorData>({});
    const [editConsultantTest] = useMutation(UPDATE_CONSULTANT_TEST);
    const params = useParams<string>();
    const navigate = useNavigate();
    const consultant_test_id = params._id;
    
    // useQuery(GET_A_COSULTANT_TEST, {
    //     variables: {
    //         id: consultant_test_id
    //     },
    //     onCompleted: (data) => {
    //         setDescription(data.getFault.description);
    //     }
    //     ,
    //     fetchPolicy: "no-cache"
    // });

    // const editFaultHandler = () => {
    //     if (!validateForm()) return;
    //     setLoading(true);
    //     editFault({
    //         variables: {
    //             id: Number(faultId),
    //             description: description,
    //         }
    //     }).then(() => {
    //         showSuccess('ویرایش با موفقیت انجام شد');
    //     }).finally(() => {
    //         setLoading(false);
    //     });

    // }

    // const validateForm = () => {
    //     let out = true;
    //     let result: ErrorData = {};
    //     setError({});
    //     if (!description) {
    //         result = { ...result, description: 'توضیحات را وارد کنید.' };
    //         out = false;
    //     }
    //     setError(result);
    //     return out;
    // }

    // return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
    //     <h4>ویرایش تخلف</h4>

    //     <Grid container component={Paper} sx={{ p: 2 }} spacing={2} >
    //         <Grid item xs={12} md={4} lg={4} >
    //             <TextField
    //                 fullWidth
    //                 label="توضیحات"
    //                 value={description}
    //                 onChange={(e: any) => setDescription(e.target.value)}
    //                 error={error.description ? true : false}
    //                 helperText={error.description ? error.description : ""}
    //                 variant="filled"
    //             />
    //         </Grid>
    //     </Grid>
    //     <Box mt={2}>
    //         <Button
    //             sx={{ float: "left" }}
    //             variant="contained"
    //             startIcon={<SaveIcon />} color="primary" onClick={editFaultHandler}
    //             disabled={loading}
    //         >
    //             ثبت تغییرات
    //             {loading ? <CircularProgress size={15} color="primary" /> : null}
    //         </Button>
    //         <Button
    //             sx={{ float: "right" }}
    //             variant="contained"
    //             color="secondary"
    //             onClick={() => navigate(`/faults`)}
    //             disabled={loading}
    //         >
    //             <ArrowBackIcon />
    //             بازگشت
    //         </Button>
    //     </Box>
    // </Container >)
}

export default ConsultantTestEditScreen;
