import React, { useState } from 'react';
import Container from '@mui/material/Container';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { CREATE_FAULT } from './gql/mutation';
import { CREATE_CONSULTANT_TEST } from './gql/mutation';
import { ConstantTestLevel } from "../../constants";

import { useMutation } from '@apollo/client';
import { showSuccess } from "../../utils/swlAlert";
import {
    Box,
    Paper,
    FormControl,
    TextField,
    Autocomplete,
    CircularProgress,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from "@mui/material";


import FormHelperText from "@mui/material/FormHelperText";
import { Grid } from "@mui/material";
import {
    useNavigate
} from "react-router-dom"

interface ErrorData {
    code?: string;
    lessonId?: string;
    level?: string;
    subject?: string;    
  }
  export enum TestLevel{
    A,
    B,
    C,
    D
}
  
  const ConsultantTestCreateScreen = () => {
    const [code, setCode] = useState<string>("");
    const [lessonId, setLessonId] = useState<string>("");
    const [level, setLevel] = useState<string>("");    
    const [subject, setSubject] = useState<string>("");   
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorData>({});
    const [createConsultantTest] = useMutation(CREATE_CONSULTANT_TEST);
    const navigate = useNavigate();
    

    const createConsultantTestHandler = () => {
        if (!validateForm()) return;
        setLoading(true);
        createConsultantTest({
            variables: {
                code: Number(code),
                lessonId:Number(lessonId),
                level: level,
                subject: subject,
            }
        }).then(() => {
            showSuccess('تست جدید با موفقیت اضافه شد.');
            setCode("");
            setLessonId("");
            setLevel("");
            setSubject("");
            navigate('/consultant-test');
        }).finally(() => {
            setLoading(false);
        });

    }

    // const handleChangeLevel = (e: SelectChangeEvent<string>) => {
    //     //setLevel({ ...studentInfo, egucation_level: e.target.value });
    //   };

    const validateForm = () => { 
        let out = true;
        let result: ErrorData = {};
        setError({});
        if (!code) {
            result = { ...result, code: 'کد را وارد کنید.' };
            out = false;
        }
        if (!lessonId) {
            result = { ...result, lessonId: 'کد را وارد کنید.' };
            out = false;
        }
        if (!level) {
            result = { ...result, level: ' سطح را وارد کنید. ' };
            out = false;
        }
        if (!subject) {
            result = { ...result, subject: 'عنوان را وارد کنید.' };
            out = false;
        }
        setError(result);
        return out;
    }
    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <h1>ایجادتست جدید </h1>

        <Grid container component={Paper} sx={{ p: 2 }} spacing={2} >
            <Grid item xs={12} md={3} lg={3} >
                <TextField
                    fullWidth
                    label=" کد تست "
                    value={code}
                    onChange={(e: any) => setCode(e.target.value)}
                    error={error.code ? true : false}
                    helperText={error.code ? error.code : ""}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={3} lg={3} >
                <TextField
                    fullWidth
                    label=" کد درس "
                    value={lessonId}
                    onChange={(e: any) => setLessonId(e.target.value)}
                    error={error.lessonId ? true : false}
                    helperText={error.lessonId ? error.lessonId : ""}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
            <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="levelId"> سطح </InputLabel>
                    <Select
                        labelId="level-id"
                        id="levelId"
                        //label=" cbcvbcvbcسطح"
                        // value={search.gender || ""}
                        error={error.level ? true : false}
                        value={level}
                        onChange={(e: any) => setLevel(e.target.value)}
                        variant="filled"
                    >
                        <MenuItem value="A" selected>A</MenuItem>
                        <MenuItem value="B">B</MenuItem>
                        <MenuItem value="C">C</MenuItem>
                        <MenuItem value="D">D</MenuItem>
                    </Select>
                    {error.level ? <FormHelperText error >{error.level}</FormHelperText> : ""}
                </FormControl>
        </Grid>
            <Grid item xs={12} md={3} lg={3} >
                <TextField
                    fullWidth
                    label=" عنوان"
                    value={subject}
                    onChange={(e: any) => setSubject(e.target.value)}
                    error={error.subject ? true : false}
                    helperText={error.subject ? error.subject : ""}
                    variant="filled"
                />
            </Grid>
        </Grid>
        <Box mt={2}>
            <Button
                sx={{ float: "left" }}
                variant="contained"
                startIcon={<AddCircleIcon />} color="primary" onClick={createConsultantTestHandler}
                disabled={loading}
            >
                ایجاد تست جدید
                {loading ? <CircularProgress size={15} color="primary" /> : null}
            </Button>
            <Button
                sx={{ float: "right" }}
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/consultant-test`)}
                disabled={loading}
            >
                <ArrowBackIcon />
                بازگشت
            </Button>
        </Box>
    </Container >)
}

export default ConsultantTestCreateScreen;