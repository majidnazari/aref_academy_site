import { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { CREATE_LESSON } from './gql/mutation';
import { useMutation } from '@apollo/client';
import { showSuccess } from "../../utils/swlAlert";
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom"

interface ErrorData {
    name?: string;
}

const LessonsCreateScreen = () => {
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorData>({});
    const [createLesson] = useMutation(CREATE_LESSON);
    const navigate = useNavigate();

    const createLessonHandler = () => {
        if (!validateForm()) return;
        setLoading(true);
        createLesson({
            variables: {
                name: name,
            }
        }).then(() => {
            showSuccess('درس جدید با موفقیت اضافه شد.');
            setName("");
            navigate('/lessons');
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
        <h1>ایجاد درس جدید </h1>

        <Grid container component={Paper} sx={{ p: 2 }} spacing={2} >
            <Grid item xs={12} md={4} lg={4} >
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
        </Grid>
        <Box mt={2}>
            <Button
                variant="contained"
                startIcon={<AddCircleIcon />} color="primary" onClick={createLessonHandler}
                disabled={loading}
            >
                افزودن درس جدید
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

export default LessonsCreateScreen;