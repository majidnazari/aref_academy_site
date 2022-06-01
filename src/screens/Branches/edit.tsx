import { useState } from 'react';
import Container from '@mui/material/Container';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { EDIT_BRANCHE } from './gql/mutation';
import { GET_A_BRANCHE } from './gql/query';
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
    name?: string;
}

const FaultsEditScreen = () => {
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorData>({});
    const [editBranch] = useMutation(EDIT_BRANCHE);
    const params = useParams<string>();
    const navigate = useNavigate();
    const branchId = params.branchId;

    useQuery(GET_A_BRANCHE, {
        variables: {
            id: branchId
        },
        onCompleted: (data) => {
            setName(data.getBranch.name);
        }
        ,
        fetchPolicy: "no-cache"
    });

    const editBranchHandler = () => {
        if (!validateForm()) return;
        setLoading(true);
        editBranch({
            variables: {
                id: Number(branchId),
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
            result = { ...result, name: 'نام شعبه را وارد کنید.' };
            out = false;
        }
        setError(result);
        return out;
    }

    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <h4>ویرایش شعبه</h4>

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
                sx={{ float: "left" }}
                variant="contained"
                startIcon={<SaveIcon />} color="primary" onClick={editBranchHandler}
                disabled={loading}
            >
                ثبت تغییرات
                {loading ? <CircularProgress size={15} color="primary" /> : null}
            </Button>
            <Button
                sx={{ float: "right" }}
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/branches`)}
                disabled={loading}
            >
                <ArrowBackIcon />
                بازگشت
            </Button>
        </Box>
    </Container >)
}

export default FaultsEditScreen;
