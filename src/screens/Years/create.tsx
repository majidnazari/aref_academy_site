import React, { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { CREATE_YEAR } from './gql/mutation';
import { useMutation } from '@apollo/client';
import { showSuccess } from "../../utils/swlAlert";
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {
    useNavigate
} from "react-router-dom"

interface ErrorData {
    name?: string;
}

const YearsCreateScreen = () => {
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorData>({});
    const [createYear] = useMutation(CREATE_YEAR);
    const navigate = useNavigate();

    const createYearHandler = () => {
        if (!validateForm()) return;
        setLoading(true);
        createYear({
            variables: {
                name: name,
                active: false
            }
        }).then(() => {
            showSuccess('سال تحصیلی جدید با موفقیت اضافه شد.');
            setName("");
            navigate('/years');
        }).finally(() => {
            setLoading(false);
        });

    }

    const validateForm = () => {
        let out = true;
        let result: ErrorData = {};
        setError({});
        if (!name) {
            result = { ...result, name: 'سال را وارد کنید.' };
            out = false;
        }
        else if (isNaN(parseInt(name)) || parseInt(name) <= 0) {
            result = { ...result, name: 'سال را صحیح وارد کنید.' };
            out = false;
        }
        setError(result);
        return out;
    }
    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <h1>ایجاد سال تحصیلی جدید </h1>

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
                startIcon={<AddCircleIcon />} color="primary" onClick={createYearHandler}
                disabled={loading}
            >
                ایجاد سال تحصیلی جدید
                {loading ? <CircularProgress size={15} color="primary" /> : null}
            </Button>
        </Box>
    </Container >)
}

export default YearsCreateScreen;