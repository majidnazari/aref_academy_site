import { useState } from 'react';
import Container from '@mui/material/Container';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import SaveIcon from '@mui/icons-material/Save';
import { UPDATE_CONSULTANT_TEST } from './gql/mutation';
import { GET_A_COSULTANT_TEST } from './gql/query';
import { useMutation, useQuery } from '@apollo/client';
import { showSuccess } from "../../utils/swlAlert";
import { Grid } from '@mui/material';
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
import {
    useParams
} from "react-router-dom";
import {
    useNavigate
} from "react-router-dom";

interface ErrorData {
    code?: string;
    lessonId?: string;
    level?: TestLevel;
    subject?: string;
}
export enum TestLevel {
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
    //console.log("the id con  is :" , consultant_test_id);

    useQuery(GET_A_COSULTANT_TEST, {

        variables: {
            _id: consultant_test_id
        },
        onCompleted: (data) => {
            setCode(data.test.code);
            setLessonId(data.test.lessonId);
            setLevel(data.test.level);
            setSubject(data.test.subject);
        }
        ,
        fetchPolicy: "no-cache"
    });

    const editConsultantHandler = () => {
        if (!validateForm()) return;
        setLoading(true);
        editConsultantTest({
            variables: {
                _id: consultant_test_id,
                code: Number(code),
                lessonId: Number(lessonId),
                subject: subject,
                level: level
            }
        }).then(() => {
            showSuccess('ویرایش با موفقیت انجام شد');
        }).finally(() => {
            setLoading(false);
        });

    }

    const validateForm = () => {
        let out = true;
        let result: ErrorData = {};
        setError({});
        if (!code) {
            result = { ...result, code: 'کد را وارد کنید.' };
            out = false;
        }
        if (!lessonId) {
            result = { ...result, lessonId: 'کد درس را وارد کنید.' };
            out = false;
        }
        // if (!level) {
        //     result = { ...result , : 'سطح  را وارد کنید.' };
        //     out = false;
        // }
        if (!subject) {
            result = { ...result, subject: 'عنوان را وارد کنید.' };
            out = false;
        }
        setError(result);
        return out;
    }

    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <h4>ویرایش تست مشاور</h4>

        <Grid container component={Paper} sx={{ p: 2 }} spacing={2} >
            <Grid item xs={12} md={3} lg={3} >
                <TextField
                    fullWidth
                    label="کد"
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
                    label="کد درس"
                    value={lessonId}
                    onChange={(e: any) => setLessonId(e.target.value)}
                    error={error.lessonId ? true : false}
                    helperText={error.lessonId ? error.lessonId : ""}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={3} lg={3} >
                <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="levelId"> سطح </InputLabel>
                    <Select
                        labelId="level-id"
                        id="levelId"
                        //label=" cbcvbcvbcسطح"
                        // value={search.gender || ""}
                        value={level}
                        onChange={(e: any) => setLevel(e.target.value)}
                        variant="filled"
                    >
                        <MenuItem value="A">A</MenuItem>
                        <MenuItem value="B">B</MenuItem>
                        <MenuItem value="C">C</MenuItem>
                        <MenuItem value="D">D</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={3} lg={3} >
                <TextField
                    fullWidth
                    label="موضوع"
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
                startIcon={<SaveIcon />} color="primary" onClick={editConsultantHandler}
                disabled={loading}
            >
                ثبت تغییرات
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

export default ConsultantTestEditScreen;
