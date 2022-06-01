import React, { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { CREATE_FAULT } from './gql/mutation';
import { useMutation } from '@apollo/client';
import { showSuccess } from "../../utils/swlAlert";
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {
    useNavigate
} from "react-router-dom"

interface ErrorData {
    description?: string;
}

const FaultsCreateScreen = () => {
    const [description, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorData>({});
    const [createFault] = useMutation(CREATE_FAULT);
    const navigate = useNavigate();

    const createFaultHandler = () => {
        if (!validateForm()) return;
        setLoading(true);
        createFault({
            variables: {
                description: description,
            }
        }).then(() => {
            showSuccess('تخلف جدید با موفقیت اضافه شد.');
            setName("");
            navigate('/faults');
        }).finally(() => {
            setLoading(false);
        });

    }

    const validateForm = () => {
        let out = true;
        let result: ErrorData = {};
        setError({});
        if (!description) {
            result = { ...result, description: 'توضیحات را وارد کنید.' };
            out = false;
        }
        setError(result);
        return out;
    }
    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <h1>ایجاد تخلف جدید </h1>

        <Grid container component={Paper} sx={{ p: 2 }} spacing={2} >
            <Grid item xs={12} md={4} lg={4} >
                <TextField
                    fullWidth
                    label="توضیحات"
                    value={description}
                    onChange={(e: any) => setName(e.target.value)}
                    error={error.description ? true : false}
                    helperText={error.description ? error.description : ""}
                    variant="filled"
                />
            </Grid>
        </Grid>
        <Box mt={2}>
            <Button
                sx={{ float: "left" }}
                variant="contained"
                startIcon={<AddCircleIcon />} color="primary" onClick={createFaultHandler}
                disabled={loading}
            >
                ایجاد تخلف جدید
                {loading ? <CircularProgress size={15} color="primary" /> : null}
            </Button>
            <Button
                sx={{ float: "right" }}
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/faults`)}
                disabled={loading}
            >
                <ArrowBackIcon />
                بازگشت
            </Button>
        </Box>
    </Container >)
}

export default FaultsCreateScreen;