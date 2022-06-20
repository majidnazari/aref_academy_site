import React, { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { EDIT_STUDENT } from './gql/mutation';
import { useMutation, useQuery } from '@apollo/client';
import { GET_A_STUDENT } from './gql/query';
import { showSuccess } from "../../utils/swlAlert";
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {
    useNavigate
} from "react-router-dom";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { educationLevelsObject, majorObject } from '../../constants';
import { useParams } from 'react-router-dom';


interface ErrorData {
    first_name?: string;
    last_name?: string;
    phone?: string;
    egucation_level?: string;
}

interface StudentData {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    mother_phone: string;
    father_phone: string;
    home_phone: string;
    major: string;
    egucation_level: string;
    description: string;
    parents_job_title: string;
}

const StudentEditScreen = () => {
    const { studentId } = useParams<string>();
    const [studentInfo, setStudentInfo] = useState<StudentData>({
        id: 0,
        first_name: "",
        last_name: "",
        phone: "",
        mother_phone: "",
        father_phone: "",
        home_phone: "",
        major: "",
        egucation_level: "",
        description: "",
        parents_job_title: ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorData>({});
    const [editStudent] = useMutation(EDIT_STUDENT);

    const navigate = useNavigate();
    useQuery(GET_A_STUDENT, {
        variables: {
            id: studentId
        },
        onCompleted: (data) => {
            let studentInfoRead = data.getStudent;
            for (let key in data.getStudent) {
                if (key === '__typename') {
                    continue;
                }
                studentInfoRead = { ...studentInfoRead, [key]: data.getStudent[key] ? data.getStudent[key] : "" };
            }
            setStudentInfo(studentInfoRead);
        }
    });

    const editStudentHandler = () => {
        if (!validateForm()) return;
        setLoading(true);
        console.log({ studentInfo });
        editStudent({
            variables: studentInfo
        }).then(() => {
            showSuccess('ویرایش با موفقبت انجام شد.');
        }).finally(() => {
            setLoading(false);
        });

    }

    const validateForm = () => {
        let out = true;
        let result: ErrorData = {};
        setError({});
        if (!studentInfo.first_name) {
            result = { ...result, first_name: 'نام را وارد کنید.' };
            out = false;
        }
        if (!studentInfo.last_name) {
            result = { ...result, last_name: 'نام خانوادگی را وارد کنید.' };
            out = false;
        }
        if (!studentInfo.phone) {
            result = { ...result, phone: 'تلفن همراه را وارد کنید.' };
            out = false;
        }
        if (!studentInfo.egucation_level) {
            result = { ...result, egucation_level: 'مقطع را وارد کنید.' };
            out = false;
        }
        setError(result);
        return out;
    }

    const handleChangeEducationLevel = (e: SelectChangeEvent<string>) => {
        setStudentInfo({ ...studentInfo, egucation_level: e.target.value })
    };

    const handleChangeMajor = (e: SelectChangeEvent<string>) => {
        setStudentInfo({ ...studentInfo, major: e.target.value })
    }
    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <h1>  ویرایش دانش‌آموز </h1>

        <Grid container component={Paper} sx={{ p: 2 }} spacing={2} >
            <Grid item xs={12} md={4} lg={4} >
                <TextField
                    fullWidth
                    label="نام"
                    value={studentInfo.first_name}
                    onChange={(e: any) => setStudentInfo({ ...studentInfo, first_name: e.target.value })}
                    error={error.first_name ? true : false}
                    helperText={error.first_name ? error.first_name : ""}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4} >
                <TextField
                    fullWidth
                    label="نام خانوادگی"
                    value={studentInfo.last_name}
                    onChange={(e: any) => setStudentInfo({ ...studentInfo, last_name: e.target.value })}
                    error={error.last_name ? true : false}
                    helperText={error.last_name ? error.last_name : ""}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4} >
                <TextField
                    fullWidth
                    label="تلفن"
                    value={studentInfo.phone}
                    onChange={(e: any) => setStudentInfo({ ...studentInfo, phone: e.target.value })}
                    error={error.phone ? true : false}
                    helperText={error.phone ? error.phone : ""}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4} >
                <TextField
                    fullWidth
                    label="تلفن پدر"
                    value={studentInfo.father_phone}
                    onChange={(e: any) => setStudentInfo({ ...studentInfo, father_phone: e.target.value })}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4} >
                <TextField
                    fullWidth
                    label="تلفن مادر"
                    value={studentInfo.mother_phone}
                    onChange={(e: any) => setStudentInfo({ ...studentInfo, mother_phone: e.target.value })}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4} >
                <TextField
                    fullWidth
                    label="تلفن منزل"
                    value={studentInfo.home_phone}
                    onChange={(e: any) => setStudentInfo({ ...studentInfo, home_phone: e.target.value })}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4} >
                <FormControl sx={{ width: "100%" }}>
                    <Select
                        defaultValue=""
                        id="grouped-select"
                        value={studentInfo.major}
                        onChange={handleChangeMajor}
                        variant="filled"
                        displayEmpty
                    >
                        <MenuItem value="" disabled >
                            <em>رشته</em>
                        </MenuItem>
                        {Object.keys(majorObject).map((key, index) => (
                            <MenuItem key={index} value={key}>{majorObject[key]}</MenuItem>
                        ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={4} lg={4} >
                <FormControl sx={{ width: "100%" }}>
                    <Select
                        defaultValue=""
                        value={studentInfo.egucation_level}
                        onChange={handleChangeEducationLevel}
                        error={error.egucation_level ? true : false}
                        variant="filled"
                        displayEmpty
                    >
                        <MenuItem value="" disabled >
                            <em> مقطع</em>
                        </MenuItem>
                        {Object.keys(educationLevelsObject).map((key, index) => (
                            <MenuItem key={index} value={key}>{educationLevelsObject[key]}</MenuItem>
                        ))
                        }
                    </Select>
                    {error.egucation_level ? <FormHelperText error >{error.egucation_level}</FormHelperText> : ""}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={4} lg={4} >
                <TextField
                    fullWidth
                    label="اطلاعات شغلی والدین"
                    value={studentInfo.parents_job_title}
                    onChange={(e: any) => setStudentInfo({ ...studentInfo, parents_job_title: e.target.value })}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={12} lg={12} >
                <TextField
                    fullWidth
                    label="آدرس و توضیحات"
                    value={studentInfo.description}
                    onChange={(e: any) => setStudentInfo({ ...studentInfo, description: e.target.value })}
                    variant="filled"
                />
            </Grid>
        </Grid>
        <Box mt={2}>
            <Button
                sx={{ float: "left" }}
                variant="contained"
                startIcon={<AddCircleIcon />} color="primary" onClick={editStudentHandler}
                disabled={loading}
            >
                ویرایش دانش‌آموز
                {loading ? <CircularProgress size={15} color="primary" /> : null}
            </Button>
            <Button
                sx={{ float: "right" }}
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/students`)}
                disabled={loading}
            >
                <ArrowBackIcon />
                بازگشت
            </Button>
        </Box>
    </Container >)
}

export default StudentEditScreen;