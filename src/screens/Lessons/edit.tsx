import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { EDIT_LESSON } from './gql/mutation';
import { GET_A_LESSON } from './gql/query';
import { useMutation, useQuery } from '@apollo/client';
import { showSuccess } from "../../utils/swlAlert";
import { Grid } from '@mui/material';
import {
    useParams
} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";


interface ErrorData {
    name?: string;
}

interface LessonData {
    id: number;
    name: string;
}

const LessonsEditScreen = () => {
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorData>({});
    const [editLesson] = useMutation(EDIT_LESSON);
    const params = useParams<string>();
    const lessonId = params.lessonId;
    const navigate = useNavigate();

    const { data: lessonData } = useQuery(GET_A_LESSON, {
        variables: {
            id: lessonId
        },
        fetchPolicy: "no-cache"
    });

    useEffect(() => {
        if (lessonData) {
            const lessonInfo: LessonData = lessonData.getLesson;
            setName(lessonInfo.name);
        }

    }, [lessonData]);


    const editLessonHandler = () => {
        if (!validateForm()) return;
        setLoading(true);
        editLesson({
            variables: {
                id: Number(lessonId),
                name: name,
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
        if (!name) {
            result = { ...result, name: 'درس را وارد کنید.' };
            out = false;
        }
        setError(result);
        return out;
    }


    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <h1>ویرایش حساب کاربری</h1>

        <Grid container component={Paper} sx={{ p: 2 }} spacing={2} >
            <Grid item xs={12} md={4} lg={4} >
                <TextField
                    fullWidth
                    label="نام"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    error={error.name ? true : false}
                    helperText={error.name ? error.name : ""}
                    variant="filled"
                />
            </Grid>
        </Grid>
        <Box mt={2}>
            <Button
                variant="contained"
                startIcon={<SaveIcon />} color="primary" onClick={editLessonHandler}
                disabled={loading}
            >
                ثبت تغییرات
                {loading ? <CircularProgress size={15} color="primary" /> : null}
            </Button>

            <Button
                sx={{ float: "right" }}
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/lessons`)}
                disabled={loading}
            >
                <ArrowBackIcon />
                بازگشت
            </Button>
        </Box>
    </Container >)
}

export default LessonsEditScreen;
